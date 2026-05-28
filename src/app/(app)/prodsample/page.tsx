"use client"

import { useState } from "react"
import Link from "next/link"

// ─── FAKE DATA (simulates what Payload would return) ──────────────────────────

const fakeProducts = [
  { id: "KU-001", name: "Centrifugal Pump – Magnet Drive", brand: "Klaus Union", category: "mechanical", tag: "ISO 2858", image: "/media/KU-001.png" },
  { id: "KU-007", name: "Twin Screw Pump – Magnet Drive", brand: "Klaus Union", category: "mechanical", tag: "API 676", image: "/media/KU-007.PNG" },
  { id: "PS-001", name: "Flame Arresters", brand: "Protectoseal", category: "mechanical", tag: "EN ISO 16852", image: "/media/PS-001.png" },
  { id: "EL-001", name: "Pneumatic Actuator", brand: "Aircon", category: "electrical", tag: "Double-Acting", image: "/media/AIRCON.png" },
  { id: "EL-002", name: "Electric Actuator", brand: "Hitork", category: "electrical", tag: "Multi-Turn", image: "/media/AIRCON.png" },
  { id: "FH-001", name: "Flow Meter (Mechanical)", brand: "Faure Herman", category: "instrument", tag: "±0.1%", image: "/media/AFH.png" },
  { id: "DX-002", name: "ADS Overfill Protection", brand: "Dixon", category: "instrument", tag: "API / OIML", image: "/media/DX-002.png" },
]

const categories = [
  { id: "all", label: "All Products" },
  { id: "mechanical", label: "Mechanical" },
  { id: "electrical", label: "Electrical" },
  { id: "instrument", label: "Instrument" },
]

// ─── VERSION A — Current (static, client-side filter) ─────────────────────────

function VersionA() {
  const [active, setActive] = useState("all")

  const filtered = active === "all" ? fakeProducts : fakeProducts.filter(p => p.category === active)

  return (
    <div className="bg-white text-neutral-900">
      {/* Tabs */}
      <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white">
        <div className="flex">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`border-b-2 px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                active === cat.id ? "border-red-900 text-red-900" : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-px bg-neutral-200 sm:grid-cols-3">
          {filtered.map(p => (
            <article key={p.id} className="flex flex-col bg-white p-5">
              <div className="mb-2 aspect-[3/2] bg-neutral-100 flex items-center justify-center">
                <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain p-3" />
              </div>
              <span className="font-mono text-xs text-neutral-400">{p.id}</span>
              <h3 className="text-xs font-extrabold uppercase leading-tight mt-1">{p.name}</h3>
              <span className="mt-2 font-mono text-xs uppercase tracking-widest text-neutral-500">{p.tag}</span>
              <button className="mt-3 bg-red-900 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-white hover:bg-red-800">
                View Specs
              </button>
            </article>
          ))}
        </div>
        <p className="mt-4 font-mono text-xs text-neutral-400 uppercase tracking-widest">
          Filter is client-side. Data is hardcoded. No URL change.
        </p>
      </div>
    </div>
  )
}

// ─── VERSION B — Shop soul (URL-driven, real Payload data feel) ───────────────

function VersionB() {
  const [active, setActive] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = fakeProducts
    .filter(p => active === "all" || p.category === active)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))

  // In the real version this would be: searchParams.get('category') from the URL
  // and payload.find({ where: { categories: { contains: category } } })

  return (
    <div className="bg-white text-neutral-900">
      {/* Search bar — like /shop */}
      <div className="border-b border-neutral-200 px-6 py-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="SEARCH PRODUCTS..."
          className="w-full border border-neutral-300 bg-neutral-50 px-4 py-2.5 font-mono text-xs uppercase tracking-widest placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
        />
      </div>

      <div className="flex">
        {/* Sidebar — like /shop */}
        <aside className="w-44 flex-none border-r border-neutral-200 p-5">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">Category</p>
          <ul className="flex flex-col gap-1">
            {categories.map(cat => (
              <li key={cat.id}>
                <button
                  onClick={() => setActive(cat.id)}
                  className={`w-full text-left font-mono text-xs uppercase tracking-widest py-1.5 transition-colors ${
                    active === cat.id ? "text-red-900 font-bold" : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {active === cat.id ? "→ " : ""}{cat.label}
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-6 mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">Sort by</p>
          <ul className="flex flex-col gap-1">
            {["Title A–Z", "Newest", "Brand"].map(s => (
              <li key={s}>
                <button className="w-full text-left font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 py-1.5">
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Grid */}
        <div className="flex-1 p-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
            {search ? ` for "${search}"` : ""}
          </p>
          <div className="grid grid-cols-2 gap-px bg-neutral-200 sm:grid-cols-3">
            {filtered.map(p => (
              <article key={p.id} className="flex flex-col bg-white p-5">
                <div className="mb-2 aspect-[3/2] bg-neutral-100 flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain p-3" />
                </div>
                <span className="font-mono text-xs text-neutral-400">{p.id}</span>
                <h3 className="text-xs font-extrabold uppercase leading-tight mt-1">{p.name}</h3>
                <span className="mt-1 font-mono text-xs text-neutral-500">{p.brand}</span>
                {/* In real version: Link href={`/products/${slug}`} */}
                <Link href="/products" className="mt-3 bg-neutral-900 py-1.5 text-center font-mono text-xs font-bold uppercase tracking-widest text-white hover:bg-neutral-700">
                  View Detail →
                </Link>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mt-6">No products found.</p>
          )}
          <p className="mt-4 font-mono text-xs text-neutral-400 uppercase tracking-widest">
            In real version: filter = URL param, data = payload.find(). Search works server-side.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── DEMO PAGE ────────────────────────────────────────────────────────────────

export default function ProdSamplePage() {
  const [view, setView] = useState<"a" | "b">("a")

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">

      {/* Header */}
      <div className="border-b border-neutral-200 bg-white px-6 py-5">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">Demo · /prodsample</p>
        <h1 className="mt-1 text-xl font-extrabold uppercase tracking-tight">Product Page Comparison</h1>
        <p className="mt-1 text-sm text-neutral-500">Toggle between the two approaches to see the difference.</p>

        <div className="mt-4 flex gap-px">
          <button
            onClick={() => setView("a")}
            className={`px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
              view === "a" ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
            }`}
          >
            A — Current (static)
          </button>
          <button
            onClick={() => setView("b")}
            className={`px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
              view === "b" ? "bg-red-900 text-white" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
            }`}
          >
            B — Shop Soul (Payload)
          </button>
        </div>

        <div className="mt-3 max-w-lg">
          {view === "a" ? (
            <p className="text-xs text-neutral-500 leading-relaxed">
              <span className="font-bold text-neutral-900">Version A:</span> Tab filter runs in browser only.
              Data is a hardcoded array in the file. No search. Clicking "View Specs" opens a modal.
              Adding a new product = editing the source code.
            </p>
          ) : (
            <p className="text-xs text-neutral-500 leading-relaxed">
              <span className="font-bold text-red-900">Version B:</span> Search bar + sidebar filter.
              In the real version, category and search come from the URL (<code className="bg-neutral-100 px-1">/products?category=mechanical&q=pump</code>),
              data comes from <code className="bg-neutral-100 px-1">payload.find()</code>. Adding a product = publish in admin. No code change needed.
            </p>
          )}
        </div>
      </div>

      {/* Demo */}
      <div className="mx-auto max-w-4xl border-x border-neutral-200 bg-white shadow-sm">
        {view === "a" ? <VersionA /> : <VersionB />}
      </div>

    </div>
  )
}
