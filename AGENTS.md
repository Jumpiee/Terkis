# Terkis CMS — Agent Guide

This file tells AI agents how to work on this project correctly.
Read it fully before making any changes.

---

## Project Overview

**Terkis CMS** is a Next.js + Payload CMS application for Terkis Co., Ltd. — a Thai industrial equipment distributor. It serves as both the content management backend and the customer-facing frontend.

- **Framework:** Next.js 15 (App Router)
- **CMS:** Payload CMS 3.x (Next.js native)
- **Styling:** Tailwind CSS — industrial spec-sheet aesthetic
- **Package manager:** `pnpm`
- **Language:** TypeScript (strict)

---

## Skills

Skills are detailed playbooks for specific tasks. Always read the relevant skill before starting work.

| Skill | Path | When to use |
|---|---|---|
| `payload` | `.agents/skills/payload/SKILL.md` | Any Payload collection, field, hook, or query work |
| `terkis-frontend` | `.agents/skills/terkis-frontend/SKILL.md` | Any frontend component or page — enforces the design system |
| `add-layout-block` | `.agents/skills/add-layout-block/SKILL.md` | Adding a new block to the product page layout |

---

## Key Conventions

### TypeScript
- **Never edit `src/payload-types.ts` manually** — it is auto-generated
- After any schema change run: `pnpm generate:types`
- Always verify with: `pnpm tsc --noEmit`

### Payload blocks
- Every block lives in `src/blocks/<BlockName>/`
- Two files per block: `config.ts` (Payload definition) + `Component.tsx` (React render)
- All blocks must be registered in `src/blocks/RenderBlocks.tsx`
- Product layout blocks must also be added to `src/collections/Products/index.ts`
- Follow the exact 6-step order in `.agents/skills/add-layout-block/SKILL.md`

### Frontend styling
- Design system: industrial spec-sheet — sharp grid, uppercase sans, Geist Mono labels, `red-900` accent, zero border-radius
- Never use `rounded-*`, gradients as decoration, or any accent color other than `red-900` / `red-400`
- Always follow `.agents/skills/terkis-frontend/SKILL.md` for components

### Git
- Work on feature branches, not `main`
- One concern per commit — keep layout block additions as separate commits

---

## Project Structure

```
src/
├── app/
│   ├── (app)/               # Frontend pages (Next.js App Router)
│   │   ├── page.tsx         # Homepage
│   │   ├── products/[slug]/ # Product detail page
│   │   └── product/         # Product listing
│   └── (payload)/           # Payload admin panel
├── blocks/                  # Layout blocks (config + component per folder)
│   ├── RenderBlocks.tsx     # Central block registry
│   ├── CallToAction/
│   ├── Content/
│   ├── MediaBlock/
│   ├── StatsBlock/
│   ├── TechnicalPillars/
│   └── ...
├── collections/
│   └── Products/index.ts    # Product collection with layout field
├── components/              # Shared UI components
└── payload-types.ts         # Auto-generated — do not edit
```

---

## Common Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm generate:types   # Regenerate Payload TypeScript types (run after schema changes)
pnpm tsc --noEmit     # Type-check without emitting
pnpm lint             # ESLint
```

---

## What NOT to Do

- Do not edit `src/payload-types.ts`
- Do not use `rounded-*` in UI components
- Do not introduce accent colors other than `red-900` / `red-400`
- Do not add blocks to `RenderBlocks.tsx` without also adding them to the collection's `blocks` array
- Do not write component types inline — always import from `@/payload-types`
- Do not commit directly to `main`
