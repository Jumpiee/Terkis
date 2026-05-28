"use client"

import { Gallery } from "@/components/product/Gallery"
import { RichText } from "@/components/RichText"
import { Button } from "@/components/ui/button"
import type { Media, Product } from "@/payload-types"
import Link from "next/link"
import { Suspense } from "react"

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface SpecEntry {
  label: string
  value: string
}

interface DocumentEntry {
  label: string
  url: string
}

interface RelatedProductCard {
  id: number
  slug: string
  title: string
  category: string
  image: Media | null
}

interface Props {
  title: string
  brand: string
  category: string
  status: string
  productId: string
  description: Product["description"]
  gallery: NonNullable<Product["gallery"]>
  specs: SpecEntry[]
  documents: DocumentEntry[]
  relatedProducts: RelatedProductCard[]
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function ProductDetailUI({
  title,
  brand,
  category,
  status,
  productId,
  description,
  gallery,
  specs,
  documents,
  relatedProducts,
}: Props) {

  return (
    <div className="bg-neutral-50 text-neutral-900">

      {/* ── MAIN PRODUCT INFO ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-px bg-neutral-200 lg:grid-cols-2">

            {/* LEFT — Gallery */}
            <div className="bg-white p-8 lg:p-12">
              {gallery.length > 0 ? (
                <Suspense fallback={<div className="aspect-square w-full bg-neutral-100" />}>
                  <Gallery gallery={gallery} />
                </Suspense>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-neutral-100">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                    No Image
                  </span>
                </div>
              )}
            </div>

            {/* RIGHT — Details */}
            <div className="flex flex-col justify-center bg-white">

              {/* Header */}
              <div className="p-8 lg:p-12">
                {/* Brand / Category row */}
                {category && (
                  <p className="mb-6 font-mono text-sm font-bold uppercase tracking-[0.2em] text-red-900">
                    {category}
                  </p>
                )}

                {/* Title */}
                <h1 className="text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-4xl lg:text-5xl text-neural-900">
                  {title}
                </h1>

                {/* Description */}
                {brand && (
                  <p className="mb-6 font-mono text-sm font-bold uppercase tracking-[0.2em] text-red-900">
                    {brand}
                  </p>
                )}

                {/* Description */}
                {description && (
                  <div className="mt-5 text-[13px] leading-relaxed text-neutral-500">
                    <RichText data={description} enableGutter={false} />
                  </div>
                )}

                <Button asChild size="lg" className="mt-8 w-full font-mono tracking-[0.18em]">
                  <Link href="/contact">Request Quote →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      {relatedProducts.length > 0 && (
        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
                Related Equipment
              </p>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight">
                Complementary Solutions
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-px bg-neutral-200 md:grid-cols-3">
              {relatedProducts.map((rel, i) => (
                <article
                  key={rel.id}
                  className="group flex flex-col bg-white p-8 transition-colors hover:bg-neutral-50"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <span className="font-mono text-xs text-neutral-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="translate-x-0 font-mono text-xs text-red-900 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </div>

                  {rel.image?.url ? (
                    <div className="mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden bg-neutral-100">
                      <img
                        src={rel.image.url}
                        alt={rel.image.alt || rel.title}
                        className="max-h-full max-w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="mb-6 flex aspect-[4/3] items-center justify-center bg-neutral-100">
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                        No Image
                      </span>
                    </div>
                  )}

                  <h3 className="mb-3 text-lg font-extrabold uppercase leading-tight">{rel.title}</h3>
                  <p className="mb-6 flex-1 text-sm text-neutral-600 leading-relaxed">{rel.category}</p>

                  <Link
                    href={`/products/${rel.slug}`}
                    className="inline-block self-start border-b border-red-900 pb-0.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-red-900"
                  >
                    View Specification
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-neutral-900 py-20 text-white">
      </section>

    </div>
  )
}
