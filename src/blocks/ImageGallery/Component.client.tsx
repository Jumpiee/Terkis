'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { ImageGalleryBlock as ImageGalleryBlockProps, Media } from '@/payload-types'
import Image from 'next/image'
import React, { useState } from 'react'

type ImageEntry = {
  image: number | Media
  caption?: string | null
  id?: string | null
}

export const ImageGalleryClient: React.FC<ImageGalleryBlockProps> = ({ images }) => {
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (!images?.length) return null

  const entries = images as ImageEntry[]
  const isSingle = entries.length === 1

  return (
    <>
      {/* ── SINGLE IMAGE ── */}
      {isSingle ? (
        <SingleImage entry={entries[0]!} onOpen={() => setLightbox(0)} />
      ) : (
        /* ── CAROUSEL ── */
        <div className="relative w-full">
          <Carousel opts={{ align: 'start', loop: entries.length > 2 }}>
            <CarouselContent>
              {entries.map((entry, i) => {
                const media = typeof entry.image === 'object' ? entry.image : null
                if (!media?.url) return null

                return (
                  <CarouselItem
                    key={entry.id ?? i}
                    className="basis-full"
                  >
                    <button
                      type="button"
                      className="group relative block w-full overflow-hidden bg-neutral-100 focus:outline-none"
                      onClick={() => setLightbox(i)}
                    >
                      <div className="relative h-[500px] max-h-[500px] overflow-hidden">
                        <Image
                          src={media.url}
                          alt={media.alt ?? entry.caption ?? ''}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-neutral-900/0 transition-colors duration-300 group-hover:bg-neutral-900/10" />
                      </div>
                      {entry.caption && (
                        <p className="border-t border-neutral-200 px-3 py-2 text-left font-mono text-xs text-neutral-500">
                          {entry.caption}
                        </p>
                      )}
                    </button>
                  </CarouselItem>
                )
              })}
            </CarouselContent>

            {entries.length > 1 && (
              <>
                <CarouselPrevious className="left-2 border-neutral-300 bg-white/90 hover:bg-white" />
                <CarouselNext className="right-2 border-neutral-300 bg-white/90 hover:bg-white" />
              </>
            )}
          </Carousel>

          {/* slide counter */}
          <p className="mt-2 text-right font-mono text-xs text-neutral-400">
            {entries.length} images
          </p>
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <Lightbox entries={entries} current={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}

function SingleImage({ entry, onOpen }: { entry: ImageEntry; onOpen: () => void }) {
  const media = typeof entry.image === 'object' ? entry.image : null
  if (!media?.url) return null

  return (
    <button
      type="button"
      className="group relative block w-full overflow-hidden bg-neutral-100 focus:outline-none"
      onClick={onOpen}
    >
      <div className="relative h-[500px] max-h-[500px] w-full overflow-hidden">
        <Image
          src={media.url}
          alt={media.alt ?? entry.caption ?? ''}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>
      {entry.caption && (
        <p className="border-t border-neutral-200 px-3 py-2 text-left font-mono text-xs text-neutral-500">
          {entry.caption}
        </p>
      )}
    </button>
  )
}

function Lightbox({
  entries,
  current,
  onClose,
}: {
  entries: ImageEntry[]
  current: number
  onClose: () => void
}) {
  const [idx, setIdx] = useState(current)
  const entry = entries[idx]
  const media = entry && typeof entry.image === 'object' ? entry.image : null

  const prev = () => setIdx((i) => (i - 1 + entries.length) % entries.length)
  const next = () => setIdx((i) => (i + 1) % entries.length)

  if (!media?.url) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 p-4"
      role="dialog"
      aria-modal
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-white"
        onClick={onClose}
      >
        Close ✕
      </button>

      {entries.length > 1 && (
        <button
          type="button"
          className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-2xl text-neutral-400 hover:text-white"
          onClick={(e) => { e.stopPropagation(); prev() }}
        >
          ‹
        </button>
      )}

      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[75vh] w-full">
          <Image
            src={media.url}
            alt={media.alt ?? entry?.caption ?? ''}
            fill
            className="object-contain"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
        {entry?.caption && (
          <p className="mt-2 text-center font-mono text-xs text-neutral-400">{entry.caption}</p>
        )}
        {entries.length > 1 && (
          <p className="mt-1 text-center font-mono text-xs text-neutral-600">
            {idx + 1} / {entries.length}
          </p>
        )}
      </div>

      {entries.length > 1 && (
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-2xl text-neutral-400 hover:text-white"
          onClick={(e) => { e.stopPropagation(); next() }}
        >
          ›
        </button>
      )}
    </div>
  )
}
