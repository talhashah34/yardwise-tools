/** Fast in-browser voice replication: map content speech toward target timbre. */

export type ConvertProgress = (pct: number, label: string) => void;

async function decodeFile(file: File, ctx: AudioContext): Promise<AudioBuffer> {
  const buf = await file.arrayBuffer();
  return ctx.decodeAudioData(buf.slice(0));
}

function toMono(buffer: AudioBuffer): Float32Array {
  const n = buffer.length;
  const out = new Float32Array(n);
  const ch = buffer.numberOfChannels;
  for (let c = 0; c < ch; c++) {
    const data = buffer.getChannelData(c);
    for (let i = 0; i < n; i++) out[i] += data[i] / ch;
  }
  return out;
}

/** Estimate average magnitude spectrum of voiced frames. */
function spectralProfile(
  samples: Float32Array,
  sampleRate: number,
  fftSize = 2048,
): Float32Array {
  const hop = fftSize / 2;
  const window = new Float32Array(fftSize);
  for (let i = 0; i < fftSize; i++) {
    window[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (fftSize - 1)));
  }
  const bins = fftSize / 2 + 1;
  const accum = new Float32Array(bins);
  let frames = 0;

  for (let start = 0; start + fftSize < samples.length; start += hop) {
    let energy = 0;
    const frame = new Float32Array(fftSize);
    for (let i = 0; i < fftSize; i++) {
      const v = samples[start + i] * window[i];
      frame[i] = v;
      energy += v * v;
    }
    if (Math.sqrt(energy / fftSize) < 0.01) continue;

    // Naive DFT magnitude (fast enough for profile on short clips; subsample)
    // Use real FFT via OfflineAudioContext analyser pattern — manual Goertzel-ish rfft
    const re = new Float32Array(fftSize);
    const im = new Float32Array(fftSize);
    re.set(frame);
    fftRadix2(re, im);
    for (let k = 0; k < bins; k++) {
      accum[k] += Math.hypot(re[k], im[k]);
    }
    frames++;
    // Cap frames for speed
    if (frames >= 48) break;
  }

  if (frames === 0) {
    accum.fill(1);
    return accum;
  }
  for (let i = 0; i < bins; i++) accum[i] = Math.max(accum[i] / frames, 1e-6);
  // Smooth envelope
  const smooth = new Float32Array(bins);
  for (let i = 0; i < bins; i++) {
    let s = 0;
    let c = 0;
    for (let j = -6; j <= 6; j++) {
      const idx = i + j;
      if (idx >= 0 && idx < bins) {
        s += accum[idx];
        c++;
      }
    }
    smooth[i] = s / c;
  }
  void sampleRate;
  return smooth;
}

function fftRadix2(re: Float32Array, im: Float32Array) {
  const n = re.length;
  let j = 0;
  for (let i = 0; i < n; i++) {
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
    let m = n >> 1;
    while (m >= 1 && j >= m) {
      j -= m;
      m >>= 1;
    }
    j += m;
  }
  for (let size = 2; size <= n; size <<= 1) {
    const half = size >> 1;
    const tableStep = Math.PI / half;
    for (let i = 0; i < n; i += size) {
      for (let k = 0; k < half; k++) {
        const angle = tableStep * k;
        const wr = Math.cos(angle);
        const wi = -Math.sin(angle);
        const i0 = i + k;
        const i1 = i0 + half;
        const tr = wr * re[i1] - wi * im[i1];
        const ti = wr * im[i1] + wi * re[i1];
        re[i1] = re[i0] - tr;
        im[i1] = im[i0] - ti;
        re[i0] += tr;
        im[i0] += ti;
      }
    }
  }
}

function ifftRadix2(re: Float32Array, im: Float32Array) {
  for (let i = 0; i < im.length; i++) im[i] = -im[i];
  fftRadix2(re, im);
  for (let i = 0; i < im.length; i++) im[i] = -im[i];
  const n = re.length;
  for (let i = 0; i < n; i++) {
    re[i] /= n;
    im[i] /= n;
  }
}

function estimatePitchHz(samples: Float32Array, sampleRate: number): number {
  const minP = Math.floor(sampleRate / 400);
  const maxP = Math.floor(sampleRate / 70);
  const n = Math.min(samples.length, sampleRate);
  let bestCorr = 0;
  let bestLag = minP;
  for (let lag = minP; lag <= maxP; lag++) {
    let corr = 0;
    for (let i = 0; i < n - lag; i += 2) {
      corr += samples[i] * samples[i + lag];
    }
    if (corr > bestCorr) {
      bestCorr = corr;
      bestLag = lag;
    }
  }
  return sampleRate / bestLag;
}

function applyConversion(
  content: Float32Array,
  targetProfile: Float32Array,
  contentProfile: Float32Array,
  pitchRatio: number,
  sampleRate: number,
  onProgress?: ConvertProgress,
): Float32Array {
  const fftSize = 2048;
  const hop = 512;
  const bins = fftSize / 2 + 1;
  const transfer = new Float32Array(bins);
  for (let i = 0; i < bins; i++) {
    transfer[i] = Math.min(
      8,
      Math.max(0.15, Math.pow(targetProfile[i] / contentProfile[i], 0.85)),
    );
  }

  const window = new Float32Array(fftSize);
  for (let i = 0; i < fftSize; i++) {
    window[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (fftSize - 1)));
  }

  // Time-domain pitch shift via resampling then STFT timbre paint
  const pitchedLen = Math.max(1, Math.floor(content.length / pitchRatio));
  const pitched = new Float32Array(pitchedLen);
  for (let i = 0; i < pitchedLen; i++) {
    const src = i * pitchRatio;
    const i0 = Math.floor(src);
    const i1 = Math.min(content.length - 1, i0 + 1);
    const f = src - i0;
    pitched[i] = content[i0] * (1 - f) + content[i1] * f;
  }

  const out = new Float32Array(pitched.length + fftSize);
  const norm = new Float32Array(out.length);
  const total = Math.max(1, Math.floor((pitched.length - fftSize) / hop));

  for (let frame = 0, start = 0; start + fftSize < pitched.length; start += hop, frame++) {
    const re = new Float32Array(fftSize);
    const im = new Float32Array(fftSize);
    for (let i = 0; i < fftSize; i++) re[i] = pitched[start + i] * window[i];
    fftRadix2(re, im);
    for (let k = 0; k < bins; k++) {
      const mag = Math.hypot(re[k], im[k]) * transfer[k];
      const phase = Math.atan2(im[k], re[k]);
      re[k] = mag * Math.cos(phase);
      im[k] = mag * Math.sin(phase);
      if (k > 0 && k < fftSize / 2) {
        re[fftSize - k] = re[k];
        im[fftSize - k] = -im[k];
      }
    }
    ifftRadix2(re, im);
    for (let i = 0; i < fftSize; i++) {
      out[start + i] += re[i] * window[i];
      norm[start + i] += window[i] * window[i];
    }
    if (onProgress && frame % 8 === 0) {
      onProgress(35 + (55 * frame) / total, "Replicating voice…");
    }
  }

  for (let i = 0; i < out.length; i++) {
    if (norm[i] > 1e-6) out[i] /= norm[i];
  }

  // Soft limit + match rough loudness
  let peak = 1e-6;
  for (let i = 0; i < pitched.length; i++) peak = Math.max(peak, Math.abs(out[i]));
  const gain = 0.92 / peak;
  const final = new Float32Array(pitched.length);
  for (let i = 0; i < pitched.length; i++) {
    final[i] = Math.tanh(out[i] * gain * 1.1);
  }
  void sampleRate;
  return final;
}

function encodeWav(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeStr = (off: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, samples.length * 2, true);
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }
  return new Blob([buffer], { type: "audio/wav" });
}

export type ConvertResult = {
  blob: Blob;
  durationSec: number;
  sampleRate: number;
};

/**
 * Replicate target voice character onto content clip.
 * Fast STFT envelope transfer + pitch alignment — runs fully in-browser.
 */
export async function convertVoice(opts: {
  contentFile: File;
  targetFile: File;
  onProgress?: ConvertProgress;
}): Promise<ConvertResult> {
  const { contentFile, targetFile, onProgress } = opts;
  onProgress?.(5, "Reading clips…");
  const ctx = new AudioContext();
  try {
    const [contentBuf, targetBuf] = await Promise.all([
      decodeFile(contentFile, ctx),
      decodeFile(targetFile, ctx),
    ]);
    onProgress?.(15, "Analyzing target voice…");
    const content = toMono(contentBuf);
    const target = toMono(targetBuf);
    const sr = contentBuf.sampleRate;

    // Resample target profile conceptually at content rate (profiles are shape-only)
    const targetProfile = spectralProfile(target, targetBuf.sampleRate);
    onProgress?.(25, "Analyzing content…");
    const contentProfile = spectralProfile(content, sr);

    const contentPitch = estimatePitchHz(content, sr);
    const targetPitch = estimatePitchHz(target, targetBuf.sampleRate);
    const pitchRatio = Math.min(
      1.6,
      Math.max(0.65, contentPitch / Math.max(70, targetPitch)),
    );

    onProgress?.(35, "Replicating voice…");
    const converted = applyConversion(
      content,
      targetProfile,
      contentProfile,
      pitchRatio,
      sr,
      onProgress,
    );
    onProgress?.(95, "Encoding…");
    const blob = encodeWav(converted, sr);
    onProgress?.(100, "Done");
    return {
      blob,
      durationSec: converted.length / sr,
      sampleRate: sr,
    };
  } finally {
    await ctx.close();
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function isMediaFile(file: File): boolean {
  return (
    file.type.startsWith("audio/") ||
    file.type.startsWith("video/") ||
    /\.(mp3|wav|m4a|ogg|flac|webm|mp4|mov|mkv)$/i.test(file.name)
  );
}
