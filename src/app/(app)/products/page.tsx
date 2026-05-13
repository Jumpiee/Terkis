"use client"

import { useState } from "react"
import { Search } from '@/components/Search'
// ─── DATA ────────────────────────────────────────────────────────────────────

const categories = [
  { id: "all", label: "All Products" },
  { id: "pumps", label: "Pumping Systems" },
  { id: "pressure", label: "Pressure Management" },
  { id: "sealing", label: "Industrial Sealing" },
  { id: "valves", label: "Flow Control" },
]

const products = [
  // PUMPS
  {
    id: "P-001",
    category: "pumps",
    name: "HydroForce CF-900",
    shortDesc: "Heavy-duty centrifugal pump for high-viscosity volatile fluids.",
    specs: {
      "Flow Rate": "900 m³/h",
      "Max Pressure": "25 bar",
      Temperature: "-40°C to +200°C",
      Standard: "API 610",
      Material: "Duplex SS",
    },
    tags: ["API 610", "Centrifugal", "ATEX"],
    badge: "Flagship",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIEFalUGxusGZnWk1jBKqqBdnZdjU4PfbLjH4wlZXjcouYvfwCU6_mMSVFtrhlMyFQX9kKl_WshJJNaa5Y1ZwCP4ywsU_E2XnMTFbCxtHb6BjfJI9lwUMX2YeS_LwhDNxEzNXyvNuifeAnFfiLfGhWBdTpk5yswR1xGukRi2MpODBzAF5meKVemm0a2-IuGczzyo_DRLRpiLngEiGbP8cayjMQn0H6HqjsJWwnfnL1J8Jsj0y0JWh5r_y0-uuIcIQeMCYgNH5_gjs",
    alt: "HydroForce CF-900 centrifugal pump",
  },
  {
    id: "P-002",
    category: "pumps",
    name: "VacuDrive PD-450",
    shortDesc: "Positive displacement pump for precision metering applications.",
    specs: {
      "Flow Rate": "450 L/min",
      "Max Pressure": "40 bar",
      Temperature: "-20°C to +150°C",
      Standard: "ISO 2858",
      Material: "316L SS",
    },
    tags: ["Metering", "ATEX", "Positive Displacement"],
    badge: null,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIEFalUGxusGZnWk1jBKqqBdnZdjU4PfbLjH4wlZXjcouYvfwCU6_mMSVFtrhlMyFQX9kKl_WshJJNaa5Y1ZwCP4ywsU_E2XnMTFbCxtHb6BjfJI9lwUMX2YeS_LwhDNxEzNXyvNuifeAnFfiLfGhWBdTpk5yswR1xGukRi2MpODBzAF5meKVemm0a2-IuGczzyo_DRLRpiLngEiGbP8cayjMQn0H6HqjsJWwnfnL1J8Jsj0y0JWh5r_y0-uuIcIQeMCYgNH5_gjs",
    alt: "VacuDrive PD-450 positive displacement pump",
  },
  {
    id: "P-003",
    category: "pumps",
    name: "CryoPump LT-200",
    shortDesc: "Vacuum & cryogenic pump for sub-zero process environments.",
    specs: {
      "Flow Rate": "200 m³/h",
      "Max Pressure": "10 bar",
      Temperature: "-196°C to +80°C",
      Standard: "ASME B73.1",
      Material: "Hastelloy C-276",
    },
    tags: ["Cryogenic", "Vacuum", "ASME"],
    badge: "New",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIEFalUGxusGZnWk1jBKqqBdnZdjU4PfbLjH4wlZXjcouYvfwCU6_mMSVFtrhlMyFQX9kKl_WshJJNaa5Y1ZwCP4ywsU_E2XnMTFbCxtHb6BjfJI9lwUMX2YeS_LwhDNxEzNXyvNuifeAnFfiLfGhWBdTpk5yswR1xGukRi2MpODBzAF5meKVemm0a2-IuGczzyo_DRLRpiLngEiGbP8cayjMQn0H6HqjsJWwnfnL1J8Jsj0y0JWh5r_y0-uuIcIQeMCYgNH5_gjs",
    alt: "CryoPump LT-200 cryogenic pump",
  },
  // PRESSURE
  {
    id: "PR-001",
    category: "pressure",
    name: "SafeGuard SRV-X1",
    shortDesc: "Spring-loaded safety relief valve for extreme-pressure systems.",
    specs: {
      "Set Pressure": "1–600 bar",
      Orifice: "D through T",
      Temperature: "-100°C to +500°C",
      Standard: "API 520/526",
      Material: "CF8M / Alloy 20",
    },
    tags: ["API 526", "Safety Critical", "Spring-Loaded"],
    badge: "Flagship",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKoz5gHndWXh5_3oy-EIPO-532FWLFESOSHBJb_lwVAN8QhdlBaE2gP-TdEgwEX9ld9U-GTLt-vQecDerBRtAUcpmZlp8u8aUisXQ-e9R1XcCutPz4yV49FiqWDUOGJsAOIugxdo78ol51ZSQPopXeECcDB-Grbf4LStLX0YAdDLdmayGpRjAAzQsniB_BMeFbtN842Mc1HuWWkt_qEp3tMYQZZJkl5BbnoAzq_SIOt9a9oUJggWxU7R77gw8ystaTXdvOH5h0aVY",
    alt: "SafeGuard SRV-X1 safety relief valve",
  },
  {
    id: "PR-002",
    category: "pressure",
    name: "BurstShield BD-300",
    shortDesc: "Graphite bursting disc for last-resort overpressure protection.",
    specs: {
      "Burst Pressure": "0.5–250 bar",
      Diameter: "25–600 mm",
      Temperature: "Up to +600°C",
      Standard: "ISO 6718",
      Material: "Graphite / Hastelloy",
    },
    tags: ["ISO 6718", "Bursting Disc", "Fail-Safe"],
    badge: null,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKoz5gHndWXh5_3oy-EIPO-532FWLFESOSHBJb_lwVAN8QhdlBaE2gP-TdEgwEX9ld9U-GTLt-vQecDerBRtAUcpmZlp8u8aUisXQ-e9R1XcCutPz4yV49FiqWDUOGJsAOIugxdo78ol51ZSQPopXeECcDB-Grbf4LStLX0YAdDLdmayGpRjAAzQsniB_BMeFbtN842Mc1HuWWkt_qEp3tMYQZZJkl5BbnoAzq_SIOt9a9oUJggWxU7R77gw8ystaTXdvOH5h0aVY",
    alt: "BurstShield BD-300 bursting disc",
  },
  // SEALING
  {
    id: "S-001",
    category: "sealing",
    name: "MechSeal MS-750",
    shortDesc: "Dual mechanical seal for aggressive chemical and hydrocarbon service.",
    specs: {
      Shaft: "20–150 mm",
      "Pressure": "Up to 25 bar",
      Temperature: "-40°C to +350°C",
      Standard: "API 682",
      Material: "SiC / Carbon",
    },
    tags: ["API 682", "Dual Seal", "Chemical Service"],
    badge: null,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDDb-MMmeocsZZEng578yPflwCU1dWY3SW_FSzWRd-9K0CwDEgiNkmgyTOc_2YYsGxVKXq-IY4EQ_2AHJt8wgfGF38znes6bl4ZI-CUD93yQgD7X6mpZ70gttzbMt3MoCP0rOHKVFmT6rnoyWyVXzYd0TXRlvuvEI_OVgbLlSRySU5fftQuCm-jKSxOjormhNMqkZsOTjgbjM1ZnIgqm3AcBHX--P5-QAMGJvm3HzUwk3vgj4Hw7EDMe6okQTKJJJiPMq4P81Lg_Q",
    alt: "MechSeal MS-750 dual mechanical seal",
  },
  {
    id: "S-002",
    category: "sealing",
    name: "FlexiGask SG-100",
    shortDesc: "Spiral-wound gaskets for high-temperature flange applications.",
    specs: {
      Diameter: "½\" to 24\"",
      Pressure: "Class 150–2500",
      Temperature: "-200°C to +1000°C",
      Standard: "ASME B16.20",
      Material: "SS 316 / Graphite",
    },
    tags: ["ASME B16.20", "Spiral-Wound", "High-Temp"],
    badge: "New",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDDb-MMmeocsZZEng578yPflwCU1dWY3SW_FSzWRd-9K0CwDEgiNkmgyTOc_2YYsGxVKXq-IY4EQ_2AHJt8wgfGF38znes6bl4ZI-CUD93yQgD7X6mpZ70gttzbMt3MoCP0rOHKVFmT6rnoyWyVXzYd0TXRlvuvEI_OVgbLlSRySU5fftQuCm-jKSxOjormhNMqkZsOTjgbjM1ZnIgqm3AcBHX--P5-QAMGJvm3HzUwk3vgj4Hw7EDMe6okQTKJJJiPMq4P81Lg_Q",
    alt: "FlexiGask SG-100 spiral wound gaskets",
  },
  // VALVES
  {
    id: "V-001",
    category: "valves",
    name: "TurboGate TG-800",
    shortDesc: "Full-bore gate valve for on/off isolation in crude & gas lines.",
    specs: {
      "Size": "2\" to 48\"",
      "Rating": "Class 150–2500",
      Temperature: "-29°C to +425°C",
      Standard: "API 600",
      Material: "WCB / CF8M",
    },
    tags: ["API 600", "Gate Valve", "Full Bore"],
    badge: null,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKoz5gHndWXh5_3oy-EIPO-532FWLFESOSHBJb_lwVAN8QhdlBaE2gP-TdEgwEX9ld9U-GTLt-vQecDerBRtAUcpmZlp8u8aUisXQ-e9R1XcCutPz4yV49FiqWDUOGJsAOIugxdo78ol51ZSQPopXeECcDB-Grbf4LStLX0YAdDLdmayGpRjAAzQsniB_BMeFbtN842Mc1HuWWkt_qEp3tMYQZZJkl5BbnoAzq_SIOt9a9oUJggWxU7R77gw8ystaTXdvOH5h0aVY",
    alt: "TurboGate TG-800 gate valve",
  },
  {
    id: "V-002",
    category: "valves",
    name: "PrecisionBall PB-360",
    shortDesc: "Trunnion-mounted ball valve for high-pressure pipeline control.",
    specs: {
      "Size": "2\" to 60\"",
      "Rating": "Class 300–1500",
      Temperature: "-46°C to +230°C",
      Standard: "API 6D",
      Material: "SS 316 / Inconel",
    },
    tags: ["API 6D", "Ball Valve", "Trunnion"],
    badge: "Flagship",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKoz5gHndWXh5_3oy-EIPO-532FWLFESOSHBJb_lwVAN8QhdlBaE2gP-TdEgwEX9ld9U-GTLt-vQecDerBRtAUcpmZlp8u8aUisXQ-e9R1XcCutPz4yV49FiqWDUOGJsAOIugxdo78ol51ZSQPopXeECcDB-Grbf4LStLX0YAdDLdmayGpRjAAzQsniB_BMeFbtN842Mc1HuWWkt_qEp3tMYQZZJkl5BbnoAzq_SIOt9a9oUJggWxU7R77gw8ystaTXdvOH5h0aVY",
    alt: "PrecisionBall PB-360 trunnion ball valve",
  },
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div className="bg-neutral-50 text-neutral-900">

      {/* ── PAGE HEADER ── */}
      <section className="border-b border-neutral-900 bg-neutral-900 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-0.5 w-12 bg-red-700" />
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-red-500">
              Product Catalogue — REV. 2025.04
            </span>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h1 className="mb-4 text-4xl font-extrabold uppercase leading-tight text-white md:text-5xl">
                Component <span className="text-red-600">Index</span>
              </h1>
              <p className="max-w-lg text-neutral-400">
                Every unit supplied with full traceability documentation, OEM certification,
                and compliance to ASME, API, and ISO standards.
              </p>
            </div>
            <div className="flex items-end justify-start gap-10 md:justify-end">
              <div>
                <p className="text-3xl font-bold text-red-600">9</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Products Listed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-600">4</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Categories</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-600">100%</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">OEM Certified</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── FILTER TABS ── */}
      <section className="sticky top-0 z-20 border-b border-neutral-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl">
          <div className="flex overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 border-b-2 px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                  activeCategory === cat.id
                    ? "border-red-900 bg-white text-red-900"
                    : "border-transparent text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
            <div className="ml-auto hidden items-center px-6 text-xs font-mono text-neutral-400 md:flex">
              {filtered.length} UNIT{filtered.length !== 1 ? "S" : ""} DISPLAYED
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="py-12">
        <Search className="mb-8" />
      </section>
      {/* ── PRODUCT GRID ── */}
      <section className="py-0">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-px bg-neutral-300 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <article
                key={product.id}
                className="group relative flex flex-col bg-white hover:bg-neutral-50"
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute right-0 top-0 z-10">
                    <span
                      className={`block px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white ${
                        product.badge === "New" ? "bg-red-900" : "bg-neutral-900"
                      }`}
                    >
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="h-52 overflow-hidden border-b border-neutral-200 bg-neutral-100">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="h-full w-full object-contain p-6 grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      {product.id}
                    </span>
                    <div className="flex gap-1">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="bg-neutral-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-extrabold uppercase leading-tight">{product.name}</h3>
                  <p className="mb-6 text-sm text-neutral-600">{product.shortDesc}</p>

                  {/* Key specs strip */}
                  <div className="mb-6 border-t border-neutral-200 pt-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {Object.entries(product.specs)
                        .slice(0, 4)
                        .map(([k, v]) => (
                          <div key={k}>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">{k}</p>
                            <p className="text-xs font-semibold text-neutral-800">{v}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 border border-neutral-900 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] hover:bg-neutral-900 hover:text-white transition-colors"
                    >
                      Full Specs
                    </button>
                    <button className="flex-1 bg-red-900 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white hover:bg-red-800 transition-colors">
                      Request Quote
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="border-t border-neutral-900 bg-neutral-900 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-red-500">
                Engineering Support
              </p>
              <h2 className="text-3xl font-extrabold uppercase text-white">
                Can't find what you need?
              </h2>
              <p className="mt-3 text-neutral-400">
                Our technical team provides component matching, thermodynamic simulation review,
                and custom sourcing from Tier-1 European and American manufacturers.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <button className="border border-white px-8 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-white hover:text-neutral-900 transition-colors">
                Download Catalogue
              </button>
              <button className="bg-red-900 px-8 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-red-800 transition-colors">
                Contact Engineering Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT MODAL ── */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between border-b border-neutral-900 bg-neutral-900 p-6">
              <div>
                <p className="mb-1 font-mono text-xs text-neutral-400">{selectedProduct.id}</p>
                <h2 className="text-2xl font-extrabold uppercase text-white">{selectedProduct.name}</h2>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="ml-4 mt-1 text-neutral-400 hover:text-white text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Modal image */}
            <div className="h-56 bg-neutral-100">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.alt}
                className="h-full w-full object-contain p-8"
              />
            </div>

            {/* Modal body */}
            <div className="p-6">
              <p className="mb-6 text-neutral-700">{selectedProduct.shortDesc}</p>

              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-red-900">
                Full Technical Specifications
              </h3>
              <div className="mb-6 border border-neutral-200">
                {Object.entries(selectedProduct.specs).map(([k, v], i) => (
                  <div
                    key={k}
                    className={`flex justify-between px-4 py-3 text-sm ${
                      i % 2 === 0 ? "bg-neutral-50" : "bg-white"
                    }`}
                  >
                    <span className="font-semibold uppercase tracking-wide text-neutral-500 text-xs">{k}</span>
                    <span className="font-bold text-neutral-900">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {selectedProduct.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-red-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-red-900 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-red-800">
                  Request a Quote
                </button>
                <button className="flex-1 border border-neutral-900 py-3.5 text-xs font-bold uppercase tracking-[0.12em] hover:bg-neutral-100">
                  Download Datasheet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}