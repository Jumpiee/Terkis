"use client"

import { useState } from "react"
import { Search } from '@/components/Search'
import { ProductModal } from "@/components/ProductModal/page"
// ─── DATA ────────────────────────────────────────────────────────────────────
import { MobileCategoryDropdown } from "@/components/MobileCategoryDropdown/page"
const categories = [
  { id: "all", label: "All Products" },
  { id: "pumps", label: "Pumping Systems" },
  { id: "pressure", label: "Pressure Management" },
  { id: "sealing", label: "Industrial Sealing" },
  { id: "valves", label: "Flow Control" },
]

const categoryMeta: Record<string, { title: string; subtitle: string; description: string }> = {
  all: {
    title: "All",
    subtitle: "Product",
    description:
      "Every unit supplied with full traceability documentation, OEM certification, and compliance to ASME, API, and ISO standards.",
  },
  pumps: {
    title: "Pumping",
    subtitle: "Systems",
    description:
      "Centrifugal, positive displacement, and cryogenic pump solutions engineered for high-viscosity, volatile, and sub-zero process environments.",
  },
  pressure: {
    title: "Pressure",
    subtitle: "Management",
    description:
      "Spring-loaded relief valves and graphite bursting discs providing last-resort overpressure protection to API 520/526 and ISO 6718 standards.",
  },
  sealing: {
    title: "Industrial",
    subtitle: "Sealing",
    description:
      "Dual mechanical seals and spiral-wound gaskets rated for aggressive chemical, hydrocarbon, and high-temperature flange applications.",
  },
  valves: {
    title: "Flow",
    subtitle: "Control",
    description:
      "Full-bore gate valves and trunnion-mounted ball valves for on/off isolation and high-pressure pipeline control to API 600 and API 6D.",
  },
}
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
    badge: null,
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
    badge: null,
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
    badge: null,
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
    badge: null,
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
    badge: null,
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
    <div className="bg-white text-neutral-900">

      {/* SEARCH BAR */}
      <section className="py-12">
        <Search className="mb-0" />
      </section>

      {/* ── FILTER TABS ── */}
        <section className="sticky top-0 z-20 border-b border-neutral-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl">

          {/* Mobile: dropdown */}
          <MobileCategoryDropdown
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Desktop: tab bar */}
          <div className="hidden md:flex overflow-x-auto items-center justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 border-b-2 px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                  activeCategory === cat.id
                    ? "text-terkis-red bg-white text-terkis-red"
                    : "border-transparent text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ── PAGE HEADER ── */}
      {(() => {
        const meta = categoryMeta[activeCategory]
        return (
          <section className="border-b border-neutral-900 bg-neutral-900 px-6 py-16">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h1
                    key={activeCategory}
                    className="mb-4 text-4xl font-extrabold uppercase leading-tight text-white md:text-5xl animate-fade-in"
                  >
                    {meta.title} <span className="text-terkis-red">{meta.subtitle}</span>
                  </h1>
                  <p
                    key={activeCategory + "-desc"}
                    className="max-w-lg text-neutral-400 animate-fade-in"
                  >
                    {meta.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )
      })()}
            
      {/* ── PRODUCT GRID ── */}
      <section className="py-12">
  <div className="mx-auto max-w-7xl px-1">
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
      {filtered.map((product) => (
        <article
          key={product.id}
          className="group relative flex flex-col bg-white hover:bg-neutral-50 transition-colors border border-neutral-300"
        >
          {/* Badge */}
          {product.badge && (
            <span className={`absolute right-0 top-0 z-10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white ${
              product.badge === "New" ? "bg-red-900" : "bg-neutral-900"
            }`}>
              {product.badge}
            </span>
          )}

          {/* 1:1 Image */}
          <div className="aspect-[3/2] overflow-hidden bg-neutral-100">
            <img
              src={product.image}
              alt={product.alt}
              className="h-full w-full object-cover p-[0%] transition-all duration-500 group-hover:grayscale-0"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col border-t border-neutral-200 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                {product.id}
              </span>
              {product.tags[0] && (
                <span className="bg-neutral-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-neutral-500">
                  {product.tags[0]}
                </span>
              )}
            </div>

            <h3 className="mb-1.5 text-sm font-bold uppercase leading-tight tracking-wide">
              {product.name}
            </h3>
            <p className="mb-4 text-[11px] leading-relaxed text-neutral-500">
              {product.shortDesc}
            </p>

            <div className="mt-auto flex gap-1.5">
              <button
                onClick={() => setSelectedProduct(product)}
                className="flex-1 border border-neutral-900 py-2 text-[9px] font-bold uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-colors"
              >
                Specs
              </button>
              <button className="flex-1 bg-red-900 py-2 text-[9px] font-bold uppercase tracking-widest text-white hover:bg-red-800 transition-colors">
                Quote
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
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}