---
name: terkis-frontend
description: Build frontend pages and components for the Terkis Co., Ltd. website. Enforces the established industrial spec-sheet aesthetic — sharp grid, uppercase sans, Geist Mono metadata labels, red-900 accent, zero border-radius. Use this for any new page, section, or component in the Terkis CMS frontend.
---

# Terkis Frontend Style Guide

This skill governs all frontend work for the Terkis website. Every page and component must feel like it belongs to the same design system — an **industrial spec-sheet**. Think technical documentation meets precision engineering catalogue.

---

## Aesthetic Direction

**Concept:** Industrial Spec-Sheet  
**Tone:** Utilitarian, precise, authoritative — like an API datasheet or engineering drawing, not a marketing brochure.  
**Audience:** Thai procurement engineers, EPC buyers, plant managers. They scan for facts, not feelings.  
**Unforgettable element:** The grid-gap-as-divider technique — sections are divided by 1px gaps in a dark background grid, making the layout feel like a technical table rather than a webpage.

---

## Typography

| Role | Class | Usage |
|---|---|---|
| Display / H1 | `text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.05]` | Hero headlines only |
| Section heading | `text-3xl font-extrabold uppercase tracking-tight` | Section H2s |
| Card heading | `text-lg font-extrabold uppercase leading-tight` | Card / article H3s |
| Industry heading | `text-base font-extrabold uppercase leading-tight` | Dense grid cards |
| Body text | `text-sm text-neutral-600 leading-relaxed` or `text-base text-neutral-600 leading-relaxed` | Descriptions, paragraphs |
| Eyebrow label | `font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900` | Section labels above headings |
| Metadata / index | `font-mono text-xs text-neutral-400` | Card indices (01, 02…), version tags |
| Form labels | `font-mono text-xs uppercase tracking-widest text-neutral-500` | Input labels |
| Fine print | `font-mono text-xs uppercase tracking-widest text-neutral-400` | Disclaimers, version stamps |

**Rules:**
- `text-xs` (12px) is the absolute minimum font size — never go below it.
- Mono font (`font-mono` = Geist Mono) is reserved for metadata, labels, indices, and fine print only. Never use it for body copy or headings.
- All headings are `uppercase`. No exceptions.
- Never use `font-normal` or `font-medium` for headings — always `font-extrabold`.

---

## Color Palette

```
Background (light sections):  neutral-50  (#fafaf9)
Background (white sections):  white
Background (dark sections):   neutral-900 (#171717)
Body text:                    neutral-900
Subdued text:                 neutral-600
Metadata text:                neutral-500 / neutral-400
Borders:                      neutral-200 (light) / neutral-700 (dark)
Dividers (grid gap):          neutral-900 (light pages) / neutral-700 (dark pages)

Accent — Primary:             red-900  (#7f1d1d)  — CTAs, underlines, active states
Accent — On dark:             red-400  (#f87171)  — eyebrow labels on dark backgrounds
Accent — Standards badge:     red-900 border-l-2  — left-border on standards tags
```

**Rules:**
- `red-900` is the only accent color. Never introduce blue, green, or purple.
- Dark sections use `bg-neutral-900` — never `bg-black` or `bg-gray-900`.
- Alternate sections: `bg-neutral-50` → `bg-white` → `bg-neutral-50` → `bg-neutral-900` (for contrast break).
- Never use gradients as decoration — only for hero image overlays (`bg-linear-to-r`, `bg-linear-to-t`).

---

## Spacing & Layout

- Max width: `max-w-7xl mx-auto px-6` on all sections.
- Section vertical padding: `py-16` (brands, trust bar) or `py-20` (main content sections).
- Never use `rounded-*` on cards, inputs, buttons, or containers. Everything is square (`rounded-none`).
- Section separation: `border-b border-neutral-200` (light) or implicit via alternating backgrounds.

---

## The Grid-Gap Divider Pattern

The signature layout technique. Use it for any multi-item grid (categories, pillars, industries):

```tsx
// Light background version
<div className="grid grid-cols-1 gap-px bg-neutral-900 md:grid-cols-2 lg:grid-cols-4">
  <article className="bg-neutral-50 hover:bg-white p-8">...</article>
</div>

// Dark background version
<div className="grid grid-cols-1 gap-px bg-neutral-700 md:grid-cols-2 lg:grid-cols-3">
  <article className="bg-neutral-900 hover:bg-neutral-800 p-8">...</article>
</div>
```

The `gap-px` + contrasting background color creates 1px dividers between cells — no border classes needed.

---

## Section Structure Pattern

Every section follows this header pattern:

```tsx
<section className="bg-white py-20">
  <div className="mx-auto max-w-7xl px-6">

    {/* Section header */}
    <div className="mb-12">
      <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
        Eyebrow Label
      </p>
      <h2 className="text-3xl font-extrabold uppercase tracking-tight">
        Section Heading
      </h2>
      {/* Optional subtitle */}
      <p className="mt-3 max-w-xl text-sm text-neutral-600">
        One supporting sentence.
      </p>
    </div>

    {/* Content */}
  </div>
</section>
```

---

## Buttons & CTAs

```tsx
// Primary — red fill
<Button className="bg-red-900 text-white hover:bg-red-800 uppercase tracking-wider text-xs font-bold px-6 h-11 rounded-none">
  Action Label
</Button>

// Secondary — outlined
<Button variant="outline" className="border-neutral-900 uppercase tracking-wider text-xs font-bold px-6 h-11 rounded-none hover:bg-neutral-900 hover:text-white transition-colors">
  Action Label →
</Button>

// Inline text CTA (underline style)
<span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-red-900 border-b border-red-900 pb-0.5">
  View Products
</span>
```

**Rules:**
- Button text is always `uppercase`.
- Always `rounded-none` — never default rounded corners.
- CTAs are instructions: "View Pumps", "Send Enquiry", "Get a Quote" — never "Learn More" or "Click Here".

---

## Card Pattern

```tsx
<article className="group bg-neutral-50 hover:bg-white transition-colors duration-200 p-8 flex flex-col">
  {/* Index + hover arrow */}
  <div className="mb-6 flex items-start justify-between">
    <span className="font-mono text-xs text-neutral-400">01</span>
    <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-red-900 font-mono text-xs">→</span>
  </div>

  <h3 className="mb-3 text-lg font-extrabold uppercase leading-tight">Card Title</h3>
  <p className="mb-6 text-sm text-neutral-600 leading-relaxed flex-1">Description text.</p>

  {/* Spec badges */}
  <div className="mb-4 flex flex-wrap gap-1.5">
    <span className="border border-neutral-300 px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-neutral-500">
      API 610
    </span>
  </div>

  {/* Inline CTA */}
  <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-red-900 border-b border-red-900 pb-0.5">
    View Products
  </span>
</article>
```

---

## Pillar / Feature Pattern

```tsx
<article className="group bg-white p-10 hover:bg-neutral-50 transition-colors">
  {/* Indexed label + animated line */}
  <div className="mb-8 flex items-center gap-4">
    <span className="flex h-9 w-9 items-center justify-center border border-neutral-900 font-mono text-xs font-bold">
      A
    </span>
    <span className="h-px flex-1 bg-neutral-200 group-hover:bg-red-900 transition-colors duration-500" />
  </div>
  <h3 className="mb-4 text-lg font-extrabold uppercase leading-tight">Title</h3>
  <p className="text-sm text-neutral-600 leading-relaxed">Body copy.</p>
</article>
```

---

## Dark Section (Industries / Applications)

```tsx
<section className="bg-neutral-900 py-20 text-white">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mb-14">
      <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-400">
        Eyebrow on dark
      </p>
      <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white">Heading</h2>
    </div>

    <div className="grid grid-cols-1 gap-px bg-neutral-700 md:grid-cols-2 lg:grid-cols-3">
      <article className="group bg-neutral-900 p-8 hover:bg-neutral-800 transition-colors">
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">IND-01</span>
          <span className="h-px w-8 bg-neutral-700 group-hover:w-16 group-hover:bg-red-900 transition-all duration-300" />
        </div>
        <h3 className="mb-3 text-base font-extrabold uppercase leading-tight text-white">Title</h3>
        <p className="mb-5 text-sm text-neutral-400 leading-relaxed">Body.</p>
        {/* Standards badge */}
        <div className="border-l-2 border-red-900 pl-3">
          <span className="font-mono text-xs uppercase tracking-widest text-red-400">API 610 · API 6D</span>
        </div>
      </article>
    </div>
  </div>
</section>
```

---

## Form Inputs

```tsx
<label className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-neutral-500">
  Field Label *
</label>
<input
  className="w-full border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors"
/>
```

**Rules:**
- No `rounded-*` on inputs.
- Focus state: `focus:border-neutral-900` — no ring, no blue glow.
- Labels: mono, xs, uppercase, widest tracking.

---

## Trust Bar Pattern

```tsx
<section className="border-b border-neutral-200 bg-white">
  <div className="mx-auto max-w-7xl">
    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-200">
      <div className="px-8 py-8 flex flex-col gap-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold leading-none text-neutral-900 tracking-tight">20+</span>
          <span className="text-sm font-bold uppercase text-red-900 tracking-wide">Years</span>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          In Thailand's Industrial Sector
        </span>
      </div>
    </div>
  </div>
</section>
```

---

## Writing Rules (Copy)

These apply to all page copy — not just the homepage:

1. **Lead with specifics.** "API 6D compliant ball valves" beats "high-quality valves."
2. **Engineer vocabulary.** Use: specification, compliant, rated for, authorized, service conditions. Avoid: amazing, seamless, innovative, trusted partner.
3. **Scan-friendly.** Max 2–3 sentences per block. Use spec tags (API, ATEX, ISO) as visual anchors.
4. **CTAs are instructions.** "View Pumps" → "Send Enquiry" → "Get a Quote." Never "Learn More."
5. **Standards in copy = trust signal.** Always include the relevant standard abbreviation in card and industry descriptions.

---

## What NOT to Do

- No `rounded-lg`, `rounded-md`, or any border radius on UI elements.
- No purple, blue, or green accents — only `red-900` / `red-400`.
- No `text-[9px]` or `text-[10px]` — `text-xs` is the minimum.
- No `Inter`, `Roboto`, or system fonts — use Space Grotesk (sans) + Geist Mono (mono).
- No gradient decorations — only functional overlays on the hero image.
- No "Learn More" or "Click Here" CTAs.
- No `font-normal` headings.
- No soft shadows (`shadow-lg`, `shadow-xl`) on cards — use border + background contrast instead.
