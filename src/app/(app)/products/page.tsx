"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search } from '@/components/Search'
import { ProductModal } from "@/components/ProductModal/page"
// ─── DATA ────────────────────────────────────────────────────────────────────
import { MobileCategoryDropdown } from "@/components/MobileCategoryDropdown/page"

export const categories = [
  { id: "all", label: "All Products" },
  { id: "mechanical", label: "Mechanical" },
  { id: "electrical", label: "Electrical" },
  { id: "instrument", label: "Instrument" },
]
 
export const categoryMeta: Record<string, { title: string; subtitle: string; description: string }> = {
  all: {
    title: "All",
    subtitle: "Products",
    description:
      "Every unit supplied with full traceability documentation, OEM certification, and compliance to ASME, API, DIN EN ISO, and API standards.",
  },
  mechanical: {
    title: "Mechanical",
    subtitle: "Equipment",
    description:
      "Magnet-drive and mechanical-seal centrifugal pumps, twin-screw pumps, rotary vane pumps, flame arresters, conservation vents, and loading arms from Klaus Union, Protectoseal, Victor Pumpen, 3PPrinz, and Dixon.",
  },
  electrical: {
    title: "Electrical",
    subtitle: "Actuators",
    description:
      "Pneumatic and electric actuators for valve automation from Aircon and Hitork, engineered for reliable on/off and modulating control in process environments.",
  },
  instrument: {
    title: "Instrument",
    subtitle: "& Monitoring",
    description:
      "Precision flow measurement and overfill protection solutions from Faure Herman and Dixon, covering mechanical, ultrasonic, and safety-critical monitoring applications.",
  },
}
 
// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
 
export const products = [
  // ── MECHANICAL: Klaus Union ──────────────────────────────────────────────
  {
    id: "KU-001",
    category: "mechanical",
    brand: "Klaus Union",
    name: "Centrifugal Pump – Magnet Drive (ISO 2858/15783)",
    shortDesc: "Sealless centrifugal pump with magnet drive for hazardous and leakage-free fluid transfer.",
    specs: {
      Standard: "DIN EN ISO 2858 / 15783",
      Drive: "Magnet Drive (Sealless)",
      Type: "Centrifugal",
      Application: "Hazardous / Toxic Fluids",
    },
    tags: ["Klaus Union", "Magnet Drive", "ISO 2858"],
    badge: null,
    image: "/media/KU-001.png",
    alt: "Klaus Union centrifugal pump with magnet drive ISO 2858",
  },
  {
    id: "KU-002",
    category: "mechanical",
    brand: "Klaus Union",
    name: "Centrifugal Pump – Magnet Drive (API 685)",
    shortDesc: "API 685-compliant sealless magnet-drive pump for refinery and petrochemical service.",
    specs: {
      Standard: "API 685",
      Drive: "Magnet Drive (Sealless)",
      Type: "Centrifugal",
      Application: "Refinery / Petrochemical",
    },
    tags: ["Klaus Union", "API 685", "Magnet Drive"],
    badge: null,
    image: "/media/KU-002.png",
    alt: "Klaus Union centrifugal pump magnet drive API 685",
  },
  {
    id: "KU-003",
    category: "mechanical",
    brand: "Klaus Union",
    name: "Multi-Stage Centrifugal Pump – Magnet Drive (ISO 15783/API 685)",
    shortDesc: "Multi-stage sealless centrifugal pump for high-head applications in hazardous service.",
    specs: {
      Standard: "DIN EN ISO 15783 / API 685",
      Drive: "Magnet Drive (Sealless)",
      Type: "Multi-Stage Centrifugal",
      Application: "High-Head Hazardous Service",
    },
    tags: ["Klaus Union", "Multi-Stage", "API 685"],
    badge: null,
    image: "/media/KU-003.png",
    alt: "Klaus Union multi-stage centrifugal pump magnet drive",
  },
  {
    id: "KU-004",
    category: "mechanical",
    brand: "Klaus Union",
    name: "Multi-Stage Side Channel Pump – Magnet Drive (ISO 15783)",
    shortDesc: "Sealless side channel pump for low-flow, high-head duties with volatile or gas-laden liquids.",
    specs: {
      Standard: "DIN EN ISO 15783",
      Drive: "Magnet Drive (Sealless)",
      Type: "Multi-Stage Side Channel",
      Application: "Low-Flow / High-Head / Gas-Laden",
    },
    tags: ["Klaus Union", "Side Channel", "ISO 15783"],
    badge: null,
    image: "/media/KU-004.png",
    alt: "Klaus Union multi-stage side channel pump magnet drive",
  },
  {
    id: "KU-005",
    category: "mechanical",
    brand: "Klaus Union",
    name: "Submerged Pump – Magnet Drive (ISO 2858/ISO 15783)",
    shortDesc: "Submerged sealless pump for tank-mounted or pit-mounted hazardous fluid extraction.",
    specs: {
      Standard: "DIN EN ISO 2858 / DIN EN ISO 15783",
      Drive: "Magnet Drive (Sealless)",
      Type: "Submerged Centrifugal",
      Application: "Tank / Pit Mounted",
    },
    tags: ["Klaus Union", "Submerged", "Sealless"],
    badge: null,
    image: "/media/KU-005.png",
    alt: "Klaus Union submerged pump magnet drive",
  },
  {
    id: "KU-006",
    category: "mechanical",
    brand: "Klaus Union",
    name: "Centrifugal Pump – Mechanical Seal (ISO 2858/5199)",
    shortDesc: "Mechanical-seal centrifugal pump for general chemical and process industry service.",
    specs: {
      Standard: "DIN EN ISO 2858 / 5199",
      Drive: "Mechanical Seal",
      Type: "Centrifugal",
      Application: "General Chemical / Process",
    },
    tags: ["Klaus Union", "Mechanical Seal", "ISO 5199"],
    badge: null,
    image: "/media/KU-006.png",
    alt: "Klaus Union centrifugal pump mechanical seal ISO 2858",
  },
  {
    id: "KU-007",
    category: "mechanical",
    brand: "Klaus Union",
    name: "Single Volute Twin Screw Pump – Magnet Drive (API 676)",
    shortDesc: "Sealless twin-screw pump for viscous, shear-sensitive, and two-phase fluid transfer.",
    specs: {
      Standard: "API 676",
      Drive: "Magnet Drive (Sealless)",
      Type: "Single Volute Twin Screw",
      Application: "Viscous / Two-Phase Fluids",
    },
    tags: ["Klaus Union", "Twin Screw", "API 676"],
    badge: null,
    image: "/media/KU-007.PNG",
    alt: "Klaus Union twin screw pump magnet drive API 676",
  },
 
  // ── MECHANICAL: Protectoseal ─────────────────────────────────────────────
  {
    id: "PS-001",
    category: "mechanical",
    brand: "Protectoseal",
    name: "Flame Arresters",
    shortDesc: "In-line and end-of-line flame arresters preventing ignition propagation in tank venting systems.",
    specs: {
      Type: "In-Line / End-of-Line",
      Application: "Tank Venting / Pipeline",
      Standard: "EN ISO 16852 / FM Approved",
    },
    tags: ["Protectoseal", "Flame Arrester", "Fire Safety"],
    badge: null,
    image: "/media/PS-001.png",
    alt: "Protectoseal flame arrester",
  },
  {
    id: "PS-002",
    category: "mechanical",
    brand: "Protectoseal",
    name: "Conservation Vents",
    shortDesc: "Pressure/vacuum relief vents protecting atmospheric storage tanks from over- and under-pressure.",
    specs: {
      Type: "Pressure / Vacuum Relief",
      Application: "Atmospheric Storage Tanks",
      Standard: "API 2000 / EN ISO 28300",
    },
    tags: ["Protectoseal", "Conservation Vent", "API 2000"],
    badge: null,
    image: "/media/PS-002.png",
    alt: "Protectoseal conservation vent",
  },
  {
    id: "PS-003",
    category: "mechanical",
    brand: "Protectoseal",
    name: "Emergency Pressure Relief Vents",
    shortDesc: "High-capacity emergency vents for rapid pressure relief during fire exposure or process upset.",
    specs: {
      Type: "Emergency Relief",
      Application: "Fire Exposure / Process Upset",
      Standard: "API 2000 / NFPA 30",
    },
    tags: ["Protectoseal", "Emergency Vent", "NFPA 30"],
    badge: null,
    image: "/media/PS-003.png",
    alt: "Protectoseal emergency pressure relief vent",
  },
 
  // ── MECHANICAL: Victor Pumpen ────────────────────────────────────────────
  {
    id: "VP-001",
    category: "mechanical",
    brand: "Victor Pumpen",
    name: "Self-Priming Pump",
    shortDesc: "Robust self-priming centrifugal pump for draining, loading, and transfer in demanding environments.",
    specs: {
      Type: "Self-Priming Centrifugal",
      Application: "Draining / Loading / Transfer",
      Feature: "Dry-Run Capable",
    },
    tags: ["Victor Pumpen", "Self-Priming", "Centrifugal"],
    badge: null,
    image: "/media/VP-001.png",
    alt: "Victor Pumpen self-priming pump",
  },
 
  // ── MECHANICAL: 3PPrinz ──────────────────────────────────────────────────
  {
    id: "3P-001",
    category: "mechanical",
    brand: "3PPrinz",
    name: "Rotary Vane Pumps",
    shortDesc: "Positive-displacement rotary vane pumps for metering and transfer of fuels, solvents, and lubricants.",
    specs: {
      Type: "Rotary Vane (Positive Displacement)",
      Application: "Fuels / Solvents / Lubricants",
      Feature: "Precision Metering",
    },
    tags: ["3PPrinz", "Rotary Vane", "Positive Displacement"],
    badge: null,
    image: "/media/3P-001.png",
    alt: "3PPrinz rotary vane pump",
  },
 
  // ── MECHANICAL: Dixon ────────────────────────────────────────────────────
  {
    id: "DX-001",
    category: "mechanical",
    brand: "Dixon",
    name: "Loading Arm",
    shortDesc: "Top and bottom loading arms for safe, spill-free transfer of petroleum products and chemicals.",
    specs: {
      Type: "Loading / Unloading Arm",
      Application: "Petroleum / Chemical Transfer",
      Standard: "API 1004",
    },
    tags: ["Dixon", "Loading Arm", "API 1004"],
    badge: null,
    image: "/media/DX-001.png",
    alt: "Dixon loading arm",
  },
 
  // ── ELECTRICAL ───────────────────────────────────────────────────────────
  {
    id: "EL-001",
    category: "electrical",
    brand: "Aircon",
    name: "Pneumatic Actuator",
    shortDesc: "Double-acting and spring-return pneumatic actuators for reliable automated valve control.",
    specs: {
      Type: "Double-Acting / Spring-Return",
      Application: "Automated Valve Control",
      Medium: "Instrument Air / Gas",
    },
    tags: ["Aircon", "Pneumatic", "Actuator"],
    badge: null,
    image: "/media/AIRCON.png",
    alt: "Aircon pneumatic actuator",
  },
  {
    id: "EL-002",
    category: "electrical",
    brand: "Hitork",
    name: "Electric Actuator",
    shortDesc: "Multi-turn and part-turn electric actuators for precise valve automation in process plants.",
    specs: {
      Type: "Multi-Turn / Part-Turn",
      Application: "Process Valve Automation",
      Control: "On/Off & Modulating",
    },
    tags: ["Hitork", "Electric", "Actuator"],
    badge: null,
    image: "/media/AIRCON.png",
    alt: "Hitork electric actuator",
  },
 
  // ── INSTRUMENT ───────────────────────────────────────────────────────────
  {
    id: "FH-001",
    category: "instrument",
    brand: "Faure Herman",
    name: "Flow Meter (Mechanical)",
    shortDesc: "High-accuracy positive-displacement and turbine flow meters for custody transfer and process measurement.",
    specs: {
      Type: "Positive Displacement / Turbine",
      Application: "Custody Transfer / Process",
      Accuracy: "±0.1%",
    },
    tags: ["Faure Herman", "Flow Meter", "Custody Transfer"],
    badge: null,
    image: "/media/AFH.png",
    alt: "Faure Herman mechanical flow meter",
  },
  {
    id: "FH-002",
    category: "instrument",
    brand: "Faure Herman",
    name: "Ultrasonic Flow Meter",
    shortDesc: "Non-intrusive clamp-on and inline ultrasonic flow meters for liquids and gases.",
    specs: {
      Type: "Clamp-On / Inline Ultrasonic",
      Application: "Liquids & Gases",
      Feature: "No Moving Parts",
    },
    tags: ["Faure Herman", "Ultrasonic", "Non-Intrusive"],
    badge: null,
    image: "/media/AFH.png",
    alt: "Faure Herman ultrasonic flow meter",
  },
  {
    id: "DX-002",
    category: "instrument",
    brand: "Dixon",
    name: "ADS Overfill Protection Rack Monitor",
    shortDesc: "Automatic Dependent Surveillance rack monitor for vehicle overfill prevention during tank loading.",
    specs: {
      Type: "Overfill Protection / Rack Monitor",
      Application: "Tanker Loading / Terminal",
      Standard: "API / OIML",
      Feature: "Ground Verification + Overfill Sensing",
    },
    tags: ["Dixon", "Overfill Protection", "ADS"],
    badge: null,
    image: "/media/DX-002.png",
    alt: "Dixon ADS overfill protection rack monitor",
  },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)

  useEffect(() => {
    if (categoryParam && categories.some(cat => cat.id === categoryParam)) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])

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
            categories={categories}
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

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProductsContent />
    </Suspense>
  )
}