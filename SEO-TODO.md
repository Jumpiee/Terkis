# SEO / OpenGraph — Findings & TODO

Status of SEO/OpenGraph config in the Terkis CMS site. Infrastructure is in place and wired up; the items below are gaps to fix.

## ✅ Already working

- **`@payloadcms/plugin-seo` v3.84.1** — `src/plugins/index.ts:31`. Adds `meta` field group (title/description/image) to `Pages` and `Products`. Has `generateTitle` + `generateURL` helpers.
- **Root layout metadata** — `src/app/(app)/layout.tsx:43`. `metadataBase`, default OpenGraph, `robots: { index, follow }`, title template, Twitter `summary_large_image` card.
- **Per-page metadata** — `src/utilities/generateMeta.ts`, consumed via `generateMetadata` in: `products/[slug]`, `news/[slug]`, `[slug]`, `default`, and an order page.
- **Per-page OG image path is correct** — uploaded media resolves to `/media/<file>` (static dir `public/media`), so `NEXT_PUBLIC_SERVER_URL + image.url` works. (`/api/media/file/` is Payload's dynamic handler; `/media/...` is the served static path — these are intentionally different.)

## ⚠️ To fix

### 1. Default OG image is a 404 — `src/utilities/mergeOpenGraph.ts:10`
References `/images/og-image.jpg` (plural `images`), but that file/dir does not exist. The only large on-brand asset present is `public/image/industrial-plant.webp` (singular `image`, 353 KB).
- **Fix option A:** repoint fallback to `/image/industrial-plant.webp`.
- **Fix option B:** create `public/images/og-image.jpg`.

### 2. Leftover Payload boilerplate strings (should say "Terkis")
- `src/plugins/index.ts:21` → `${doc.title} | Payload Ecommerce Template`
- `src/utilities/mergeOpenGraph.ts:13-14` → `'Payload Website Template'` fallback
- `src/utilities/generateMeta.ts:31,34` → `'Payload Ecommerce Template'` fallback

### 3. Dead favicon `<link>` tags — `src/app/(app)/layout.tsx:69-70`
Manual links to `/favicon.ico` and `/favicon.svg` at root will 404 — no files at `public/`. The real favicon is at `src/app/(app)/favicon.ico` (App Router auto-serves it).
- **Fix:** remove the manual `<link>` tags, OR add real files at `public/favicon.ico` + `public/favicon.svg`.

### 4. Missing `robots.txt` / `sitemap.xml`
No `src/app/robots.ts` or `src/app/sitemap.ts`. Standard SEO files, not yet present.

## Reference: available image assets

| Asset | Path | Notes |
|---|---|---|
| `industrial-plant.webp` | `public/image/` | 353 KB, best OG candidate |
| `LOGO.png` | `public/media/` | 218×72 — too small for OG (needs ~1200×630) |
| `favicon.ico` | `src/app/(app)/` | already auto-served by App Router |
| Product images | `public/media/*.png` | product-specific, not a site default |
