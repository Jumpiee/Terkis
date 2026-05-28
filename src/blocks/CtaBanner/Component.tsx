import type { CtaBannerBlock } from '@/payload-types'
import Link from 'next/link'
import React from 'react'

export const CtaBannerBlockComponent: React.FC<CtaBannerBlock> = ({
  heading,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}) => {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50 py-20 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-extrabold uppercase tracking-tight text-red-900">{heading}</h2>
        <p className="mt-6 text-neutral-600">{description}</p>
        <div className="mt-10 flex justify-center gap-6">
          <Link
            href={primaryHref}
            className="flex h-12 items-center bg-neutral-900 px-10 text-xs font-bold uppercase tracking-widest text-white hover:bg-black transition-colors"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="flex h-12 items-center border border-neutral-900 px-10 text-xs font-bold uppercase tracking-widest text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
