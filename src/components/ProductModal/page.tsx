"use client"

import { X } from "lucide-react"

type Product = {
  id: string
  name: string
  shortDesc: string
  image: string
  alt: string
  specs: Record<string, string>
  tags: string[]
  badge: string | null
  category: string
}

interface Props {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: Props) {
  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-900 bg-neutral-900 p-6">
          <div>
            <p className="mb-1 font-mono text-xs text-neutral-400">{product.id}</p>
            <h2 className="text-2xl font-extrabold uppercase text-white">{product.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="ml-4 mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700 text-neutral-300 hover:bg-neutral-600 hover:text-white transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Image */}
        <div className="h-56 bg-neutral-100">
          <img
            src={product.image}
            alt={product.alt}
            className="h-full w-full object-contain p-8"
          />
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="mb-6 text-neutral-700">{product.shortDesc}</p>

          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-red-900">
            Full Technical Specifications
          </h3>
          <div className="mb-6 border border-neutral-200">
            {Object.entries(product.specs).map(([k, v], i) => (
              <div
                key={k}
                className={`flex justify-between px-4 py-3 text-sm ${
                  i % 2 === 0 ? "bg-neutral-50" : "bg-white"
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{k}</span>
                <span className="font-bold text-neutral-900">{v}</span>
              </div>
            ))}
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="border border-red-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-900"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-red-900 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-red-800 transition-colors">
              Request a Quote
            </button>
            <button className="flex-1 border border-neutral-900 py-3.5 text-xs font-bold uppercase tracking-[0.12em] hover:bg-neutral-100 transition-colors">
              Download Datasheet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}