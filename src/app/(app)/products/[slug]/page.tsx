import type { Media, Product } from "@/payload-types";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProductDetailUI } from "./ProductDetailUI";

type Args = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params;
  const product = await queryProductBySlug({ slug });

  if (!product) return notFound();

  const gallery = product.gallery?.filter((item) => typeof item.image === "object") || [];
  const metaImage = typeof product.meta?.image === "object" ? product.meta?.image : undefined;
  const canIndex = product._status === "published";
  const seoImage = metaImage || (gallery.length ? (gallery[0]?.image as Media) : undefined);

  return {
    description: product.meta?.description || "",
    openGraph: seoImage?.url
      ? {
          images: [
            {
              alt: seoImage?.alt,
              height: seoImage.height!,
              url: seoImage?.url,
              width: seoImage.width!,
            },
          ],
        }
      : null,
    robots: {
      follow: canIndex,
      googleBot: { follow: canIndex, index: canIndex },
      index: canIndex,
    },
    title: product.meta?.title || product.title,
  };
}

export default async function ProductPage({ params }: Args) {
  const { slug } = await params;
  const product = await queryProductBySlug({ slug });

  if (!product) return notFound();

  // ── Image ──────────────────────────────────────────────────────────────────
  const gallery =
    product.gallery
      ?.filter((item) => typeof item.image === "object")
      .map((item) => ({ ...item, image: item.image as Media })) || [];

  const firstImage = gallery[0]?.image ?? null;
  const metaImage = typeof product.meta?.image === "object" ? (product.meta.image as Media) : null;
  const displayImage = firstImage ?? metaImage;

  // ── Stock status ───────────────────────────────────────────────────────────
  const hasStock = product.enableVariants
    ? product?.variants?.docs?.some(
        (v) => typeof v === "object" && v.inventory && v.inventory > 0
      )
    : (product.inventory ?? 0) > 0;

  const status = hasStock ? "In Stock" : "Enquire";

  // ── Categories ─────────────────────────────────────────────────────────────
  const categoryLabel =
    product.categories
      ?.filter((c) => typeof c === "object")
      .map((c) => (c as { title: string }).title)
      .join(", ") || "";

  // ── Related products ───────────────────────────────────────────────────────
  const relatedProducts = (
    product.relatedProducts?.filter((r) => typeof r === "object") ?? []
  ).map((r) => {
    const rel = r as Product;
    const relMeta =
      typeof rel.meta?.image === "object" ? (rel.meta.image as Media) : null;
    const relGalleryFirst =
      rel.gallery
        ?.filter((item) => typeof item.image === "object")
        .map((item) => item.image as Media)[0] ?? null;

    return {
      id: rel.id,
      slug: rel.slug,
      title: rel.title,
      category:
        rel.categories
          ?.filter((c) => typeof c === "object")
          .map((c) => (c as { title: string }).title)
          .join(", ") || "",
      image: relGalleryFirst ?? relMeta,
    };
  });

  // ── JSON-LD ────────────────────────────────────────────────────────────────
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.meta?.description || "",
    image: displayImage?.url,
    offers: {
      "@type": "AggregateOffer",
      availability: hasStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      price: product.priceInUSD,
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailUI
        title={product.title}
        brand=""
        category={categoryLabel}
        status={status}
        productId={String(product.id)}
        description={product.meta?.description || ""}
        image={displayImage?.url || ""}
        imageAlt={displayImage?.alt || product.title}
        specs={[]}
        documents={[]}
        relatedProducts={relatedProducts}
      />
    </>
  );
}

const queryProductBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "products",
    depth: 3,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        { slug: { equals: slug } },
        ...(draft ? [] : [{ _status: { equals: "published" } }]),
      ],
    },
    populate: {
      variants: {
        title: true,
        priceInUSD: true,
        inventory: true,
        options: true,
      },
    },
  });

  return result.docs?.[0] || null;
};
