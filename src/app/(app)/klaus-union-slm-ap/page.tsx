"use client";

import Link from "next/link";
import { useState } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Product {
  id: string;
  brand: string;
  name: string;
  model: string;
  category: string;
  status: "In Stock" | "Lead Time" | "Enquire";
  description: string;
  longDescription: string;
  specs: Record<string, string>;
  anatomy: { title: string; body: string }[];
  applications: { title: string; body: string; code: string }[];
  documents: { label: string; size: string }[];
}

// ─── PRODUCT DATA ─────────────────────────────────────────────────────────────

const product: Product = {
  id: "KU-SLM-AP-2026",
  brand: "Klaus Union",
  name: "Sealless Centrifugal Pump with Magnet Drive",
  model: "SLM AP Series",
  category: "Pumping Systems / API 685",
  status: "Enquire",
  description:
    "The industry standard for zero-emission fluid handling in high-stakes refinery and petrochemical environments.",
  longDescription:
    "The Klaus Union SLM AP series represents the pinnacle of sealless pumping technology. Engineered strictly to API 685 (OH2) standards, these pumps eliminate the single most common point of failure in industrial processes: the mechanical seal. By utilizing a high-performance magnetic coupling, the SLM AP ensures absolute containment of hazardous, toxic, and ultra-pure fluids, even under extreme pressure and temperature conditions.",
  specs: {
    Standard: "API 685 (2nd Edition)",
    Design: "OH2 (Centerline Mounted)",
    "Flow Rate": "Up to 3,500 m³/h",
    "Max. Head": "Up to 220 m",
    "Temperature Range": "-200 °C to +450 °C",
    "Max. Pressure": "PN 400 (Custom available)",
    "Drive System": "Magnetic Coupling (Sm2Co17 / AlNiCo)",
    "Compliance": "TA-Luft / ATEX / ISO 2858",
  },
  anatomy: [
    {
      title: "Magnet Drive System",
      body: "Utilizes high-performance Samarium-Cobalt or AlNiCo magnets to transmit torque through a hermetically sealed containment shell, eliminating the need for shaft seals.",
    },
    {
      title: "Containment Shell",
      body: "Available in Hastelloy C, Titanium, or non-metallic materials to minimize eddy current losses and provide a secondary safety barrier.",
    },
  ],
  applications: [
    {
      code: "IND-01",
      title: "Refinery & Petrochemical",
      body: "Handling of hydrocarbons, aromatics, and highly flammable fluids where any leakage poses a catastrophic risk.",
    },
    {
      code: "IND-02",
      title: "Chemical Processing",
      body: "Management of aggressive acids, bases, and toxic reagents that require 100% containment and materials like Alloy 20.",
    },
    {
      code: "IND-03",
      title: "Offshore & Marine",
      body: "Compact, sealless design ideal for restricted space and harsh environments requiring minimal manual maintenance intervention.",
    },
  ],
  documents: [
    { label: "SLM AP Technical Brochure", size: "PDF · 2.8 MB" },
    { label: "API 685 Compliance Matrix", size: "PDF · 1.1 MB" },
    { label: "Magnetic Drive Engineering Guide", size: "PDF · 4.5 MB" },
    { label: "Maintenance & Sizing Handbook", size: "PDF · 3.2 MB" },
  ],
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function KlausUnionFullPresentation() {
  const [enquired, setEnquired] = useState(false);

  return (
    <div className="bg-neutral-50 text-neutral-900">
      {/* ── SECTION 01: HERO ── */}
      <section className="bg-neutral-900 py-32 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1">
              <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-400">
                {product.brand} // {product.category}
              </p>
              <h1 className="text-4xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                Engineering <span className="text-red-900">Zero</span> Leakage
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-neutral-400 leading-relaxed">
                {product.description} Engineered for the most aggressive service conditions in the global energy sector.
              </p>
              <div className="mt-12 flex flex-wrap gap-4">
                <button className="h-12 bg-red-900 px-8 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-800">
                  Request Specification →
                </button>
                <button className="h-12 border border-neutral-700 px-8 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800">
                  Download Catalog
                </button>
              </div>
            </div>
            <div className="hidden lg:block lg:flex-1">
              <div className="relative z-10 mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl grid-cols-12 gap-8 px-6 py-16">
                <div className="absolute -top-4 -left-4 border border-red-900/30 bg-neutral-900 p-2 font-mono text-[10px] text-red-400">
                  REF: {product.id}
                </div>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIEFalUGxusGZnWk1jBKqqBdnZdjU4PfbLjH4wlZXjcouYvfwCU6_mMSVFtrhlMyFQX9kKl_WshJJNaa5Y1ZwCP4ywsU_E2XnMTFbCxtHb6BjfJI9lwUMX2YeS_LwhDNxEzNXyvNuifeAnFfiLfGhWBdTpk5yswR1xGukRi2MpODBzAF5meKVemm0a2-IuGczzyo_DRLRpiLngEiGbP8cayjMQn0H6HqjsJWwnfnL1J8Jsj0y0JWh5r_y0-uuIcIQeMCYgNH5_gjs"
                  alt={product.name}
                  className="w-full grayscale brightness-75 transition-all duration-700 hover:grayscale-0 hover:brightness-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 02: TRUST BAR ── */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-200">
            {[
              { label: "Standard", val: "API 685", sub: "2nd Edition Compliance" },
              { label: "Service", val: "450°C", sub: "Max Operating Temp" },
              { label: "Rating", val: "PN 400", sub: "High Pressure Capability" },
              { label: "Guarantee", val: "ZERO", sub: "Fugitive Emissions" },
            ].map((stat, idx) => (
              <div key={idx} className="px-8 py-10 flex flex-col gap-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold leading-none text-neutral-900 tracking-tight">{stat.val}</span>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 03: THE SEALLESS ADVANTAGE (PILLARS) ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="mb-12">
                <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
                  Technical Pillars
                </p>
                <h2 className="text-4xl font-extrabold uppercase tracking-tight">
                  Anatomy of a Sealless Pump
                </h2>
                <p className="mt-6 text-base text-neutral-600 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {/* Anatomy Grid (Smaller, moved under longDescription) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200">
                {product.anatomy.map((item, idx) => (
                  <article key={idx} className="group bg-white p-8 transition-colors hover:bg-neutral-50">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="flex h-8 w-8 items-center justify-center border border-neutral-900 font-mono text-xs font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="h-px flex-1 bg-neutral-200 group-hover:bg-red-900 transition-colors duration-500" />
                    </div>
                    <h3 className="mb-3 text-lg font-extrabold uppercase leading-tight">{item.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* Image section on the right side */}
            <div className="relative aspect-square lg:aspect-auto lg:self-stretch bg-neutral-200 border border-neutral-200 overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIEFalUGxusGZnWk1jBKqqBdnZdjU4PfbLjH4wlZXjcouYvfwCU6_mMSVFtrhlMyFQX9kKl_WshJJNaa5Y1ZwCP4ywsU_E2XnMTFbCxtHb6BjfJI9lwUMX2YeS_LwhDNxEzNXyvNuifeAnFfiLfGhWBdTpk5yswR1xGukRi2MpODBzAF5meKVemm0a2-IuGczzyo_DRLRpiLngEiGbP8cayjMQn0H6HqjsJWwnfnL1J8Jsj0y0JWh5r_y0-uuIcIQeMCYgNH5_gjs"
                alt="Technical illustration of Klaus Union SLM AP"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-red-900/5 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 04: PERFORMANCE MATRIX (GRID-GAP) ── */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
              Data Sheet
            </p>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight">
              Operational Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-neutral-900 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(product.specs).map(([label, value], idx) => (
              <div key={idx} className="bg-white p-10 hover:bg-neutral-50 transition-colors">
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
                  {label}
                </p>
                <p className="text-base font-extrabold uppercase tracking-tight text-neutral-900">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 05: APPLICATIONS (DARK SECTION) ── */}
      <section className="bg-neutral-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-400">
              Service Conditions
            </p>
            <h2 className="text-4xl font-extrabold uppercase tracking-tight text-white">
              Industrial Applications
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-neutral-700 md:grid-cols-3">
            {product.applications.map((app, idx) => (
              <article key={idx} className="group bg-neutral-900 p-12 hover:bg-neutral-800 transition-colors">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">{app.code}</span>
                  <span className="h-px w-8 bg-neutral-700 group-hover:w-16 group-hover:bg-red-900 transition-all duration-300" />
                </div>
                <h3 className="mb-4 text-lg font-extrabold uppercase leading-tight text-white">{app.title}</h3>
                <p className="mb-8 text-sm text-neutral-400 leading-relaxed">{app.body}</p>
                <div className="border-l-2 border-red-900 pl-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-red-400">
                    API 685 Certified
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 06: TECHNICAL FACT SHEET ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
              NOV Centrifugal Pump Line
            </p>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight">
              Technical Fact Sheet
            </h2>
          </div>

          <div className="border border-neutral-200">
            {[
              { param: "Design Standards", spec: "DIN EN ISO 2858, DIN EN ISO 5199" },
              { param: "Max Flow Rate", spec: "3,500 m³/h" },
              { param: "Max Delivery Head", spec: "220 m L.C." },
              { param: "Operating Temp", spec: "-120°C to +550°C" },
              { param: "Pressure Rating", spec: "Max PN 400 (5800 psi) depending on casing material" },
              { param: "Flange Standard", spec: "EN 1092-1 or ASME B16.5" },
              { param: "Body Materials", spec: "Cast Steel, Stainless Steel (316, Duplex), Special Alloys" },
              { param: "Shaft Materials", spec: "High-tensile Carbon Steel, AISI 316, Duplex" },
              { param: "Sealing System", spec: "Single or Double Mechanical Seals, Cartridge Type" },
            ].map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-[1fr_2fr] divide-x divide-neutral-200 ${idx !== 0 ? "border-t border-neutral-200" : ""} group hover:bg-neutral-50 transition-colors`}
              >
                <div className="flex items-center gap-4 px-8 py-5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400 w-5 shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-700">
                    {row.param}
                  </span>
                </div>
                <div className="flex items-center px-8 py-5">
                  <span className="text-sm font-semibold text-neutral-900">{row.spec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 07: HOMA SUBMERSIBLE COMPARISON TABLE ── */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
              HOMA Submersible Sewage Pumps
            </p>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight">
              Technical Fact Sheet
            </h2>
          </div>

          <div className="border border-neutral-200 overflow-x-auto">
            {/* Header Row */}
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] divide-x divide-neutral-200 bg-neutral-900">
              <div className="px-6 py-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
                  Specification
                </span>
              </div>
              {[
                { code: "VAR-01", label: "Single Channel", sub: "Cast Iron" },
                { code: "VAR-02", label: "V(X) Vortex", sub: "Series" },
                { code: "VAR-03", label: "CMX(S)", sub: "Stainless Steel" },
              ].map((col, i) => (
                <div key={i} className="px-6 py-4 flex flex-col gap-0.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                    {col.code}
                  </span>
                  <span className="text-sm font-extrabold uppercase tracking-tight text-white leading-tight">
                    {col.label}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">{col.sub}</span>
                </div>
              ))}
            </div>

            {/* Data Rows */}
            {[
              {
                param: "Discharge Size",
                vals: ["DN 80 / DN 100 / DN 150", "DN 80 / DN 100", "DN 80 / DN 100 / DN 150"],
              },
              {
                param: "Max Flow Rate",
                vals: ["72.0 to 390.0 m³/h", "54.0 to 228.0 m³/h", "68.2 to 384.1 m³/h"],
              },
              {
                param: "Max Head",
                vals: ["4.8 to 42.2 m", "7.0 to 53.8 m", "2.0 to 42.1 m"],
              },
              {
                param: "Spherical Clearance",
                vals: ["80 to 100 mm", "80 to 100 mm", "80 to 100 mm"],
              },
              {
                param: "Motor Power (P1)",
                vals: ["1.7 to 43.0 kW", "1.5 to 30.0 kW", "1.7 to 43.0 kW"],
              },
              {
                param: "Motor Power (P2)",
                vals: ["Up to 25.4 kW", "1.3 to 25.4 kW", "Up to 25.4 kW"],
              },
              {
                param: "Nominal Speed",
                vals: ["2900 / 1450 / 960 rpm", "2900 / 1450 / 960 rpm", "2900 / 1450 / 960 rpm"],
              },
              {
                param: "Body Material",
                vals: ["Cast Iron GG25 (GJL-250)", "Cast Iron GG25 (GJL-250)", "Stainless Steel 316 (1.4408)"],
              },
              {
                param: "Impeller Material",
                vals: ["Cast Iron GG25", "Cast Iron GG25", "Stainless Steel 316 (1.4408)"],
              },
            ].map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1.4fr_1fr_1fr_1fr] divide-x divide-neutral-200 border-t border-neutral-200 group hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-4 px-6 py-5 bg-white group-hover:bg-neutral-50 transition-colors">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400 shrink-0 w-5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-700">
                    {row.param}
                  </span>
                </div>
                {row.vals.map((val, vi) => (
                  <div key={vi} className="flex items-center px-6 py-5">
                    <span className="text-sm font-semibold text-neutral-900">{val}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 09: DOCUMENTATION (SPEC-LIST) ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
                Support Materials
              </p>
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">
                Technical Downloads
              </h2>
              <p className="mt-8 text-base text-neutral-600 leading-relaxed">
                Access full engineering documentation for the SLM AP series. Our datasheets provide exhaustive performance curves, material cross-references, and dimensional drawings for system integration.
              </p>
              <div className="mt-12 flex flex-col gap-px bg-neutral-200 border border-neutral-200">
                {product.documents.map((doc, idx) => (
                  <button key={idx} className="group flex items-center justify-between bg-white px-8 py-6 transition-colors hover:bg-neutral-50">
                    <div className="text-left">
                      <p className="text-sm font-extrabold uppercase tracking-tight">{doc.label}</p>
                      <p className="mt-1 font-mono text-xs text-neutral-400">{doc.size}</p>
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-900 border-b border-red-900 pb-0.5">
                      Download
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center bg-neutral-900 p-12 text-white">
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-400">
                Direct Engineering Support
              </p>
              <h3 className="text-3xl font-extrabold uppercase tracking-tight">
                Request a Custom Sizing Report
              </h3>
              <p className="mt-6 text-sm text-neutral-400 leading-relaxed">
                Our application engineers provide comprehensive pump sizing, NPSH calculations, and material selection reports based on your specific process conditions.
              </p>
              <div className="mt-10 flex flex-col gap-4">
                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-neutral-500">
                    Process Medium *
                  </label>
                  <input className="w-full border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm text-white focus:border-red-900 focus:outline-none" placeholder="e.g. Sulfuric Acid 98%" />
                </div>
                <button
                  onClick={() => setEnquired(true)}
                  className="mt-4 h-14 bg-red-900 text-xs font-bold uppercase tracking-widest text-white hover:bg-red-800"
                >
                  {enquired ? "Enquiry Registered" : "Submit Request →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 08: FOOTER CTA ── */}
      <section className="bg-neutral-50 border-t border-neutral-200 py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-red-900">
            Ready to secure your process?
          </h2>
          <p className="mt-6 text-neutral-600">
            Contact our Thailand-based engineering team for authorized Klaus Union sales and service support.
          </p>
          <div className="mt-10 flex justify-center gap-6">
            <Link href="/contact" className="h-12 bg-neutral-900 px-10 flex items-center text-xs font-bold uppercase tracking-widest text-white hover:bg-black">
              Contact Us
            </Link>
            <Link href="/products" className="h-12 border border-neutral-900 px-10 flex items-center text-xs font-bold uppercase tracking-widest text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
