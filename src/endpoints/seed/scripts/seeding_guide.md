# Terkis CMS — Product Seeding Guide

How to seed a new product into Payload CMS via the REST API without touching the admin UI.

---

## 1. Overview

Products live in the `products` collection. Each product has:

- **Scalar fields** — `title`, `slug`, `_status`, `brand` (id), `categories` (array of ids)
- **Lexical field** — `description` (richText node tree)
- **Layout field** — ordered array of block objects; each has a `blockType` key

All seeding is done by posting JSON to the Payload REST API.
No image uploads are required to create a working product page.

---

## 2. File exec

```
src/endpoints/seed/scripts/seed-<brand-slug>.ts
```

Run with:

```bash
npx tsx src/endpoints/seed/scripts/seed-<brand-slug>.ts
```

The dev server must be running on `http://localhost:3000`.

---

## 3. Boilerplate — copy this into every new seed file

```typescript
// Run: npx tsx src/endpoints/seed/scripts/seed-<brand>.ts
const BASE_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
const EMAIL = process.env.SEED_EMAIL ?? 'ai@hotmail.com'
const PASSWORD = process.env.SEED_PASSWORD ?? 'admin1234'

async function api(method: 'GET' | 'POST' | 'PATCH', path: string, body?: unknown, token?: string) {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `JWT ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(`[${method} ${path}] ${res.status}: ${JSON.stringify(json)}`)
  return json
}

async function login(): Promise<string> {
  const data = await api('POST', '/users/login', { email: EMAIL, password: PASSWORD })
  if (!data?.token) throw new Error('Login failed')
  return data.token
}

// Idempotent — finds by slug, creates only if missing.
// CRITICAL: REST POST returns { doc: { ... } }, not the doc directly.
async function findOrCreate(
  collection: string,
  slug: string,
  createData: Record<string, unknown>,
  token: string,
): Promise<{ id: string | number }> {
  const params = new URLSearchParams({ 'where[slug][equals]': slug })
  const res = await api('GET', `/${collection}?${params}`, undefined, token)
  if (res.docs?.length > 0) return res.docs[0]
  const created = await api('POST', `/${collection}`, createData, token)
  return created.doc ?? created
}

// Minimal single-paragraph Lexical richText node.
function richText(text: string) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      children: [
        {
          type: 'paragraph',
          version: 1,
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          textStyle: '',
          children: [
            {
              type: 'text',
              version: 1,
              detail: 0,
              format: 0,
              mode: 'normal' as const,
              style: '',
              text,
            },
          ],
        },
      ],
    },
  }
}

async function main() {
  const token = await login()

  // 1. Brand (findOrCreate is idempotent — safe to re-run)
  const brand = await findOrCreate(
    'brands',
    '<brand-slug>',
    { title: '<Brand Title>', slug: '<brand-slug>' },
    token,
  )

  // 2. Category — pick one: 'mechanical' | 'electrical' | 'instrument'
  const category = await findOrCreate(
    'product-categories',
    'mechanical',
    { title: 'Mechanical', slug: 'mechanical' },
    token,
  )

  // 3. Layout blocks — see section 4 below
  const layout = [
    /* ... blocks ... */
  ]

  // 4. Create product
  const product = await api(
    'POST',
    '/products',
    {
      title: '<Product Title>',
      slug: '<product-slug>',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('<One paragraph product description.>'),
      gallery: [],
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: '<Product Title> | Terkis',
        description: '<150-char SEO description>',
      },
    },
    token,
  )

  console.log(`✓ Product: "${product.doc?.title}" → /products/${product.doc?.slug}`)
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
```

---

## 4. Product Categories

| Slug         | Title      | Use for                                     |
| ------------ | ---------- | ------------------------------------------- |
| `mechanical` | Mechanical | Pumps, valves, piping, mechanical equipment |
| `electrical` | Electrical | Actuators, motors, electrical control       |
| `instrument` | Instrument | Flow meters, monitors, measurement devices  |

---

## 5. Layout Blocks

The `layout` array is an ordered list. Recommended standard order:

1. `statsBlock`
2. `dataSheet`
3. `comparisonTable`
4. `applicationsBlock`
5. `ctaBanner`

All blocks accept an optional `blockName` string (displayed in the admin block list only — not rendered on the page).

---

### 5.1 `statsBlock`

**Visual:** White section with a thin border. 4-column grid (2 cols on mobile). Each cell has a large bold number, a small red uppercase unit label beside it, and a monospace uppercase description below.

**Use when:** You have exactly 4 headline KPIs — a number, a unit, and a short label. Always place this first.

**Rules:** Exactly 4 stats (minRows=4, maxRows=4). If `unit` is empty use `''`, never omit the key.

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ 3,500 m³/h  │ 470 m       │ PN 400      │ −120/+550°C │
│ MAX FLOW    │ MAX HEAD    │ PRESSURE    │ TEMPERATURE │
└─────────────┴─────────────┴─────────────┴─────────────┘
  title+unit    title+unit    title (no u)   title+unit
```

```typescript
{
  blockType: 'statsBlock',
  blockName: 'Key Performance Figures',   // admin label only, not rendered
  stats: [
    { title: '3,500', unit: 'm³/h', label: 'Max Flow Rate' },
    { title: '470',   unit: 'm',    label: 'Max Head' },
    { title: 'PN 400', unit: '',    label: 'Pressure Rating' },
    { title: '−120 / +550', unit: '°C', label: 'Temperature Range' },
  ],
}
```

| Field           | Type   | Notes                                                   |
| --------------- | ------ | ------------------------------------------------------- |
| `stats`         | array  | **Exactly 4 items**                                     |
| `stats[].title` | string | Large bold value — the number or range                  |
| `stats[].unit`  | string | Red uppercase unit next to the number; use `''` if none |
| `stats[].label` | string | Monospace uppercase description below                   |

---

### 5.2 `dataSheet`

**Visual:** Light grey (`bg-neutral-50`) section with `py-24` padding. Specs render as a grid of white cards separated by 1px dark gaps — 4 columns on desktop, 2 on tablet, 1 on mobile. Each card has a monospace grey label on top and a bold uppercase value below. Hover slightly darkens the card.

**Use when:** You need to list 5–12 detailed technical parameters (max pressure, materials, certifications, etc.).

```
┌──────────────────────────────────────────────────────┐
│  TECHNICAL DATA                                       │
│  Operational Matrix                                   │
│                                                       │
│ ┌──────────┬──────────┬──────────┬──────────┐        │
│ │ MAX FLOW │ MAX HEAD │MATERIALS │  CERTS   │        │
│ │ Up to    │ Up to    │ S/Steel, │ API 685, │        │
│ │ 3,500    │ 470 m    │ Duplex   │ ISO 15783│        │
│ └──────────┴──────────┴──────────┴──────────┘        │
└──────────────────────────────────────────────────────┘
```

```typescript
{
  blockType: 'dataSheet',
  blockName: 'Technical Specifications',
  eyebrow: 'Technical Data',       // monospace red overline
  heading: 'Operational Matrix',   // bold uppercase h2
  specs: [
    { label: 'Max Flow Rate',     value: 'Up to 3,500 m³/h' },
    { label: 'Pressure Rating',   value: 'Up to PN 400 (5,800 psi)' },
    { label: 'Temperature Range', value: '−120 °C to +550 °C' },
    { label: 'Materials',         value: 'Stainless Steel, Duplex, Hastelloy®' },
    { label: 'Certifications',    value: 'API 685, ISO 15783' },
  ],
}
```

| Field           | Type   | Notes                                        |
| --------------- | ------ | -------------------------------------------- |
| `eyebrow`       | string | Small monospace red overline above heading   |
| `heading`       | string | Bold uppercase section heading               |
| `specs`         | array  | Minimum 1; no maximum. Renders in 4-col grid |
| `specs[].label` | string | Grey monospace label (top of card)           |
| `specs[].value` | string | Bold uppercase value (bottom of card)        |

---

### 5.3 `comparisonTable`

**Visual:** Light grey section. Dark (`bg-neutral-900`) header row with white column labels and grey sub-labels. Data rows alternate white/light-grey on hover; the leftmost column shows a row number + param name in monospace. Cell values are `font-semibold`. Table scrolls horizontally on small screens.

**Use when:** The product has 2–6 models or series to compare side-by-side (e.g. Standard vs Compact vs Reinforced).

**Critical rule:** `rows[].values` array length **must equal** `columns` array length. Mismatched lengths silently drop cells.

```
┌───────────────┬──────────────┬──────────────┬──────────────┐
│ SPECIFICATION │   SLM NV     │   SLM AP     │   SLM GV    │ ← dark header
│               │  ISO Sealless│  API 685     │ Multi-Stage │
├───────────────┼──────────────┼──────────────┼─────────────┤
│ 01 MAX FLOW   │ 3,500 m³/h   │ 3,500 m³/h   │ 300 m³/h    │
│ 02 TEMP RANGE │ −200/+550°C  │ −200/+550°C  │ −120/+350°C │
└───────────────┴──────────────┴──────────────┴─────────────┘
```

```typescript
{
  blockType: 'comparisonTable',
  blockName: 'Model Series Comparison',
  eyebrow: 'Product Range',
  heading: 'Select Your Series',
  columns: [
    { code: 'SLM-NV', label: 'SLM NV', sub: 'ISO Sealless' },
    { code: 'SLM-AP', label: 'SLM AP', sub: 'API 685' },
    { code: 'SLM-GV', label: 'SLM GV', sub: 'Multi-Stage' },
  ],
  rows: [
    {
      param: 'Max Flow Rate',
      // values length MUST equal columns length (3 here)
      values: [
        { cell: '3,500 m³/h' },
        { cell: '3,500 m³/h' },
        { cell: '300 m³/h' },
      ],
    },
    {
      param: 'Temperature Range',
      values: [
        { cell: '−200 to +550 °C' },
        { cell: '−200 to +550 °C' },
        { cell: '−120 to +350 °C' },
      ],
    },
  ],
}
```

| Field             | Type   | Notes                                                       |
| ----------------- | ------ | ----------------------------------------------------------- |
| `columns`         | array  | 1–6 columns                                                 |
| `columns[].code`  | string | Tiny monospace code above label (e.g. `VAR-01`)             |
| `columns[].label` | string | White bold column title                                     |
| `columns[].sub`   | string | Grey italic sub-label                                       |
| `rows`            | array  | Minimum 1 row                                               |
| `rows[].param`    | string | Left-column row label (auto-numbered `01`, `02`…)           |
| `rows[].values`   | array  | **Must equal `columns.length`** — one `{ cell }` per column |

---

### 5.4 `applicationsBlock`

**Visual:** Dark (`bg-neutral-900`) section with white text. Cards are displayed in a 3-column grid separated by 1px neutral dividers. Each card has: a monospace grey code top-left + a red expanding underline top-right (animates on hover), a bold white title, a grey body text, and a red left-border badge at the bottom. Hover darkens the card slightly.

**Use when:** Listing 3–4 industries or application contexts where the product is used. Always use 3 or multiples of 3 for clean grid alignment.

```
┌─────────────────────────────────────────────────────┐  dark bg
│  SERVICE CONDITIONS                                  │
│  Industrial Applications                             │
│  ┌─────────────────┬──────────────────┬────────────┐│
│  │ APP-01       ── │ APP-02        ── │ APP-03  ── ││
│  │                 │                  │            ││
│  │ Chemical        │ Oil & Gas        │ Cryogenic  ││
│  │ Processing      │                  │ Service    ││
│  │                 │                  │            ││
│  │ Sealed transfer │ API 685 pumps    │ Down to    ││
│  │ of aggressive…  │ for crude oil…   │ −200 °C…   ││
│  │                 │                  │            ││
│  │ | MECHANICAL    │ | MECHANICAL     │ |MECHANICAL││
│  └─────────────────┴──────────────────┴────────────┘│
└─────────────────────────────────────────────────────┘
```

```typescript
{
  blockType: 'applicationsBlock',
  blockName: 'Industrial Applications',
  eyebrow: 'Service Conditions',         // monospace red overline
  heading: 'Industrial Applications',    // white h2
  applications: [
    {
      code: 'APP-01',                    // grey monospace top-left of card
      title: 'Chemical Processing',      // white bold card heading
      body: 'Hermetically sealed transfer of aggressive acids and solvents.',  // 1–2 sentences
      badge: 'Mechanical',              // red left-border tag at card bottom
    },
    {
      code: 'APP-02',
      title: 'Oil & Gas',
      body: 'API 685 compliant pumps for crude oil and refined product transfer.',
      badge: 'Mechanical',
    },
    {
      code: 'APP-03',
      title: 'Cryogenic Service',
      body: 'Specialized models handle liquid nitrogen and LNG down to −200 °C.',
      badge: 'Mechanical',
    },
  ],
}
```

| Field                  | Type   | Notes                                                                            |
| ---------------------- | ------ | -------------------------------------------------------------------------------- |
| `eyebrow`              | string | Red monospace overline                                                           |
| `heading`              | string | White bold uppercase heading                                                     |
| `applications[].code`  | string | Short ID shown top-left of card (e.g. `APP-01`)                                  |
| `applications[].title` | string | White bold card heading                                                          |
| `applications[].body`  | string | 1–2 sentence description; grey text                                              |
| `applications[].badge` | string | Red-bordered tag at card bottom — use `Mechanical` / `Electrical` / `Instrument` |

---

### 5.5 `ctaBanner`

**Visual:** Light grey (`bg-neutral-50`) section with a top border, centred layout, `py-20` padding. Heading is bold red uppercase. Description is grey body text. Two side-by-side buttons: solid black primary + outlined secondary. Both transform to black-fill on hover.

**Use when:** Always — place this as the **last block** on every product page.

```
┌──────────────────────────────────────────────────┐  light grey bg
│                                                  │
│       NEED A SEALLESS PUMP FOR YOUR PROCESS?     │  red heading
│                                                  │
│   Our engineering team will help you select…     │  grey text
│                                                  │
│        [  REQUEST A QUOTE  ]  [ VIEW ALL PRODUCTS ]
│         solid black btn       outlined btn        │
└──────────────────────────────────────────────────┘
```

```typescript
{
  blockType: 'ctaBanner',
  blockName: 'Request Quote CTA',
  heading: 'Need a Sealless Pump for Your Process?',   // red uppercase heading
  description: 'Our engineering team will help you select the right series for your requirements.',
  primaryLabel: 'Request a Quote',    // solid black button
  primaryHref: '/contact',
  secondaryLabel: 'View All Products', // outlined button
  secondaryHref: '/products',
}
```

| Field            | Type   | Notes                                                    |
| ---------------- | ------ | -------------------------------------------------------- |
| `heading`        | string | Bold red uppercase — make it a direct question or action |
| `description`    | string | 1–2 sentences of supporting copy                         |
| `primaryLabel`   | string | Solid black button label                                 |
| `primaryHref`    | string | Usually `/contact`                                       |
| `secondaryLabel` | string | Outlined button label                                    |
| `secondaryHref`  | string | Usually `/products`                                      |

---

### 5.6 `technicalPillars` ⚠️ requires image upload

**Visual:** White section, 2-column layout. Left: eyebrow + heading + description + 2×N grid of feature cards (each card has a letter badge A/B/C…, animated red underline, bold title, grey body). Right: square/tall image that fills the column height with `object-cover`.

**Use when:** Highlighting engineering advantages or technology differentiators, alongside a strong product photo.

**Requires:** A media document ID — upload the image to Payload Admin → Media first, then use the returned `id`.

```typescript
{
  blockType: 'technicalPillars',
  eyebrow: 'Why Choose Us',
  heading: 'Engineering Advantages',
  description: 'One or two sentences describing the technology differentiator.',
  items: [                          // 1–8 items; renders as 2-col grid
    { title: 'Zero Leakage',        body: 'Magnetic drive eliminates shaft seals entirely.' },
    { title: 'Extreme Temperatures', body: 'Operates from −200 °C to +550 °C.' },
    { title: 'API 685 Compliant',    body: 'Built to the strictest petrochemical standard.' },
    { title: 'Long Service Life',    body: 'No seal wear; MTBF exceeds 100,000 hours.' },
  ],
  image: '<media-document-id>',     // REQUIRED — upload first
}
```

| Field           | Type   | Notes                                                  |
| --------------- | ------ | ------------------------------------------------------ |
| `eyebrow`       | string | Red overline                                           |
| `heading`       | string | Bold uppercase left-column heading                     |
| `description`   | string | Short paragraph below heading                          |
| `items`         | array  | 1–8 items; cards lettered A, B, C…                     |
| `items[].title` | string | Bold card heading                                      |
| `items[].body`  | string | 1–2 sentence card body                                 |
| `image`         | string | Media document `id` — required, page errors without it |

---

### 5.7 `techDownloads` ⚠️ requires file upload

**Visual:** White section, 2-column layout. Left: eyebrow + heading + description + stacked download rows (each row shows label + filename + "Download" link). Right: dark panel (`bg-neutral-900`) with a text input for "Process Medium" and a red CTA button — acts as an inline enquiry form.

**Use when:** You have actual PDF datasheets or manuals to attach. Skip entirely if no files are available.

**Requires:** A media document ID for each file — upload PDFs to Payload Admin → Media first.

````typescript
{
  blockType: 'techDownloads',
  // Left column
  eyebrow: 'Support Materials',
  heading: 'Technical Downloads',
  description: 'Download our full datasheet and installation guide below.',
  documents: [
    { label: 'Product Datasheet (PDF)',    file: '<media-document-id>' },
    { label: 'Installation Manual (PDF)',  file: '<media-document-id>' },
  ],
  // Right dark panel
  ctaEyebrow: 'Direct Engineering Support',
  ctaHeading: 'Request a Custom Sizing Report',
  ctaDescription: 'Fill in your process medium and we will respond within 24 hours.',
  ctaInputLabel: 'Process Medium',
  ctaInputPlaceholder: 'e.g. Sulfuric Acid 98%',
  ctaButtonLabel: 'Submit Request',
}

---

## 6. Seeded Products (as of 2026-05-24)

| Product title | Slug | Brand | Category | Seed file |
|---------------|------|-------|----------|-----------|
| Klaus Union Sealless Magnetic Drive Pumps | `klaus-union-magnetic-drive-pump` | Klaus Union | Mechanical | `seed-product-test.ts` |
| 3P PRINZ Rotary Vane Pumps | `3p-prinz-rotary-vane-pump` | 3P PRINZ | Mechanical | `seed-3pprinz.ts` |
| AIRCON High-Performance Valve Actuators | `aircon-valve-actuators` | AIRCON | Electrical | `seed-aircon.ts` |
| CONTROLSEAL Rising Stem Ball Valves | `controlseal-rising-stem-ball-valve` | CONTROLSEAL | Mechanical | `seed-controlseal.ts` |
| Dixon Loading Arms | `dixon-loading-arm` | DIXON | Mechanical | `seed-dixon-loading-arm.ts` |
| Dixon ADS Overfill Protection Rack Monitor | `dixon-ads-overfill-monitor` | DIXON | Instrument | `seed-dixon-ads.ts` |
| Faure Herman High-Precision Flow Meters | `faure-herman-flow-meter` | FAURE HERMAN | Instrument | `seed-faure-herman.ts` |
| Flotite Industrial Ball Valves | `flotite-industrial-ball-valve` | Flotite | Mechanical | `seed-flotite.ts` |
| HITORK Intelligent Valve Actuators | `hitork-intelligent-electric-actuator` | HITORK | Electrical | `seed-hitork.ts` |
| HOMA Submersible Sewage Pumps | `homa-pumpen-submersible-sewage-pump` | HOMA PUMPEN | Mechanical | `seed-homa-pumpen.ts` |
| Protectoseal Flame Arresters & Conservation Vents | `protectoseal-flame-arrester` | Protectoseal | Mechanical | `seed-protectoseal.ts` |
| SAER Centrifugal & Submersible Water Pumps | `saer-centrifugal-water-pump` | SAER | Mechanical | `seed-saer.ts` |
| Victor Pumpen S-Series Self-Priming Pumps | `victor-pumpen-self-priming-pump` | Victor Pumpen | Mechanical | `seed-victor-pumpen.ts` |
| Niigata Single Drainage System | `tb-global-niigata-single-drain` | TB Global Technologies | Mechanical | `seed-tb-global.ts` |

All products have `gallery: []`. See `missing-images.md` for the image checklist.

---

## 7. Adding Images Later

1. Go to **Payload Admin → Media** → upload the image file
2. Copy the media document `id` from the URL or API response
3. PATCH the product gallery:

```bash
curl -X PATCH http://localhost:3000/api/products/<product-id> \
  -H "Content-Type: application/json" \
  -H "Authorization: JWT <token>" \
  -d '{ "gallery": [{ "image": "<media-id>" }] }'
````

Or update `technicalPillars` / `techDownloads` blocks to include the uploaded media id in the `image` / `file` fields.

---

## 8. Common Errors

| Error                                         | Cause                                     | Fix                                                               |
| --------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------- |
| `401 Unauthorized` on login                   | Wrong email/password                      | Check `EMAIL` / `PASSWORD` constants                              |
| `brand: undefined` or `categories: undefined` | `findOrCreate` returned the wrong thing   | REST POST returns `{ doc: {...} }` — use `created.doc ?? created` |
| `Validation error` on categories field        | Brand or category id is `undefined`       | Same as above                                                     |
| `comparisonTable values length mismatch`      | Row `values` array shorter than `columns` | Every row must have exactly `columns.length` items in `values`    |
| Product created but page 404                  | Wrong slug or `_status` not `'published'` | Set `_status: 'published'`                                        |
