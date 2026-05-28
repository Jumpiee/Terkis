import type { ApplicationsBlock } from '@/payload-types'
import React from 'react'

export const ApplicationsBlockComponent: React.FC<ApplicationsBlock> = ({
  eyebrow,
  heading,
  applications,
}) => {
  if (!applications?.length) return null

  return (
    <section className="bg-neutral-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-400">
            {eyebrow}
          </p>
          <h2 className="text-4xl font-extrabold uppercase tracking-tight text-white">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-neutral-700 md:grid-cols-3">
          {applications.map((app) => (
            <article
              key={app.id ?? app.code}
              className="group bg-neutral-900 p-12 hover:bg-neutral-800 transition-colors"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  {app.code}
                </span>
                <span className="h-px w-8 bg-neutral-700 group-hover:w-16 group-hover:bg-red-900 transition-all duration-300" />
              </div>
              <h3 className="mb-4 text-lg font-extrabold uppercase leading-tight text-white">
                {app.title}
              </h3>
              <p className="mb-8 text-sm text-neutral-400 leading-relaxed">{app.body}</p>
              <div className="border-l-2 border-red-900 pl-4">
                <span className="font-mono text-xs uppercase tracking-widest text-red-400">
                  {app.badge}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
