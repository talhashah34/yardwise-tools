# VoXShift (Web)

Browser voice changer — same idea as the Python desktop app, running with the Web Audio API.

## What it does

1. Asks for microphone access
2. Processes your voice live in the browser (pitch, formant, robot, reverb, echo, warmth, gate)
3. Plays the changed voice back to your speakers/headphones
4. Lets you record and download a clip

No audio is uploaded for the live effect — processing stays on your device.

## Run locally

```bash
cd voxshift-web
npm install
npm run dev
```

Open http://127.0.0.1:4871

Use **headphones** to avoid feedback.

## Desktop vs Web

| | Desktop (`D:\ai-voice-changer`) | Web (`voxshift-web`) |
|---|---|---|
| Install | Python + bat | None (just open site) |
| Processing | Python / NumPy | Browser AudioWorklet |
| Live Discord mic | Easier with virtual cable | Needs virtual cable too, or use Record/download |
| Sell as | Downloadable app | Website / SaaS |

## Build

```bash
npm run build
npm run preview
```
