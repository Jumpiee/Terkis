---
name: add-layout-block
description: Step-by-step playbook for adding a new reusable layout block to the Terkis CMS product page. Covers Payload config, type generation, React component, and RenderBlocks registration — in the exact order required to avoid type errors.
---

# Adding a Layout Block to Terkis CMS

This playbook tells you exactly how to create a new Payload block that editors can add to the **product page layout** field from the admin panel, and that renders correctly on the frontend.

Always use both **payload** and **terkis-frontend** skills alongside this one.

---

## What a Layout Block Is

Products have a `layout` field (a Payload `blocks` field) in the **Content** tab. Editors pick from a list of block types and fill in structured data. The frontend renders them via `RenderBlocks`.

```
Admin: Product → Content tab → Layout → Add Block → [Your Block]
Frontend: product/[slug]/page.tsx → <RenderBlocks blocks={product.layout} />
```

---

## File Map

| File | Purpose |
|---|---|
| `src/blocks/<BlockName>/config.ts` | Payload block definition (fields, slug, interfaceName) |
| `src/blocks/<BlockName>/Component.tsx` | React component that renders the block |
| `src/blocks/RenderBlocks.tsx` | Central registry — maps blockType slug → component |
| `src/collections/Products/index.ts` | Adds the block config to the `layout` blocks array |
| `src/payload-types.ts` | Auto-generated — never edit manually |

---

## Step-by-Step

### 1. Create the Payload block config

```ts
// src/blocks/<BlockName>/config.ts
import type { Block } from 'payload'

export const MyBlock: Block = {
  slug: 'myBlock',               // must be camelCase, unique across all blocks
  interfaceName: 'MyBlock',      // becomes the TypeScript interface name in payload-types.ts
  labels: {
    singular: 'My Block',
    plural: 'My Blocks',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    // array field example:
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    // media example:
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
```

**Rules:**
- `slug` is what gets stored in the DB as `blockType` — keep it camelCase
- `interfaceName` becomes the exported TS interface — use PascalCase
- Never use `minRows`/`maxRows` on the block itself, only on `array` fields inside it

---

### 2. Register the block in the Products collection

```ts
// src/collections/Products/index.ts
import { MyBlock } from '@/blocks/MyBlock/config'   // add this import

// inside the layout field:
blocks: [CallToAction, Content, MediaBlock, StatsBlock, TechnicalPillars, MyBlock],
```

---

### 3. Generate types

Run this after every schema change — never skip it:

```bash
pnpm generate:types
```

Then verify your interface exists:

```bash
grep -A 10 "^export interface MyBlock" src/payload-types.ts
```

---

### 4. Create the React component

**Always import the type from `@/payload-types` — never inline it.**

```tsx
// src/blocks/<BlockName>/Component.tsx
import type { MyBlock, Media } from '@/payload-types'
import React from 'react'

export const MyBlockComponent: React.FC<MyBlock> = ({ title, description, items, image }) => {
  // media fields come back as `number | Media` — narrow before use
  const media = typeof image === 'object' ? (image as Media) : null

  return (
    <section className="bg-white py-24">
      {/* follow terkis-frontend skill for styling */}
    </section>
  )
}
```

**Media field narrowing** — Payload returns relationships as either an ID (`number`) or a populated object (`Media`). Always check:

```ts
const media = typeof image === 'object' ? (image as Media) : null
// then use media?.url, media?.alt etc.
```

---

### 5. Register the component in RenderBlocks

`RenderBlocks.tsx` has two things to update:

**a) Add the component import:**
```ts
import { MyBlockComponent } from '@/blocks/MyBlock/Component'
```

**b) Add the type import** — alias it to avoid name collision with the component import:
```ts
import type {
  // ...existing...
  MyBlock,            // if no collision
  MyBlock as MyBlockType,  // if the component export shares the same name
} from '../payload-types'
```

**c) Add to the `LayoutBlock` union:**
```ts
type LayoutBlock =
  | ArchiveBlockType
  | BannerBlockType
  // ...existing...
  | MyBlock           // add here
```

**d) Add to `blockComponents` map** — key must match the block's `slug`:
```ts
const blockComponents = {
  // ...existing...
  myBlock: MyBlockComponent,   // key = slug from config.ts
}
```

---

### 6. Type-check

```bash
pnpm tsc --noEmit 2>&1 | grep "MyBlock\|RenderBlocks"
```

Expect no output. If errors appear:
- Missing type in `LayoutBlock` union → add it
- Name collision → alias the type import with `as MyBlockType`
- `image` type error → narrow with `typeof image === 'object'`

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Block `slug` | camelCase | `technicalPillars` |
| Block `interfaceName` | PascalCase | `TechnicalPillarsBlock` |
| Config export | PascalCase | `TechnicalPillars` |
| Component export | PascalCase + `Component` suffix | `TechnicalPillarsBlockComponent` |
| `blockComponents` key | exact same as `slug` | `technicalPillars` |
| Directory name | PascalCase | `src/blocks/TechnicalPillars/` |

---

## Existing Blocks (for reference)

| Block | Slug | Fields |
|---|---|---|
| CallToAction | `cta` | richText, links |
| Content | `content` | columns (size, richText, link) |
| MediaBlock | `mediaBlock` | media (upload) |
| StatsBlock | `statsBlock` | stats[4] (title, unit, label) |
| TechnicalPillars | `technicalPillars` | eyebrow, heading, description, items[], image |
| Banner | `banner` | style, content |
| Carousel | `carousel` | populateBy, categories, limit, selectedDocs |
| ThreeItemGrid | `threeItemGrid` | products[3] |

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Editing `payload-types.ts` manually | Never — run `pnpm generate:types` instead |
| `blockComponents` key doesn't match `slug` | They must be identical |
| Using inline types instead of generated ones | Always import from `@/payload-types` |
| Media field used without narrowing | `typeof image === 'object' ? image : null` |
| Skipping type generation before writing the component | Generate first, then write component |
| Name collision between component import and type import | Alias the type: `import type { Foo as FooType }` |
