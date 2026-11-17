import { useEffect, useMemo, useRef, useState } from "react";
import { VoiceEngine, downloadBlob } from "./audio/engine";
import {
  DEFAULT_PARAMS,
  PRESETS,
  type VoiceParams,
} from "./audio/presets";
import "./index.css";

type SliderKey = keyof VoiceParams;

const SLIDERS: { key: SliderKey; label: string; min: number; max: number; step: number }[] =
  [
    { key: "pitch", label: "Pitch (semitones)", min: -12, max: 12, step: 0.1 },
    { key: "formant", label: "Formant / timbre", min: 0.6, max: 1.6, step: 0.01 },
    { key: "robot", label: "Robot", min: 0, max: 1, step: 0.01 },
    { key: "reverb", label: "Reverb", min: 0, max: 1, step: 0.01 },
    { key: "echo", label: "Echo", min: 0, max: 1, step: 0.01 },
    { key: "warmth", label: "Warmth", min: 0, max: 1, step: 0.01 },
    { key: "gate", label: "Noise gate", min: 0, max: 0.1, step: 0.001 },
    { key: "gain", label: "Output gain", min: 0.2, max: 2, step: 0.01 },
  ];

export default function App() {
  const engineRef = useRef<VoiceEngine | null>(null);
  const [live, setLive] = useState(false);
  const [params, setParams] = useState<VoiceParams>(DEFAULT_PARAMS);
  const [preset, setPreset] = useState("Natural");
  const [bypass, setBypass] = useState(false);
  const [muted, setMuted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [levels, setLevels] = useState({ inn: 0, out: 0 });
  const [error, setError] = useState("");

  const engine = useMemo(() => new VoiceEngine(), []);
  engineRef.current = engine;

  useEffect(() => {
    engine.setLevelCallback((inn, out) => setLevels({ inn, out }));
    return () => {
      engine.setLevelCallback(null);
      engine.stop();
    };
  }, [engine]);

  useEffect(() => {
    if (live) engine.setParams({ ...params, bypass });
  }, [engine, live, params, bypass]);

  async function toggleLive() {
    setError("");
    try {
      if (live) {
        engine.stop();
        setLive(false);
        setRecording(false);
        setLevels({ inn: 0, out: 0 });
        return;
      }
      await engine.start();
      engine.setParams({ ...params, bypass });
      engine.setMuted(muted);
      setLive(true);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Could not access microphone. Allow mic permission and try again.",
      );
    }
  }

  function applyPreset(name: string) {
    const found = PRESETS.find((p) => p.name === name);
    if (!found) return;
    setPreset(name);
    setParams(found.params);
  }

  function updateParam(key: SliderKey, value: number) {
    setPreset("Custom");
    setParams((prev) => ({ ...prev, [key]: value }));
  }

  async function toggleRecord() {
    if (!live) {
      setError("Start Live first, then record.");
      return;
    }
    if (recording) {
      const blob = await engine.stopRecordingAsync();
      setRecording(false);
      if (blob) {
        const stamp = new Date().toISOString().replace(/[:.]/g, "-");
        downloadBlob(blob, `voxshift-${stamp}.webm`);
      }
      return;
    }
    engine.startRecording();
    setRecording(true);
  }

  return (
    <div className="app">
      <section className="hero">
        <h1 className="brand">VoXShift</h1>
        <p className="headline">Change your voice in the browser.</p>
        <p className="sub">
          Talk into your mic, pick a voice identity, hear it live, and download
          the result — no install.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={toggleLive}>
            {live ? "Stop Live" : "Start Live"}
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => {
              const next = !bypass;
              setBypass(next);
              engine.setBypass(next);
            }}
            disabled={!live}
          >
            {bypass ? "Bypass ON" : "Bypass FX"}
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => {
              const next = !muted;
              setMuted(next);
              engine.setMuted(next);
            }}
            disabled={!live}
          >
            {muted ? "Unmute" : "Mute"}
          </button>
          <button
            className={`btn ${recording ? "btn-danger" : "btn-ghost"}`}
            onClick={toggleRecord}
            disabled={!live}
          >
            {recording ? "Stop & Download" : "Record"}
          </button>
        </div>
        <div className="status">
          <span className={`dot ${live ? "live" : ""}`} />
          {live ? "Live — speak into your microphone" : "Idle — click Start Live"}
        </div>
        {error ? <div className="error">{error}</div> : null}
      </section>

      <div className="layout">
        <section className="panel">
          <h2>Voice identities</h2>
          <div className="presets">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                className={`preset ${preset === p.name ? "active" : ""}`}
                onClick={() => applyPreset(p.name)}
              >
                <strong>{p.name}</strong>
                <span>{p.description}</span>
              </button>
            ))}
          </div>

          <div className="meters">
            <div className="meter">
              <label>
                <span>Input</span>
                <span>{Math.round(levels.inn * 100)}%</span>
              </label>
              <div className="track">
                <div className="fill" style={{ width: `${levels.inn * 100}%` }} />
              </div>
            </div>
            <div className="meter">
              <label>
                <span>Output</span>
                <span>{Math.round(levels.out * 100)}%</span>
              </label>
              <div className="track">
                <div className="fill" style={{ width: `${levels.out * 100}%` }} />
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <h2>Character controls</h2>
          <div className="sliders">
            {SLIDERS.map((s) => (
              <div className="slider-row" key={s.key}>
                <label>
                  {s.label}
                  <span>{params[s.key].toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={params[s.key]}
                  onChange={(e) => updateParam(s.key, Number(e.target.value))}
                />
              </div>
            ))}
          </div>
          <p className="hint">
            Use headphones to avoid mic feedback. For Discord/Zoom live chat you
            still need a virtual cable, or just record clips here and share them.
          </p>
        </section>
      </div>

      <section className="how">
        <strong>How this works on the web:</strong> your browser captures the
        microphone, runs the same style of pitch / formant / robot / reverb
        processing locally (AudioWorklet), and plays the changed voice back
        instantly. Nothing is uploaded to a server for the live effect.
      </section>
    </div>
  );
}
