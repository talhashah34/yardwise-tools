import { useEffect, useRef, useState } from "react";
import { convertVoice, isMediaFile } from "./audio/convert";
import { demoSamples } from "./audio/demoSamples";
import { AdSlot } from "./components/AdSlot";
import "./index.css";

type Slot = "target" | "content";
type DemoTrack = "content" | "target" | "live";

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

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

async function urlToFile(url: string, name: string): Promise<File> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not load ${name}`);
  const blob = await res.blob();
  return new File([blob], name, { type: blob.type || "audio/wav" });
}

/** Prefer public example files (easy to replace); fall back to embeds. */
const DEMO_URLS = {
  content: "/examples/content-demo.wav",
  target: "/examples/target-demo.wav",
} as const;

function Waveform({
  variant,
  active = false,
}: {
  variant: "content" | "target" | "result";
  active?: boolean;
}) {
  return (
    <div className={`wave wave-${variant}${active ? " active" : ""}`} aria-hidden="true">
      {Array.from({ length: 20 }, (_, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.045}s` }} />
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

  const [demoBusy, setDemoBusy] = useState(false);
  const [demoPct, setDemoPct] = useState(0);
  const [demoLabel, setDemoLabel] = useState("");
  const [demoError, setDemoError] = useState<string | null>(null);
  const [liveDemoUrl, setLiveDemoUrl] = useState<string | null>(null);
  const [playingDemo, setPlayingDemo] = useState<DemoTrack | null>(null);

  const resultRef = useRef<string | null>(null);
  const liveDemoRef = useRef<string | null>(null);
  const demoAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (resultRef.current) URL.revokeObjectURL(resultRef.current);
      if (liveDemoRef.current) URL.revokeObjectURL(liveDemoRef.current);
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

  function stopDemoAudio() {
    demoAudioRef.current?.pause();
    demoAudioRef.current = null;
    setPlayingDemo(null);
  }

  function playTrack(track: DemoTrack, src: string) {
    stopDemoAudio();
    const audio = new Audio(src);
    demoAudioRef.current = audio;
    setPlayingDemo(track);
    audio.onended = () => setPlayingDemo(null);
    audio.play().catch(() => setPlayingDemo(null));
  }

  async function runLiveDemo() {
    if (demoBusy) return;
    stopDemoAudio();
    setDemoBusy(true);
    setDemoError(null);
    setDemoPct(5);
    setDemoLabel("Loading sample clips…");
    try {
      let contentFile: File;
      let targetFile: File;
      try {
        [contentFile, targetFile] = await Promise.all([
          urlToFile(DEMO_URLS.content, "content-demo.wav"),
          urlToFile(DEMO_URLS.target, "target-demo.wav"),
        ]);
      } catch {
        [contentFile, targetFile] = await Promise.all([
          urlToFile(demoSamples.content, "content-demo.wav"),
          urlToFile(demoSamples.target, "target-demo.wav"),
        ]);
      }
      const { blob } = await convertVoice({
        contentFile,
        targetFile,
        onProgress: (pct, label) => {
          setDemoPct(Math.round(pct));
          setDemoLabel(label);
        },
      });
      if (liveDemoRef.current) URL.revokeObjectURL(liveDemoRef.current);
      const url = URL.createObjectURL(blob);
      liveDemoRef.current = url;
      setLiveDemoUrl(url);
      setDemoPct(100);
      setDemoLabel("Live swap ready — hit Play after");
      playTrack("live", url);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Live demo failed.";
      setDemoError(msg);
      setDemoLabel("");
      setDemoPct(0);
    } finally {
      setDemoBusy(false);
    }
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
          <a href="#preview">Try demo</a>
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
            <a className="btn btn-primary" href="#preview">
              Try a live demo
            </a>
            <a className="btn btn-ghost" href="#studio">
              Open Swap Studio
            </a>
          </div>
          <p className="scroll-hint">Scroll to hear the tool ↓</p>
        </div>
      </section>

      <div className="ad-band">
        <AdSlot slot="vox-top-leaderboard" format="leaderboard" />
      </div>

      <section className="section" id="preview">
        <div className="section-head">
          <h2>Try it before you upload</h2>
          <p>
            One click runs the real VoXShift engine on sample clips in your browser. Compare the original content line
            with the live swapped result — no files, no account.
          </p>
        </div>

        <div className="preview-stage">
          <div className="live-demo">
            <div className="live-demo-viz" aria-hidden="true">
              <div className="live-lane">
                <span>Before</span>
                <Waveform variant="content" active={playingDemo === "content"} />
              </div>
              <div className="live-shift">
                <span className="morph-bar" />
                <span className="morph-label">live shift</span>
              </div>
              <div className="live-lane">
                <span>After</span>
                <Waveform variant="result" active={playingDemo === "live"} />
              </div>
            </div>

            <div className="live-demo-actions">
              <button
                type="button"
                className="btn btn-primary"
                disabled={demoBusy}
                onClick={runLiveDemo}
              >
                {demoBusy ? "Running swap…" : liveDemoUrl ? "Run live demo again" : "Run live demo"}
              </button>
              {(demoBusy || demoLabel) && (
                <div className="progress-wrap" aria-live="polite">
                  <div className="progress-label">
                    <span>{demoLabel || "working"}</span>
                    <span>{demoPct}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${demoPct}%` }} />
                  </div>
                </div>
              )}
            </div>

            {demoError && <div className="error">{demoError}</div>}

            <div className="compare-grid">
              <article className={`compare-card${playingDemo === "content" ? " playing" : ""}`}>
                <div className="compare-head">
                  <div>
                    <p className="preview-kicker">01</p>
                    <h3>Content (before)</h3>
                    <p>Original line & timing</p>
                  </div>
                  <Waveform variant="content" active={playingDemo === "content"} />
                </div>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() =>
                    playingDemo === "content"
                      ? stopDemoAudio()
                      : playTrack("content", DEMO_URLS.content)
                  }
                >
                  {playingDemo === "content" ? "Stop" : "Play before"}
                </button>
                <audio className="preview-audio" controls preload="metadata" src={DEMO_URLS.content} />
              </article>

              <article className={`compare-card${playingDemo === "target" ? " playing" : ""}`}>
                <div className="compare-head">
                  <div>
                    <p className="preview-kicker">02</p>
                    <h3>Target voice</h3>
                    <p>Character the engine leans into</p>
                  </div>
                  <Waveform variant="target" active={playingDemo === "target"} />
                </div>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() =>
                    playingDemo === "target" ? stopDemoAudio() : playTrack("target", DEMO_URLS.target)
                  }
                >
                  {playingDemo === "target" ? "Stop" : "Play target"}
                </button>
                <audio className="preview-audio" controls preload="metadata" src={DEMO_URLS.target} />
              </article>

              <article
                className={`compare-card compare-result${playingDemo === "live" ? " playing" : ""}${
                  liveDemoUrl ? " ready" : ""
                }`}
              >
                <div className="compare-head">
                  <div>
                    <p className="preview-kicker">03</p>
                    <h3>Live swapped result</h3>
                    <p>{liveDemoUrl ? "Fresh output from this browser" : "Run the demo to generate"}</p>
                  </div>
                  <Waveform variant="result" active={playingDemo === "live"} />
                </div>
                <button
                  type="button"
                  className="btn btn-ghost"
                  disabled={!liveDemoUrl}
                  onClick={() => {
                    if (!liveDemoUrl) return;
                    if (playingDemo === "live") stopDemoAudio();
                    else playTrack("live", liveDemoUrl);
                  }}
                >
                  {playingDemo === "live" ? "Stop" : "Play after"}
                </button>
                {liveDemoUrl ? (
                  <audio className="preview-audio" controls src={liveDemoUrl} />
                ) : (
                  <p className="compare-empty">Hit “Run live demo” — same engine as Swap Studio.</p>
                )}
              </article>
            </div>

            <p className="fineprint preview-note">
              Demo clips live in <code>public/examples/</code> — swap in your own speech WAVs anytime. The button runs
              the same engine as Swap Studio in your browser.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-studio" id="studio">
        <div className="section-head">
          <h2>Swap Studio</h2>
          <p>
            Two uploads. One conversion. Keep the words from your content clip and lean into the character of your
            target sample.
          </p>
        </div>

        <div className="studio-shell">
          <div className="studio-rail studio-rail-left">
            <AdSlot slot="vox-studio-left-rail" format="rail" label="Advertisement · left of studio" />
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

          <div className="studio-rail studio-rail-right">
            <AdSlot slot="vox-studio-right-rail" format="rail" label="Advertisement · right of studio" />
          </div>
        </div>
      </section>

      <div className="ad-band">
        <AdSlot slot="vox-mid-rectangle" format="rectangle" />
      </div>

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

      <div className="ad-band">
        <AdSlot slot="vox-infeed" format="infeed" />
      </div>

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
                <div className="faq-panel">
                  <div className="faq-panel-inner">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="ad-band ad-band-footer">
        <AdSlot slot="vox-footer-leaderboard" format="leaderboard" />
      </div>

      <footer className="footer">
        <div>
          <strong>VoXShift</strong> · Premium Swap Studio · Free forever
        </div>
        <div>Client-side conversion · Cloudflare Pages ready · Built for creators</div>
      </footer>
    </div>
  );
}
