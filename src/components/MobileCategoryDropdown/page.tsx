"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, X } from "lucide-react"

interface Category {
  id: string
  label: string
}

interface Props {
  activeCategory: string
  setActiveCategory: (id: string) => void
  categories: Category[]
}

export function MobileCategoryDropdown({ activeCategory, setActiveCategory, categories }: Props) {
  const [open, setOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const active = categories.find((c) => c.id === activeCategory)

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      {/* Trigger button — replaces the <select> */}
      <div className="md:hidden px-4 py-2">
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-between border border-neutral-200 bg-white px-3 py-2.5 shadow-sm focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-700" />
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-700">
              {active?.label || "Select Category"}
            </span>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-neutral-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-up panel */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white transition-transform duration-400 ease-in-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ borderRadius: "16px 16px 0 0" }}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-6 bg-red-700" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
              Filter by Category
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-500"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Category list */}
        <div className="px-4 py-3 pb-8">
          {categories.map((cat, i) => {
            const isActive = cat.id === activeCategory
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setOpen(false)
                }}
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                }}
                className={`
                  w-full flex items-center justify-between
                  px-4 py-3.5 mb-1 rounded-lg
                  text-xs font-bold uppercase tracking-[0.12em]
                  transition-all duration-300
                  ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                  ${isActive
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {isActive && <span className="h-1 w-4 bg-red-600 rounded-full" />}
                  {cat.label}
                </div>
                {isActive && (
                  <span className="text-[9px] font-bold text-red-500 tracking-widest">ACTIVE</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}