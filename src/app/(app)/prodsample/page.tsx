"use client";

import { useState } from "react";
import Link from "next/link";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Product {
  id: string;
  brand: string;
  name: string;
  category: string;
  status: "In Stock" | "Lead Time" | "Enquire";
  description: string;
  specs: Record<string, string>;
  tags: string[];
  image: string;
  alt: string;
  documents?: { label: string; size: string }[];
}

// ─── DEMO DATA ────────────────────────────────────────────────────────────────

const product: Product = {
  id: "M-001",
  brand: "Klaus Union",
  name: "Sealless Mag-Drive Pump",
  category: "Mechanical Seals & Pumps",
  status: "Enquire",
  description:
    "Magnetically coupled sealless pump eliminating fugitive emissions — engineered for hazardous, toxic, and ultra-pure process fluids where zero leakage is non-negotiable. Compliant with API 685 standards for heavy-duty industrial service.",
  specs: {
    Type: "Sealless / Mag-Drive",
    "Flow Rate": "Up to 900 m³/h",
    "Max Pressure": "25 bar",
    Temperature: "−100°C to +350°C",
    Material: "Alloy 20 / Hastelloy",
    Standard: "API 685",
  },
  tags: ["API 685", "Sealless", "Zero-Emission", "ATEX"],
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCIEFalUGxusGZnWk1jBKqqBdnZdjU4PfbLjH4wlZXjcouYvfwCU6_mMSVFtrhlMyFQX9kKl_WshJJNaa5Y1ZwCP4ywsU_E2XnMTFbCxtHb6BjfJI9lwUMX2YeS_LwhDNxEzNXyvNuifeAnFfiLfGhWBdTpk5yswR1xGukRi2MpODBzAF5meKVemm0a2-IuGczzyo_DRLRpiLngEiGbP8cayjMQn0H6HqjsJWwnfnL1J8Jsj0y0JWh5r_y0-uuIcIQeMCYgNH5_gjs",
  alt: "Klaus Union sealless mag-drive pump",
  documents: [
    { label: "Technical Datasheet", size: "PDF · 420 KB" },
    { label: "API 685 Compliance Certificate", size: "PDF · 188 KB" },
    { label: "Installation & Maintenance Manual", size: "PDF · 1.2 MB" },
  ],
};

const relatedProducts = [
  {
    id: "01",
    code: "P-001",
    name: "HydroForce CF-900",
    category: "Pumping Systems",
    tag: "API 610",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIEFalUGxusGZnWk1jBKqqBdnZdjU4PfbLjH4wlZXjcouYvfwCU6_mMSVFtrhlMyFQX9kKl_WshJJNaa5Y1ZwCP4ywsU_E2XnMTFbCxtHb6BjfJI9lwUMX2YeS_LwhDNxEzNXyvNuifeAnFfiLfGhWBdTpk5yswR1xGukRi2MpODBzAF5meKVemm0a2-IuGczzyo_DRLRpiLngEiGbP8cayjMQn0H6HqjsJWwnfnL1J8Jsj0y0JWh5r_y0-uuIcIQeMCYgNH5_gjs",
  },
  {
    id: "02",
    code: "P-002",
    name: "VacuDrive PD-450",
    category: "Pumping Systems",
    tag: "Metering",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIEFalUGxusGZnWk1jBKqqBdnZdjU4PfbLjH4wlZXjcouYvfwCU6_mMSVFtrhlMyFQX9kKl_WshJJNaa5Y1ZwCP4ywsU_E2XnMTFbCxtHb6BjfJI9lwUMX2YeS_LwhDNxEzNXyvNuifeAnFfiLfGhWBdTpk5yswR1xGukRi2MpODBzAF5meKVemm0a2-IuGczzyo_DRLRpiLngEiGbP8cayjMQn0H6HqjsJWwnfnL1J8Jsj0y0JWh5r_y0-uuIcIQeMCYgNH5_gjs",
  },
  {
    id: "03",
    code: "P-003",
    name: "CryoPump LT-200",
    category: "Pumping Systems",
    tag: "Cryogenic",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIEFalUGxusGZnWk1jBKqqBdnZdjU4PfbLjH4wlZXjcouYvfwCU6_mMSVFtrhlMyFQX9kKl_WshJJNaa5Y1ZwCP4ywsU_E2XnMTFbCxtHb6BjfJI9lwUMX2YeS_LwhDNxEzNXyvNuifeAnFfiLfGhWBdTpk5yswR1xGukRi2MpODBzAF5meKVemm0a2-IuGczzyo_DRLRpiLngEiGbP8cayjMQn0H6HqjsJWwnfnL1J8Jsj0y0JWh5r_y0-uuIcIQeMCYgNH5_gjs",
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const [enquired, setEnquired] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "documents">("specs");

  return (
    <div className="bg-neutral-50 text-neutral-900">
      {/* ── HERO HEADER ── */}
      <section className="bg-neutral-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-400">
                {product.brand} · {product.category}
              </p>
              <h1 className="max-w-3xl text-4xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                {product.name}
              </h1>
              <div className="mt-6 flex items-center gap-4">
                <span className="font-mono text-xs text-neutral-500">ID: {product.id}</span>
                <span className="h-px w-8 bg-neutral-700" />
                <div className="border-l-2 border-red-900 pl-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-400">
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN PRODUCT INFO ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-px bg-neutral-900 lg:grid-cols-2">
            {/* LEFT — Image */}
            <div className="bg-white p-8 lg:p-12">
              <div className="relative aspect-square overflow-hidden bg-neutral-50">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="h-full w-full object-cover transition-all duration-700"
                />
              </div>
            </div>

            {/* RIGHT — Details */}
            <div className="flex flex-col bg-white">
              {/* Technical Description */}
              <div className="p-8 md:p-10">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
                  Specification Overview
                </p>
                <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight">
                  Product Details
                </h2>
                <p className="mt-6 text-base leading-relaxed text-neutral-600">
                  {product.description}
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="grid grid-cols-2 gap-px bg-neutral-900 border-t border-neutral-900">
                {(["specs", "documents"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
                      activeTab === tab ? "bg-red-900 text-white" : "bg-white text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    {tab === "specs" ? "Technical Data" : "Documentation"}
                  </button>
                ))}
              </div>

              {/* Tab Content: Specs */}
              {activeTab === "specs" && (
                <div className="grid grid-cols-2 gap-px bg-neutral-200">
                  {Object.entries(product.specs).map(([label, value]) => (
                    <div key={label} className="bg-white p-6">
                      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-neutral-500">
                        {label}
                      </p>
                      <p className="text-sm font-extrabold uppercase tracking-tight text-neutral-900">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab Content: Documents */}
              {activeTab === "documents" && (
                <div className="flex flex-col gap-px bg-neutral-200">
                  {product.documents?.map((doc) => (
                    <button
                      key={doc.label}
                      className="group flex w-full items-center justify-between bg-white px-8 py-5 text-left transition-colors hover:bg-neutral-50"
                    >
                      <div>
                        <p className="text-sm font-extrabold uppercase leading-tight text-neutral-900">
                          {doc.label}
                        </p>
                        <p className="mt-1 font-mono text-xs text-neutral-400">{doc.size}</p>
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-900 border-b border-red-900 pb-0.5">
                        Download
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Action Area */}
              <div className="mt-auto grid grid-cols-1 gap-px bg-neutral-900 border-t border-neutral-900 md:grid-cols-2">
                <button className="h-14 bg-white px-6 text-xs font-bold uppercase tracking-widest text-neutral-900 transition-colors hover:bg-neutral-50">
                  Technical Support
                </button>
                <button
                  onClick={() => setEnquired(true)}
                  className="h-14 bg-red-900 px-6 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-800"
                >
                  {enquired ? "Enquiry Sent" : "Request Quote →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
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

          <div className="grid grid-cols-1 gap-px bg-neutral-900 md:grid-cols-3">
            {relatedProducts.map((rel) => (
              <article key={rel.id} className="group flex flex-col bg-white p-8 transition-colors hover:bg-neutral-50">
                <div className="mb-6 flex items-start justify-between">
                  <span className="font-mono text-xs text-neutral-400">{rel.id}</span>
                  <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-red-900 font-mono text-xs">
                    →
                  </span>
                </div>

                <div className="mb-6 aspect-[4/3] overflow-hidden bg-neutral-50">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="mb-3 text-lg font-extrabold uppercase leading-tight">{rel.name}</h3>
                <p className="mb-6 text-sm text-neutral-600 leading-relaxed flex-1">
                  High-performance {rel.category.toLowerCase()} rated for {rel.tag} service conditions.
                </p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  <span className="border border-neutral-300 px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-neutral-500">
                    {rel.tag}
                  </span>
                </div>

                <Link
                  href={`/products/${rel.code}`}
                  className="inline-block self-start font-mono text-xs font-bold uppercase tracking-[0.14em] text-red-900 border-b border-red-900 pb-0.5"
                >
                  View Specification
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGINEERING CTA ── */}
      <section className="bg-neutral-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-400">
              Expert Consultation
            </p>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white">
              Engineering Support
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <p className="text-base text-neutral-400 leading-relaxed">
              Our engineering team provides full application review, thermodynamic simulation, and custom sourcing from
              Tier-1 European and American manufacturers. We ensure every component meets your exact process
              requirements and international standards.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
              <button className="h-11 rounded-none border border-white px-6 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-neutral-900">
                Download Catalogue
              </button>
              <button className="h-11 rounded-none bg-red-900 px-6 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-800">
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
