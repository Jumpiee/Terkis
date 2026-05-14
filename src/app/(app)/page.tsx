import PartnersGrid from "@/components/PartnerGrid/page"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

// ─── DATA ────────────────────────────────────────────────────────────────────

const trustStats = [
  { value: "20+", unit: "Years", label: "In Thailand's Industrial Sector" },
  { value: "14", unit: "Brands", label: "International Brands Represented" },
  { value: "6", unit: "Countries", label: "DE · UK · IT · DK · USA · JP" },
  { value: "API · ATEX · ISO", unit: "", label: "Certified Products Available" },
]

const categories = [
  {
    index: "01",
    title: "Pump & System",
    description:
      "Centrifugal, gear, diaphragm, twin screw, metering, and submersible pumps for chemical, petrochemical, and wastewater applications.",
    specs: ["API 610", "ISO 5199", "API 676"],
    href: "/products?category=pumps",
    cta: "View Pumps",
  },
  {
    index: "02",
    title: "Valves",
    description:
      "Manual, automated, and specialty valves — ball, gate, globe, butterfly, double block & bleed, rising stem, and trunnion configurations.",
    specs: ["API 6D", "API 6A", "ANSI/ASME"],
    href: "/products?category=valves",
    cta: "View Valves",
  },
  {
    index: "03",
    title: "Tank & Safety Equipment",
    description:
      "Flame arresters, pressure/vacuum relief vents, emergency vents, gauge hatches, and nitrogen blanketing valves for storage tank protection.",
    specs: ["API 2000", "EN ISO 28300", "ATEX"],
    href: "/products?category=tank-equipment",
    cta: "View Tank Equipment",
  },
  {
    index: "04",
    title: "Other Field",
    description:
      "Loading arms, swivel joints, actuators, flowmeters, level sensors, expansion joints, and mechanical parts for wider plant utility needs.",
    specs: ["API", "ISO", "DIN"],
    href: "/products?category=other",
    cta: "View Other Products",
  },
]

const pillars = [
  {
    index: "A",
    title: "Globally Sourced, Locally Supported",
    body: "We represent 14 trusted brands from Germany, the UK, Italy, Denmark, the USA, and Japan — selected for quality, compliance, and suitability for Southeast Asian operating conditions.",
  },
  {
    index: "B",
    title: "Specification-Ready Products",
    body: "Every product we carry meets recognized international standards including API, ATEX, ISO, ANSI/ASME, and DIN. Our team can match the right product to your technical requirements.",
  },
  {
    index: "C",
    title: "Technical Support, Not Just Sales",
    body: "We work with your engineering team from specification through to commissioning — helping you select the correct configuration, check compatibility, and coordinate with manufacturers.",
  },
]

const industries = [
  {
    index: "IND-01",
    title: "Oil Refinery & Petrochemical",
    body: "Pumps and valves rated for hydrocarbon service, high temperature, and aggressive media.",
    standards: "API 610 · API 676 · API 6D",
  },
  {
    index: "IND-02",
    title: "Bulk Liquid Storage & Tank Farms",
    body: "Flame arresters, PV vents, emergency relief vents, and gauge hatches for atmospheric and low-pressure storage tanks.",
    standards: "API 2000 · EN ISO 28300",
  },
  {
    index: "IND-03",
    title: "Chemical Processing",
    body: "Corrosion-resistant pumps in PP, PVDF, and PE-UHMW for acid, alkali, and solvent handling.",
    standards: "ATEX Zone 1 & Zone 2",
  },
  {
    index: "IND-04",
    title: "Wastewater & Utility",
    body: "Submersible sewage pumps, self-priming pumps, and process mixers for municipal and industrial wastewater systems.",
    standards: "ISO 5199 · EN 12050",
  },
  {
    index: "IND-05",
    title: "Gas Turbine & Power Generation",
    body: "Fabric expansion joints for gas turbine exhaust systems, rated for inlet temperatures of 550–650°C.",
    standards: "ASME · DIN",
  },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <div className="bg-neutral-50 text-neutral-900">

      {/* ── BLOCK 2: HERO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-neutral-900">
        <div className="absolute inset-0">
          <Image
            src="/image/industrial-plant.webp"
            alt="Industrial plant"
            loading="eager"
            fill
            className="object-cover grayscale opacity-50"
          />
          <div className="absolute inset-0 bg-linear-to-r from-neutral-50 via-neutral-50/85 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-50/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl grid-cols-12 gap-8 px-6 py-16">
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-center">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-red-900" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-red-900">
                Authorized Distributor · Thailand
              </span>
            </div>

            <h1 className="mb-8 max-w-3xl text-4xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Pumps, Valves &amp; Process Equipment for{" "}
              <span className="text-red-900">Thailand's Oil &amp; Gas Industry</span>
            </h1>

            <p className="mb-10 max-w-xl text-base text-neutral-600 leading-relaxed">
              Terkis is Thailand's authorized distributor of premium industrial equipment from
              Germany, the UK, Italy, and the USA — sourced specifically for{" "}
              <strong className="text-neutral-800 font-semibold">
                petrochemical, refinery, and process plant applications.
              </strong>
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/products">
                <Button className="bg-red-900 text-white hover:bg-red-800 uppercase tracking-wider text-xs font-bold px-6 h-11 rounded-none">
                  Explore Our Products
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="border-neutral-900 uppercase tracking-wider text-xs font-bold px-6 h-11 rounded-none hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  Get a Quote →
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Corner label */}
        <div className="absolute bottom-6 right-6 z-10 hidden md:block">
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
            TKS_WEB_v3.0 · 2026
          </span>
        </div>
      </section>

      {/* ── BLOCK 3: TRUST BAR ───────────────────────────────────────────── */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-200">
            {trustStats.map((stat, i) => (
              <div key={i} className="px-8 py-8 flex flex-col gap-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold leading-none text-neutral-900 tracking-tight">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-sm font-bold uppercase text-red-900 tracking-wide">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 leading-relaxed">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCK 4: PRODUCT CATEGORIES ──────────────────────────────────── */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-red-900">
                Our Product Range
              </p>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight">
                The Full Spectrum of Process Equipment
              </h2>
              <p className="mt-3 max-w-xl text-sm text-neutral-600">
                From centrifugal pumps to flame arresters — we carry everything needed for upstream and downstream operations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px bg-neutral-900 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link href={cat.href} key={cat.index} className="group bg-neutral-50 hover:bg-white transition-colors duration-200 flex flex-col">
                <article className="p-8 flex flex-col flex-1">
                  <div className="mb-6 flex items-start justify-between">
                    <span className="font-mono text-xs text-neutral-400">{cat.index}</span>
                    <span className="translate-x-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-red-900 font-mono text-xs">
                      →
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-extrabold uppercase leading-tight">
                    {cat.title}
                  </h3>
                  <p className="mb-6 text-sm text-neutral-600 leading-relaxed flex-1">
                    {cat.description}
                  </p>

                  <div className="mt-auto">
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {cat.specs.map((s) => (
                        <span
                          key={s}
                          className="border border-neutral-300 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-neutral-500"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-red-900 border-b border-red-900 pb-0.5">
                      {cat.cta}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCK 5: WHY TERKIS ──────────────────────────────────────────── */}
      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-14">
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-red-900">
              Why Choose Us
            </p>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight">
              Why Engineers and Procurement Teams Choose Terkis
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-neutral-200 md:grid-cols-3">
            {pillars.map((p) => (
              <article key={p.index} className="group bg-white p-10 hover:bg-neutral-50 transition-colors">
                <div className="mb-8 flex items-center gap-4">
                  <span className="flex h-9 w-9 items-center justify-center border border-neutral-900 font-mono text-xs font-bold text-neutral-900">
                    {p.index}
                  </span>
                  <span className="h-px flex-1 bg-neutral-200 group-hover:bg-red-900 transition-colors duration-500" />
                </div>
                <h3 className="mb-4 text-lg font-extrabold uppercase leading-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCK 6: FEATURED BRANDS ──────────────────────────────────────── */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-red-900">
                Our Partners
              </p>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight">
                International Brands We Represent
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                Authorized distributor and agent for leading European and American manufacturers.
              </p>
            </div>
            <Link
              href="/brands"
              className="hidden md:flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-red-900 border-b border-red-900 pb-0.5 hover:gap-3 transition-all"
            >
              View All Brands →
            </Link>
          </div>

          <PartnersGrid />

          <p className="mt-6 font-mono text-[9px] uppercase tracking-widest text-neutral-400">
            All products are supplied through authorized distribution channels. Datasheets and compliance certificates available on request.
          </p>
        </div>
      </section>

      {/* ── BLOCK 7: INDUSTRIES ───────────────────────────────────────────── */}
      <section className="bg-neutral-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-red-400">
              Applications
            </p>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white">
              Built for Your Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-neutral-700 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <article
                key={ind.index}
                className={`group bg-neutral-900 p-8 hover:bg-neutral-800 transition-colors cursor-default ${
                  i === 4 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                    {ind.index}
                  </span>
                  <span className="h-px w-8 bg-neutral-700 group-hover:w-16 group-hover:bg-red-900 transition-all duration-300" />
                </div>
                <h3 className="mb-3 text-base font-extrabold uppercase leading-tight text-white">
                  {ind.title}
                </h3>
                <p className="mb-5 text-sm text-neutral-400 leading-relaxed">{ind.body}</p>
                <div className="border-l-2 border-red-900 pl-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-red-400">
                    {ind.standards}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCK 8: CONTACT / RFQ ────────────────────────────────────────── */}
      <section id="contact" className="border-t border-neutral-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left: copy */}
            <div className="flex flex-col justify-center">
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-red-900">
                Enquiries
              </p>
              <h2 className="mb-6 text-4xl font-extrabold uppercase leading-tight tracking-tight">
                Ready to Specify or Source?
              </h2>
              <p className="mb-8 text-sm text-neutral-600 leading-relaxed max-w-sm">
                Send us your requirements and we'll recommend the right product from our range —
                or connect you directly with the manufacturer's technical team. Datasheets,
                compliance certificates, and pricing are available on request.
              </p>

              <div className="space-y-4">
                <a href="tel:+66849035656" className="flex items-center gap-4 group">
                  <div className="flex h-10 w-10 items-center justify-center border border-neutral-300 group-hover:border-red-900 transition-colors">
                    <svg className="h-4 w-4 text-neutral-500 group-hover:text-red-900 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">Direct Line</span>
                    <span className="text-sm font-semibold text-neutral-800 group-hover:text-red-900 transition-colors">
                      +66 (0)84 903 5656
                    </span>
                  </div>
                </a>

                <a href="mailto:sales@terkis.co.th" className="flex items-center gap-4 group">
                  <div className="flex h-10 w-10 items-center justify-center border border-neutral-300 group-hover:border-red-900 transition-colors">
                    <svg className="h-4 w-4 text-neutral-500 group-hover:text-red-900 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">Email</span>
                    <span className="text-sm font-semibold text-neutral-800 group-hover:text-red-900 transition-colors">
                      sales@terkis.co.th
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div className="border border-neutral-200 bg-neutral-50 p-8">
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors"
                    placeholder="your@company.com"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors"
                    placeholder="+66 ..."
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-widest text-neutral-500">
                    Product Enquiry / Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors resize-none"
                    placeholder="Describe the equipment you need, application, operating conditions, or standards required..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-900 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-red-800 transition-colors"
                >
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
