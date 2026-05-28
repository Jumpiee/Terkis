import type { ComparisonTableBlock } from '@/payload-types'
import React from 'react'

export const ComparisonTableBlockComponent: React.FC<ComparisonTableBlock> = ({
  eyebrow,
  heading,
  columns,
  rows,
}) => {
  if (!columns?.length || !rows?.length) return null

  const colCount = columns.length

  // Tailwind can't detect dynamic class strings — use inline style for the grid template
  const gridStyle = {
    gridTemplateColumns: `1.4fr repeat(${colCount}, 1fr)`,
  }

  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight">{heading}</h2>
        </div>

        <div className="overflow-x-auto border border-neutral-200">
          {/* Header Row */}
          <div className="grid divide-x divide-neutral-200 bg-neutral-900" style={gridStyle}>
            <div className="px-6 py-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
                Specification
              </span>
            </div>
            {columns.map((col, i) => (
              <div key={col.id ?? i} className="flex flex-col gap-0.5 px-6 py-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  {col.code}
                </span>
                <span className="text-sm font-extrabold uppercase leading-tight tracking-tight text-white">
                  {col.label}
                </span>
                {col.sub && (
                  <span className="font-mono text-xs text-neutral-400">{col.sub}</span>
                )}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {rows.map((row, idx) => (
            <div
              key={row.id ?? idx}
              className="group grid divide-x divide-neutral-200 border-t border-neutral-200 transition-colors hover:bg-white"
              style={gridStyle}
            >
              <div className="flex items-center gap-4 bg-white px-6 py-5 transition-colors group-hover:bg-neutral-50">
                <span className="w-5 shrink-0 font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-700">
                  {row.param}
                </span>
              </div>
              {(row.values ?? []).slice(0, colCount).map((v, vi) => (
                <div key={v.id ?? vi} className="flex items-center px-6 py-5">
                  <span className="text-sm font-semibold text-neutral-900">{v.cell}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
