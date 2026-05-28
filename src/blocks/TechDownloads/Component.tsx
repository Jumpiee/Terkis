'use client'

import type { TechDownloadsBlock, Media } from '@/payload-types'
import React, { useState } from 'react'

export const TechDownloadsBlockComponent: React.FC<TechDownloadsBlock> = ({
  eyebrow,
  heading,
  description,
  documents,
  ctaEyebrow,
  ctaHeading,
  ctaDescription,
  ctaInputLabel,
  ctaInputPlaceholder,
  ctaButtonLabel,
}) => {
  const [enquired, setEnquired] = useState(false)

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

          {/* Left — downloads */}
          <div>
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
              {eyebrow}
            </p>
            <h2 className="text-4xl font-extrabold uppercase tracking-tight">{heading}</h2>
            <p className="mt-8 text-base text-neutral-600 leading-relaxed">{description}</p>

            {documents?.length ? (
              <div className="mt-12 flex flex-col gap-px border border-neutral-200 bg-neutral-200">
                {documents.map((doc) => {
                  const file = typeof doc.file === 'object' ? (doc.file as Media) : null
                  return (
                    <a
                      key={doc.id ?? doc.label}
                      href={file?.url ?? '#'}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between bg-white px-8 py-6 transition-colors hover:bg-neutral-50"
                    >
                      <div>
                        <p className="text-sm font-extrabold uppercase tracking-tight">{doc.label}</p>
                        {file?.filename && (
                          <p className="mt-1 font-mono text-xs text-neutral-400">{file.filename}</p>
                        )}
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-900 border-b border-red-900 pb-0.5">
                        Download
                      </span>
                    </a>
                  )
                })}
              </div>
            ) : null}
          </div>

          {/* Right — CTA panel */}
          <div className="flex flex-col justify-center bg-neutral-900 p-12 text-white">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-400">
              {ctaEyebrow}
            </p>
            <h3 className="text-3xl font-extrabold uppercase tracking-tight">{ctaHeading}</h3>
            <p className="mt-6 text-sm text-neutral-400 leading-relaxed">{ctaDescription}</p>
            <div className="mt-10 flex flex-col gap-4">
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-neutral-500">
                  {ctaInputLabel} *
                </label>
                <input
                  className="w-full border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-red-900 focus:outline-none"
                  placeholder={ctaInputPlaceholder ?? ''}
                />
              </div>
              <button
                onClick={() => setEnquired(true)}
                className="mt-4 h-14 bg-red-900 text-xs font-bold uppercase tracking-widest text-white hover:bg-red-800 transition-colors"
              >
                {enquired ? 'Enquiry Registered' : `${ctaButtonLabel} →`}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
