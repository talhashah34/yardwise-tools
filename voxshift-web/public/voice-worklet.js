/**
 * VoXShift AudioWorklet — live pitch / formant / robot / space FX.
 * Same character as the Python desktop engine, running in the browser.
 */
class VoiceProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.pitch = 0;
    this.formant = 1;
    this.robot = 0;
    this.reverb = 0;
    this.echo = 0;
    this.warmth = 0.35;
    this.gate = 0.02;
    this.gain = 1;
    this.bypass = false;

    this.phase = 0;
    this.lp = 0;
    this.echoBuf = new Float32Array(Math.floor(sampleRate * 0.35));
    this.echoIdx = 0;
    this.revBufs = [0.029, 0.037, 0.053, 0.067].map(
      (d) => new Float32Array(Math.max(1, Math.floor(sampleRate * d))),
    );
    this.revIdx = [0, 0, 0, 0];

    // Pitch grain buffers
    this.grainIn = new Float32Array(4096);
    this.grainWrite = 0;

    this.port.onmessage = (e) => {
      const p = e.data || {};
      if (typeof p.pitch === "number") this.pitch = p.pitch;
      if (typeof p.formant === "number") this.formant = p.formant;
      if (typeof p.robot === "number") this.robot = p.robot;
      if (typeof p.reverb === "number") this.reverb = p.reverb;
      if (typeof p.echo === "number") this.echo = p.echo;
      if (typeof p.warmth === "number") this.warmth = p.warmth;
      if (typeof p.gate === "number") this.gate = p.gate;
      if (typeof p.gain === "number") this.gain = p.gain;
      if (typeof p.bypass === "boolean") this.bypass = p.bypass;
    };
  }

  static get parameterDescriptors() {
    return [];
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];
    if (!input || !input[0] || !output || !output[0]) return true;

    const inp = input[0];
    const out = output[0];
    const n = out.length;

    // Levels for UI
    let sumIn = 0;
    let sumOut = 0;

    if (this.bypass) {
      for (let i = 0; i < n; i++) {
        out[i] = inp[i] || 0;
        sumIn += out[i] * out[i];
        sumOut += out[i] * out[i];
      }
      this.port.postMessage({
        type: "levels",
        inn: Math.sqrt(sumIn / n),
        out: Math.sqrt(sumOut / n),
      });
      return true;
    }

    // Copy block and measure RMS for gate
    const block = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      block[i] = inp[i] || 0;
      sumIn += block[i] * block[i];
    }
    const rms = Math.sqrt(sumIn / n + 1e-12);
    if (rms < this.gate) {
      const fade = (rms / Math.max(this.gate, 1e-6)) ** 2;
      for (let i = 0; i < n; i++) block[i] *= fade;
    }

    // Write into ring for pitch read
    for (let i = 0; i < n; i++) {
      this.grainIn[this.grainWrite] = block[i];
      this.grainWrite = (this.grainWrite + 1) % this.grainIn.length;
    }

    const pitchRatio = Math.pow(2, this.pitch / 12);
    const formant = Math.min(1.8, Math.max(0.55, this.formant));
    // Combined read-rate: pitch change; formant approximated by slight extra stretch blend
    const readRate = pitchRatio / formant;

    const processed = new Float32Array(n);
    let readPos =
      (this.grainWrite - n * readRate + this.grainIn.length * 8) %
      this.grainIn.length;

    for (let i = 0; i < n; i++) {
      const i0 = Math.floor(readPos) % this.grainIn.length;
      const i1 = (i0 + 1) % this.grainIn.length;
      const frac = readPos - Math.floor(readPos);
      let s = this.grainIn[i0] * (1 - frac) + this.grainIn[i1] * frac;

      // Warmth one-pole
      const a = 0.12 + 0.55 * this.warmth;
      this.lp = this.lp + a * (s - this.lp);
      s = (1 - 0.45 * this.warmth) * s + 0.55 * this.warmth * this.lp * 1.15;

      // Robot ring mod
      if (this.robot > 0.01) {
        this.phase += (2 * Math.PI * 90) / sampleRate;
        if (this.phase > 2 * Math.PI) this.phase -= 2 * Math.PI;
        const carrier =
          Math.sin(this.phase) + 0.35 * Math.sin(this.phase * 2);
        let wet = s * carrier;
        wet = Math.round(wet * 12) / 12;
        s = (1 - this.robot) * s + this.robot * wet;
      }

      // Echo
      if (this.echo > 0.01) {
        const delay = Math.floor(0.18 * sampleRate);
        const read = (this.echoIdx - delay + this.echoBuf.length) % this.echoBuf.length;
        const delayed = this.echoBuf[read];
        const mix = 0.15 + 0.55 * this.echo;
        const fb = 0.35 + 0.35 * this.echo;
        const y = s + mix * delayed;
        this.echoBuf[this.echoIdx] = s + fb * delayed;
        this.echoIdx = (this.echoIdx + 1) % this.echoBuf.length;
        s = y;
      }

      // Simple multi-tap reverb
      if (this.reverb > 0.01) {
        let wet = 0;
        for (let b = 0; b < this.revBufs.length; b++) {
          const buf = this.revBufs[b];
          const idx = this.revIdx[b];
          const delayed = buf[idx];
          const fb = 0.55 - 0.05 * b;
          buf[idx] = s + delayed * fb;
          wet += delayed;
          this.revIdx[b] = (idx + 1) % buf.length;
        }
        wet /= this.revBufs.length;
        const mix = 0.12 + 0.55 * this.reverb;
        s = (1 - mix) * s + mix * wet;
      }

      s *= this.gain;
      // Soft limit
      s = Math.tanh(s * 1.15);
      processed[i] = s;
      sumOut += s * s;
      readPos += readRate;
      if (readPos >= this.grainIn.length) readPos -= this.grainIn.length;
    }

    for (let i = 0; i < n; i++) out[i] = processed[i];
    // Mirror to other channels if present
    for (let c = 1; c < output.length; c++) {
      output[c].set(out);
    }

    this.port.postMessage({
      type: "levels",
      inn: Math.sqrt(sumIn / n),
      out: Math.sqrt(sumOut / n),
    });
    return true;
  }
}

registerProcessor("voice-processor", VoiceProcessor);
