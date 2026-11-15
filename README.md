# Yardwise Tools

Material calculators and guides for DIY landscaping projects.

## Deploy to Cloudflare Pages

This repository is configured for **Cloudflare Pages** with Next.js static export.

### Build settings

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | `22` (see `.node-version`) |

### Local development

```bash
npm install
npm run dev
```

### Production build

```bash
npm run build
```

The static site is written to `out/` for Cloudflare Pages.

### Headers and redirects

- `public/_headers` — security and caching headers for Cloudflare Pages
- `public/_redirects` — SPA/static redirects for Cloudflare Pages

`netlify.toml` is retained for reference but Cloudflare Pages is the primary deploy target.
