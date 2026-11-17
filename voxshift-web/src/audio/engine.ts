import type { VoiceParams } from "./presets";

export type LevelCb = (inn: number, out: number) => void;

function mapLevel(rms: number): number {
  return Math.min(1, Math.max(0, (Math.log10(rms + 1e-6) + 3) / 2.5));
}

export class VoiceEngine {
  private ctx: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private worklet: AudioWorkletNode | null = null;
  private dest: MediaStreamAudioDestinationNode | null = null;
  private gainNode: GainNode | null = null;
  private recorder: MediaRecorder | null = null;
  private chunks: BlobPart[] = [];
  private onLevels: LevelCb | null = null;
  running = false;
  muted = false;
  bypass = false;
  recording = false;

  setLevelCallback(cb: LevelCb | null) {
    this.onLevels = cb;
  }

  async start(): Promise<void> {
    if (this.running) return;

    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        channelCount: 1,
      },
      video: false,
    });

    this.ctx = new AudioContext();
    await this.ctx.audioWorklet.addModule(
      `${import.meta.env.BASE_URL}voice-worklet.js`,
    );

    this.source = this.ctx.createMediaStreamSource(this.stream);
    this.worklet = new AudioWorkletNode(this.ctx, "voice-processor");
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.value = 1;

    this.source.connect(this.worklet);
    this.worklet.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    this.dest = this.ctx.createMediaStreamDestination();
    this.gainNode.connect(this.dest);

    this.worklet.port.onmessage = (e) => {
      if (e.data?.type === "levels" && this.onLevels) {
        this.onLevels(mapLevel(e.data.inn), mapLevel(e.data.out));
      }
    };

    if (this.ctx.state === "suspended") await this.ctx.resume();
    this.running = true;
  }

  stop(): void {
    void this.stopRecordingAsync();
    this.running = false;
    try {
      this.worklet?.disconnect();
      this.source?.disconnect();
      this.gainNode?.disconnect();
    } catch {
      /* ignore */
    }
    this.stream?.getTracks().forEach((t) => t.stop());
    void this.ctx?.close();
    this.stream = null;
    this.ctx = null;
    this.source = null;
    this.worklet = null;
    this.gainNode = null;
    this.dest = null;
  }

  setParams(params: VoiceParams & { bypass?: boolean }): void {
    this.worklet?.port.postMessage({
      pitch: params.pitch,
      formant: params.formant,
      robot: params.robot,
      reverb: params.reverb,
      echo: params.echo,
      warmth: params.warmth,
      gate: params.gate,
      gain: params.gain,
      bypass: params.bypass ?? this.bypass,
    });
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.gainNode) this.gainNode.gain.value = muted ? 0 : 1;
  }

  setBypass(bypass: boolean): void {
    this.bypass = bypass;
    this.worklet?.port.postMessage({ bypass });
  }

  startRecording(): void {
    if (!this.dest || this.recording) return;
    this.chunks = [];
    const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? "audio/webm;codecs=opus"
      : "audio/webm";
    this.recorder = new MediaRecorder(this.dest.stream, { mimeType: mime });
    this.recorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.chunks.push(e.data);
    };
    this.recorder.start(200);
    this.recording = true;
  }

  async stopRecordingAsync(): Promise<Blob | null> {
    if (!this.recorder || !this.recording) return null;
    this.recording = false;
    const rec = this.recorder;
    this.recorder = null;
    const chunks = this.chunks;
    return new Promise((resolve) => {
      rec.onstop = () =>
        resolve(new Blob(chunks, { type: rec.mimeType || "audio/webm" }));
      rec.stop();
    });
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
