import type { TechnicalPillarsBlock, Media } from '@/payload-types'
import React from 'react'

export const TechnicalPillarsBlockComponent: React.FC<TechnicalPillarsBlock> = ({
  eyebrow,
  heading,
  description,
  items,
  image,
}) => {
  const media = typeof image === 'object' ? (image as Media) : null

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div>
            <div className="mb-12">
              {eyebrow && (
                <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
                  {eyebrow}
                </p>
              )}
              <h2 className="text-4xl font-extrabold uppercase tracking-tight">{heading}</h2>
              <p className="mt-6 text-base text-neutral-600 leading-relaxed">{description}</p>
            </div>

            {items?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200">
                {items.map((item, idx) => (
                  <article
                    key={item.id ?? idx}
                    className="group bg-white p-8 transition-colors hover:bg-neutral-50"
                  >
                    <div className="mb-6 flex items-center gap-4">
                      <span className="flex h-8 w-8 items-center justify-center border border-neutral-900 font-mono text-xs font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="h-px flex-1 bg-neutral-200 group-hover:bg-red-900 transition-colors duration-500" />
                    </div>
                    <h3 className="mb-3 text-lg font-extrabold uppercase leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{item.body}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative aspect-square lg:aspect-auto lg:self-stretch bg-neutral-100 border border-neutral-200 overflow-hidden">
            {media?.url && (
              <img
                src={media.url}
                alt={media.alt ?? heading}
                className="w-full h-full object-cover"
              />
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
