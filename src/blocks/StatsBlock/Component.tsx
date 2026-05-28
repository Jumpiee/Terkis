import type { StatsBlock as StatsBlockType } from '@/payload-types'
import React from 'react'

export const StatsBlockComponent: React.FC<StatsBlockType> = ({ stats }) => {
  if (!stats?.length) return null

  return (
    <section className="border border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-200">
          {stats.map((stat, i) => (
            <div key={i} className="px-8 py-8 flex flex-col gap-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold leading-none text-neutral-900 tracking-tight">
                  {stat.title}
                </span>
                {stat.unit && (
                  <span className="text-sm font-bold uppercase text-red-900 tracking-wide">
                    {stat.unit}
                  </span>
                )}
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 leading-relaxed">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
