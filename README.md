# Yardwise

Smarter planning for better outdoor spaces.

Yardwise is an SEO-focused landscaping material calculator site for a **global** audience. Current tools include **Mulch**, **Topsoil**, **Compost**, **Gravel**, **Pea Gravel**, and **Gravel Driveway** calculators with imperial/metric units, bagged vs bulk recommendations, optional multi-currency costs, approximate gravel weight, and practical planning guides.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Static export for Netlify Free hosting
- Vitest for calculation unit tests

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3847](http://localhost:3847).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3847 |
| `npm run build` | Create a static production build in `out/` |
| `npm run start` | Serve the `out/` folder locally (static preview) |
| `npm run preview` | Build, then serve `out/` |
| `npm test` | Run calculation unit tests |
| `npm run lint` | Run ESLint |

## Deploy to Netlify (free)

This project is set up for **Netlify Free** static hosting (not Cursor hosting).

1. Push this repository to GitHub.
2. In Netlify: **Add new site → Import an existing project**.
3. Build settings (also in `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
4. Optional environment variables:
   - `NEXT_PUBLIC_SITE_URL` — your live Netlify URL (for canonical/OG links)
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 ID (`G-…`); optional override of the built-in default
   - `NEXT_PUBLIC_ADSENSE_CLIENT` — AdSense publisher ID (`ca-pub-…`); required to load ads
   - `NEXT_PUBLIC_ADSENSE_SLOT_CALCULATOR` — display slot ID under calculator pages
   - `NEXT_PUBLIC_ADSENSE_SLOT_GUIDE` — display slot ID under guide articles

After the first deploy, set `NEXT_PUBLIC_SITE_URL` to your real `https://….netlify.app` (or custom domain) and redeploy so sitemap/canonical URLs match.

## Project structure

```text
src/
  app/                 # Routes and metadata
  components/          # Layout, homepage, calculator, UI
  content/guides/      # Editorial guide content
  lib/calculations/    # Pure mulch calculation engine
  lib/conversions/     # Unit conversion helpers
  lib/seo/             # Metadata helpers
  config/site.ts       # Site-wide configuration
tests/calculations/    # Vitest coverage for formulas
```

## Notes

- Calculator math runs entirely in the browser.
- No accounts, databases, or paid APIs are required.
- Advertising slots are reserved in the layout but not activated in the initial release.
