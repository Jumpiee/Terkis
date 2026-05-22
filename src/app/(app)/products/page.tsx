import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media } from '@/payload-types'
import Link from 'next/link'
import React from 'react'

type SearchParams = { [key: string]: string | string[] | undefined }

type Props = {
  searchParams: Promise<SearchParams>
}

export const metadata = {
  title: 'Products',
  description: 'Industrial equipment and engineered solutions from Terkis Co., Ltd.',
}

export default async function ProductsPage({ searchParams }: Props) {
  const { q: searchValue, sort, category } = await searchParams

  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    draft: false,
    overrideAccess: false,
    depth: 1,
    select: {
      title: true,
      slug: true,
      gallery: true,
      categories: true,
      priceInUSD: true,
    },
    ...(sort ? { sort: sort as string } : { sort: 'title' }),
    where: {
      and: [
        { _status: { equals: 'published' } },
        ...(searchValue
          ? [{
              or: [
                { title: { like: searchValue } },
                { description: { like: searchValue } },
              ],
            }]
          : []),
        ...(category
          ? [{ categories: { contains: category } }]
          : []),
      ],
    },
  })

  const docs = products.docs
  const resultsText = docs.length === 1 ? 'result' : 'results'

  return (
    <div>
      {/* Result count */}
      <p className="mb-6 font-mono text-xs uppercase tracking-widest text-neutral-400">
        {docs.length === 0
          ? 'No products found'
          : `${docs.length} ${resultsText}${searchValue ? ` for "${searchValue}"` : ''}`}
      </p>

      {/* Grid */}
      {docs.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {docs.map((product) => {
            const image = product.gallery?.[0]?.image
            const imageObj = image && typeof image !== 'string' ? (image as Media) : null
            const categoryLabel = Array.isArray(product.categories)
              ? product.categories
                  .filter((c) => typeof c === 'object')
                  .map((c: any) => c.title)
                  .join(' · ')
              : ''

            return (
              <article
                key={product.id}
                className="group relative flex flex-col border border-neutral-300 bg-white transition-colors hover:bg-neutral-50"
              >
                {/* Image */}
                <div className="flex aspect-[3/2] items-center justify-center overflow-hidden bg-neutral-100">
                  {imageObj?.url ? (
                    <img
                      src={imageObj.url}
                      alt={imageObj.alt || product.title}
                      className="max-h-full max-w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                      No Image
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col border-t border-neutral-200 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                      {product.slug?.toUpperCase()}
                    </span>
                    {categoryLabel && (
                      <span className="bg-neutral-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-neutral-500">
                        {categoryLabel}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-1.5 text-sm font-bold uppercase leading-tight tracking-wide">
                    {product.title}
                  </h3>

                  <div className="mt-auto flex gap-1.5 pt-4">
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex-1 bg-red-900 py-2 text-center text-[9px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-800"
                    >
                      Specs
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            Try adjusting your search or category filter.
          </p>
        </div>
      )}
    </div>
  )
}
