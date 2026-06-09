# SEO / OpenGraph — Findings & TODO

Status of SEO/OpenGraph config in the Terkis CMS site. Infrastructure is in place and wired up; the items below are gaps to fix.

## ✅ Already working

- **`@payloadcms/plugin-seo` v3.84.1** — `src/plugins/index.ts:31`. Adds `meta` field group (title/description/image) to `Pages` and `Products`. Has `generateTitle` + `generateURL` helpers.
- **Root layout metadata** — `src/app/(app)/layout.tsx:43`. `metadataBase`, default OpenGraph, `robots: { index, follow }`, title template, Twitter `summary_large_image` card.
- **Per-page metadata** — `src/utilities/generateMeta.ts`, consumed via `generateMetadata` in: `products/[slug]`, `news/[slug]`, `[slug]`, `default`, and an order page.
- **Per-page OG image path is correct** — uploaded media resolve to `/media/<file>` (static dir `public/media`), so `NEXT_PUBLIC_SERVER_URL + image.url` works. (`/api/media/file/` is Payload's dynamic handler; `/media/...` is the served static path — these are intentionally different.)

## ✅ Fixed

### 1. Default OG image is a 404 — `src/utilities/mergeOpenGraph.ts:10`

- **Fix:** Repointed fallback to `/image/industrial-plant.webp`.

### 2. Leftover Payload boilerplate strings (should say "Terkis")

- **Fix:** Updated `src/plugins/index.ts`, `src/utilities/mergeOpenGraph.ts`, and `src/utilities/generateMeta.ts` to use "Terkis".

### 3. Dead favicon `<link>` tags — `src/app/(app)/layout.tsx:69-70`

- **Fix:** Removed manual `<link>` tags. App Router handles favicons automatically from `src/app/(app)/favicon.ico`.

### 4. Missing `robots.txt` / `sitemap.xml`

- **Fix:** Created `src/app/(app)/robots.ts` and `src/app/(app)/sitemap.ts` (dynamic fetching enabled).

## Reference: available image assets

| Asset                   | Path                 | Notes                                       |
| ----------------------- | -------------------- | ------------------------------------------- |
| `industrial-plant.webp` | `public/image/`      | 353 KB, best OG candidate                   |
| `LOGO.png`              | `public/media/`      | 218×72 — too small for OG (needs ~1200×630) |
| `favicon.ico`           | `src/app/(app)/`     | already auto-served by App Router           |
| Product images          | `public/media/*.png` | product-specific, not a site default        |
