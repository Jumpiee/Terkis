import type { DataSheetBlock } from '@/payload-types'
import React from 'react'

export const DataSheetBlockComponent: React.FC<DataSheetBlock> = ({ eyebrow, heading, specs }) => {
  if (!specs?.length) return null

  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-neutral-900 md:grid-cols-2 lg:grid-cols-4">
          {specs.map((spec) => (
            <div
              key={spec.id ?? spec.label}
              className="bg-white p-10 hover:bg-neutral-50 transition-colors"
            >
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
                {spec.label}
              </p>
              <p className="text-base font-extrabold uppercase tracking-tight text-neutral-900">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
