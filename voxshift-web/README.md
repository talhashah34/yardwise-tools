# VoXShift

Premium single-page **Swap Studio** — free unlimited speech-to-speech voice conversion in the browser.

Upload a **target voice** and a **content clip**. VoXShift transfers timbre and pitch cues onto your clip and downloads a WAV. No account. No celebrity library. Processing stays client-side.

## Local

```bash
cd voxshift-web
npm install
npm run dev
```

Dev server: `http://127.0.0.1:4871`

```bash
npm run build
npm run preview
```

## Cloudflare Pages

1. Connect this repo (or the `voxshift-web` folder as the project root).
2. Build command: `npm run build`
3. Output directory: `dist`
4. Node version: 20+

Optional CLI deploy from this folder:

```bash
npm run build
npx wrangler pages deploy dist --project-name=voxshift
```

`wrangler.toml`, `public/_headers`, and `public/_redirects` are included for Pages.

## Stack

- Vite + React + TypeScript
- Client-side STFT voice conversion (`src/audio/convert.ts`)
- SEO: meta, Open Graph, Twitter, JSON-LD (WebApplication + FAQPage), robots, sitemap
