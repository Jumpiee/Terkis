"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import type { Media, Product } from "@/payload-types";
import { Gallery } from "@/components/product/Gallery";
import { RichText } from "@/components/RichText";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface SpecEntry {
  label: string;
  value: string;
}

interface DocumentEntry {
  label: string;
  url: string;
}

interface RelatedProductCard {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: Media | null;
}

interface Props {
  title: string;
  brand: string;
  category: string;
  status: string;
  productId: string;
  description: Product["description"];
  gallery: NonNullable<Product["gallery"]>;
  specs: SpecEntry[];
  documents: DocumentEntry[];
  relatedProducts: RelatedProductCard[];
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
  const [enquired, setEnquired] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "documents">("specs");

  const statusColor =
    status === "In Stock"
      ? "text-green-400"
      : status === "Lead Time"
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <div className="bg-neutral-50 text-neutral-900">

      {/* ── MAIN PRODUCT INFO ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-px bg-neutral-900 lg:grid-cols-2">
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
            <div className="flex flex-col bg-white">
              {/* Technical Description */}
              <div className="p-8 md:p-10">
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-400">
                {brand && `${brand} · `}{category}
              </p>
              <h1 className="max-w-3xl text-4xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                {title}
              </h1>
                <div className="mt-6 text-base leading-relaxed text-neutral-600">
                  {description ? (
                    <RichText data={description} enableGutter={false} />
                  ) : (
                    "No description available."
                  )}
                </div>
              </div>

              {/* Tab Switcher */}
              {(specs.length > 0 || documents.length > 0) && (
                <>
                  <div className="grid grid-cols-2 gap-px border-t border-neutral-900 bg-neutral-900">
                    {(["specs", "documents"] as const).map((tab) => {
                      const hasContent = tab === "specs" ? specs.length > 0 : documents.length > 0;
                      if (!hasContent) return null;
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
                            activeTab === tab
                              ? "bg-red-900 text-white"
                              : "bg-white text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                          }`}
                        >
                          {tab === "specs" ? "Technical Data" : "Documentation"}
                        </button>
                      );
                    })}
                  </div>

                  {/* Tab Content: Specs */}
                  {activeTab === "specs" && specs.length > 0 && (
                    <div className="grid grid-cols-2 gap-px bg-neutral-200">
                      {specs.map(({ label, value }) => (
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
                  {activeTab === "documents" && documents.length > 0 && (
                    <div className="flex flex-col gap-px bg-neutral-200">
                      {documents.map((doc) => (
                        <a
                          key={doc.label}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex w-full items-center justify-between bg-white px-8 py-5 text-left transition-colors hover:bg-neutral-50"
                        >
                          <p className="text-sm font-extrabold uppercase leading-tight text-neutral-900">
                            {doc.label}
                          </p>
                          <span className="border-b border-red-900 pb-0.5 font-mono text-xs font-bold uppercase tracking-widest text-red-900">
                            Download
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Action Area */}
              <div className="mt-auto grid grid-cols-1 gap-px border-t border-neutral-900 bg-neutral-900 md:grid-cols-2">
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

            <div className="grid grid-cols-1 gap-px bg-neutral-900 md:grid-cols-3">
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
                    <div className="mb-6 flex aspect-4/3 items-center justify-center overflow-hidden bg-neutral-50">
                      <img
                        src={rel.image.url}
                        alt={rel.image.alt || rel.title}
                        className="max-h-full max-w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="mb-6 flex aspect-4/3 items-center justify-center bg-neutral-100">
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                        No Image
                      </span>
                    </div>
                  )}

                  <h3 className="mb-3 text-lg font-extrabold uppercase leading-tight">{rel.title}</h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-600">{rel.category}</p>

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
            <p className="text-base leading-relaxed text-neutral-400">
              Our engineering team provides full application review, thermodynamic simulation, and custom
              sourcing from Tier-1 European and American manufacturers. We ensure every component meets
              your exact process requirements and international standards.
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
