import { useEffect, useRef, useState } from "react";
import { convertVoice, isMediaFile } from "./audio/convert";
import { demoSamples } from "./audio/demoSamples";
import "./index.css";

type Slot = "target" | "content";
type DemoKey = "content" | "target" | "result";

const FAQS = [
  {
    q: "Is VoXShift really free and unlimited?",
    a: "Yes. Swap Studio runs in your browser with no account, no credits, and no clip length paywall. Conversion happens on your device.",
  },
  {
    q: "Do you keep a library of celebrity or preset voices?",
    a: "No. You upload the target voice sample yourself and the content clip you want spoken. There is no celebrity voice pack and no shared voice marketplace.",
  },
  {
    q: "How does the voice swap work?",
    a: "VoXShift analyzes the spectral character of your target sample, then transfers pitch contour and timbre cues onto your content clip with a client-side STFT pipeline. The result downloads as a WAV file.",
  },
  {
    q: "Does my audio leave my computer?",
    a: "Processing is designed to stay in the browser. Your uploads are not sent to a VoXShift server for conversion. Always keep consent and licensing in mind for any voice you use.",
  },
  {
    q: "What file types work best?",
    a: "Use clear mono or stereo speech in WAV, MP3, M4A, or OGG. Clean target samples of 5–20 seconds usually give the most stable timbre match.",
  },
  {
    q: "Where can I use the output?",
    a: "Creators use swaps for demos, narration drafts, prototype character VO, accessibility experiments, language practice, and private creative tools—always with permission from the voice owner.",
  },
];

const DEMO_CARDS: { key: DemoKey; label: string; blurb: string }[] = [
  {
    key: "content",
    label: "Content clip",
    blurb: "Words & timing you keep",
  },
  {
    key: "target",
    label: "Target voice",
    blurb: "Character you want to lean into",
  },
  {
    key: "result",
    label: "Swapped result",
    blurb: "Same line, shifted timbre",
  },
];

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function Waveform({ variant }: { variant: "content" | "target" | "result" | "hero" }) {
  const bars = variant === "hero" ? 28 : 18;
  return (
    <div className={`wave wave-${variant}`} aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.05}s` }} />
      ))}
    </div>
  );
}

export default function App() {
  const [target, setTarget] = useState<File | null>(null);
  const [content, setContent] = useState<File | null>(null);
  const [drag, setDrag] = useState<Slot | null>(null);
  const [busy, setBusy] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [playingDemo, setPlayingDemo] = useState<DemoKey | null>(null);
  const resultRef = useRef<string | null>(null);
  const demoAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (resultRef.current) URL.revokeObjectURL(resultRef.current);
      demoAudioRef.current?.pause();
    };
  }, []);

  function assign(slot: Slot, file: File | null) {
    setError(null);
    if (file && !isMediaFile(file)) {
      setError("Please upload an audio or video file (WAV, MP3, M4A, OGG, WebM…).");
      return;
    }
    if (slot === "target") setTarget(file);
    else setContent(file);
  }

  function onDrop(slot: Slot, e: React.DragEvent) {
    e.preventDefault();
    setDrag(null);
    const file = e.dataTransfer.files?.[0];
    if (file) assign(slot, file);
  }

  async function runConvert() {
    if (!target || !content || busy) return;
    setBusy(true);
    setError(null);
    setProgressPct(5);
    setProgressLabel("Reading clips…");
    try {
      const { blob } = await convertVoice({
        targetFile: target,
        contentFile: content,
        onProgress: (pct, label) => {
          setProgressPct(Math.round(pct));
          setProgressLabel(label);
        },
      });
      if (resultRef.current) URL.revokeObjectURL(resultRef.current);
      const url = URL.createObjectURL(blob);
      resultRef.current = url;
      setResultUrl(url);
      setProgressPct(100);
      setProgressLabel("Done");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Conversion failed.";
      setError(msg);
      setProgressLabel("");
      setProgressPct(0);
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "voxshift-swap.wav";
    a.click();
  }

  function playDemo(key: DemoKey) {
    demoAudioRef.current?.pause();
    if (playingDemo === key) {
      setPlayingDemo(null);
      return;
    }
    const audio = new Audio(demoSamples[key]);
    demoAudioRef.current = audio;
    setPlayingDemo(key);
    audio.onended = () => setPlayingDemo(null);
    audio.play().catch(() => setPlayingDemo(null));
  }

  return (
    <div className="page">
      <header className="nav">
        <a className="nav-brand" href="#top" aria-label="VoXShift home">
          <span className="brand-orb" aria-hidden="true">
            <img src="/logo.svg" alt="" width={36} height={36} />
          </span>
          VoXShift
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#preview">Preview</a>
          <a href="#studio">Studio</a>
          <a href="#how">How to use</a>
          <a href="#where">Where to use</a>
          <a href="#faq">FAQ</a>
          <a className="nav-cta" href="#studio">
            Open Swap Studio
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <img
            src="/hero-bg.jpg"
            alt=""
            width={1920}
            height={1080}
            fetchPriority="high"
          />
        </div>
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-swap-viz" aria-hidden="true">
          <div className="hero-lane">
            <span className="lane-label">Content</span>
            <Waveform variant="content" />
          </div>
          <div className="hero-swap-pulse">
            <span className="swap-ring" />
            <span className="swap-ring delay" />
            <span className="swap-core">⇧</span>
          </div>
          <div className="hero-lane">
            <span className="lane-label">Shifted</span>
            <Waveform variant="result" />
          </div>
        </div>
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Premium voice swap · Free forever
          </div>
          <h1 className="brand-mark">
            VoX<span className="shift-glow">Shift</span>
          </h1>
          <p className="hero-line">Swap any voice onto your clip—fast, private, unlimited.</p>
          <p className="hero-sub">
            Upload a target voice and a content take. Browser-side conversion. No celebrity library. No credit wall.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#studio">
              Launch Swap Studio
            </a>
            <a className="btn btn-ghost" href="#preview">
              Hear an example
            </a>
          </div>
          <p className="scroll-hint">Scroll for the studio ↓</p>
        </div>
      </section>

      <section className="section" id="preview">
        <div className="section-head">
          <h2>Example preview</h2>
          <p>
            Hear the idea in three clips: content, target, then the swapped result. Synthetic demos — your real uploads
            will sound like your voices.
          </p>
        </div>

        <div className="preview-stage">
          <div className="preview-flow" aria-hidden="true">
            <Waveform variant="content" />
            <div className="preview-morph">
              <span className="morph-bar" />
              <span className="morph-label">voice shift</span>
            </div>
            <Waveform variant="result" />
          </div>

          <div className="preview-grid">
            {DEMO_CARDS.map((card, i) => (
              <article
                key={card.key}
                className={`preview-card preview-${card.key}${playingDemo === card.key ? " playing" : ""}`}
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                <div className="preview-card-top">
                  <div>
                    <p className="preview-kicker">{String(i + 1).padStart(2, "0")}</p>
                    <h3>{card.label}</h3>
                    <p>{card.blurb}</p>
                  </div>
                  <Waveform variant={card.key === "target" ? "target" : card.key} />
                </div>
                <button
                  type="button"
                  className="btn btn-ghost preview-play"
                  onClick={() => playDemo(card.key)}
                  aria-pressed={playingDemo === card.key}
                >
                  {playingDemo === card.key ? "Stop" : "Play"}
                </button>
                <audio
                  className="preview-audio"
                  controls
                  preload="metadata"
                  src={demoSamples[card.key]}
                  onPlay={() => setPlayingDemo(card.key)}
                  onPause={() => setPlayingDemo((cur) => (cur === card.key ? null : cur))}
                  onEnded={() => setPlayingDemo((cur) => (cur === card.key ? null : cur))}
                />
              </article>
            ))}
          </div>
          <p className="fineprint preview-note">
            Demo tones are illustrative. In Swap Studio, your uploaded target + content drive the real conversion.
          </p>
        </div>
      </section>

      <section className="section" id="studio">
        <div className="section-head">
          <h2>Swap Studio</h2>
          <p>
            Two uploads. One conversion. Keep the words from your content clip and lean into the character of your
            target sample.
          </p>
        </div>

        <div className="studio">
          <div className="studio-grid">
            <label
              className={`drop${drag === "target" ? " drag" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDrag("target");
              }}
              onDragLeave={() => setDrag(null)}
              onDrop={(e) => onDrop("target", e)}
            >
              <div>
                <h3>1 · Target voice</h3>
                <p>The voice you want to sound like. Clear speech, 5–20 seconds works best.</p>
              </div>
              {target ? (
                <span className="file-chip">
                  {target.name} · {formatBytes(target.size)}
                </span>
              ) : (
                <span className="file-chip">Drop audio or click to browse</span>
              )}
              <input
                type="file"
                accept="audio/*,video/*,.wav,.mp3,.m4a,.ogg,.webm"
                onChange={(e) => assign("target", e.target.files?.[0] ?? null)}
              />
            </label>

            <div className="swap-arrow" aria-hidden="true">
              <span>→</span>
            </div>

            <label
              className={`drop${drag === "content" ? " drag" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDrag("content");
              }}
              onDragLeave={() => setDrag(null)}
              onDrop={(e) => onDrop("content", e)}
            >
              <div>
                <h3>2 · Content clip</h3>
                <p>The words and timing you want to keep. This is the performance that gets re-voiced.</p>
              </div>
              {content ? (
                <span className="file-chip">
                  {content.name} · {formatBytes(content.size)}
                </span>
              ) : (
                <span className="file-chip">Drop audio or click to browse</span>
              )}
              <input
                type="file"
                accept="audio/*,video/*,.wav,.mp3,.m4a,.ogg,.webm"
                onChange={(e) => assign("content", e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <div className="studio-actions">
            <button
              className="btn btn-primary"
              type="button"
              disabled={!target || !content || busy}
              onClick={runConvert}
            >
              {busy ? "Converting…" : "Convert voice"}
            </button>
            {resultUrl && (
              <button className="btn btn-ghost" type="button" onClick={download}>
                Download WAV
              </button>
            )}
            {(busy || progressLabel) && (
              <div className="progress-wrap" aria-live="polite">
                <div className="progress-label">
                  <span>{progressLabel || "working"}</span>
                  <span>{progressPct}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progressPct}%` }} />
                </div>
              </div>
            )}
          </div>

          {error && <div className="error">{error}</div>}

          {resultUrl && (
            <div className="result">
              <div>
                <strong>Ready.</strong> Preview your swap, then download the WAV.
              </div>
              <audio controls src={resultUrl} />
            </div>
          )}

          <p className="fineprint">
            Use only voices you own or have permission to process. VoXShift is a creative tool—not a disguise for
            fraud, impersonation without consent, or deepfake abuse.
          </p>
        </div>
      </section>

      <section className="section" id="how">
        <div className="section-head">
          <h2>How to use</h2>
          <p>Three steps from sample to download. No account. No queue.</p>
        </div>
        <div className="steps">
          <article className="step">
            <span className="step-num">01</span>
            <h3>Drop a target voice</h3>
            <p>Pick a clean sample of the voice you want. Short and dry beats noisy or music-heavy takes.</p>
          </article>
          <article className="step">
            <span className="step-num">02</span>
            <h3>Add your content clip</h3>
            <p>Upload the line, narration, or dialogue you want re-voiced. Timing and words stay with this clip.</p>
          </article>
          <article className="step">
            <span className="step-num">03</span>
            <h3>Convert and download</h3>
            <p>Hit Convert. When the bar finishes, preview in place and save the WAV for your editor or timeline.</p>
          </article>
        </div>
      </section>

      <section className="section" id="where">
        <div className="section-head">
          <h2>Where you can use it</h2>
          <p>Built for creators who need a fast speech-to-speech sketch—not a celebrity voice store.</p>
        </div>
        <div className="uses">
          <article className="use">
            <h3>Prototype character VO</h3>
            <p>Test casting directions before booking a session. Swap temp lines onto scratch dialogue.</p>
          </article>
          <article className="use">
            <h3>Creator & podcast drafts</h3>
            <p>Sketch intros, ad reads, and alt takes without booking a booth for every experiment.</p>
          </article>
          <article className="use">
            <h3>Learning & accessibility</h3>
            <p>Practice pronunciation, compare delivery, or explore voice tools with consenting samples only.</p>
          </article>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="section-head">
          <h2>FAQs</h2>
          <p>Straight answers for a free, unlimited, browser-side voice swap.</p>
        </div>
        <div className="faq">
          {FAQS.map((item, i) => {
            const open = openFaq === i;
            return (
              <div key={item.q} className={`faq-item${open ? " open" : ""}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-chevron" aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && <p className="faq-answer">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong>VoXShift</strong> · Premium Swap Studio · Free forever
        </div>
        <div>Client-side conversion · Cloudflare Pages ready · Built for creators</div>
      </footer>
    </div>
  );
}
