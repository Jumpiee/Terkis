import type { Media, Post, PostCategory } from '@/payload-types'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import { NewsGrid } from './NewsGrid'

const POSTS_PER_PAGE = 6

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1', 10))

  const payload = await getPayload({ config: configPromise })

  // Fetch the pinned post (most recent published)
  const pinnedResult = await payload.find({
    collection: 'posts',
    limit: 1,
    sort: '-createdAt',
    where: { _status: { equals: 'published' } },
    depth: 2,
    overrideAccess: false,
  })

  const pinned = pinnedResult.docs[0] as Post | undefined

  // Fetch the grid posts (skip the pinned one)
  const gridResult = await payload.find({
    collection: 'posts',
    limit: POSTS_PER_PAGE,
    page,
    sort: '-createdAt',
    where: {
      and: [
        { _status: { equals: 'published' } },
        ...(pinned ? [{ id: { not_equals: pinned.id } }] : []),
      ],
    },
    depth: 2,
    overrideAccess: false,
  })

  const gridPosts = gridResult.docs as Post[]
  const totalPages = gridResult.totalPages

  return (
    <div className="bg-white text-neutral-900">
      {/* ── PAGE HEADER ── */}
      <section className="bg-neutral-900 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-400">
            Terkis Co., Ltd.
          </p>
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
            News &amp; Updates
          </h1>
          <p className="mt-3 max-w-xl text-sm text-neutral-400">
            Announcements, industry insights, and company updates from our engineering team.
          </p>
        </div>
      </section>

      {/* ── PINNED POST ── */}
      {pinned && (
        <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <Link href={`/news/${pinned.slug}`} className="group block">
              <div className="grid grid-cols-1 gap-0 bg-neutral-900 md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-neutral-800 md:aspect-auto md:min-h-120">
                  {pinned.coverImage && typeof pinned.coverImage === 'object' && (pinned.coverImage as Media).url ? (
                    <Image
                      src={(pinned.coverImage as Media).url!}
                      alt={(pinned.coverImage as Media).alt ?? pinned.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-600">
                        No Image
                      </span>
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-r from-neutral-900/60 to-transparent md:hidden" />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-10 md:p-12">
                  <div>
                    <div className="mb-6 flex items-center gap-4">
                      {pinned.category && typeof pinned.category === 'object' && (
                        <span className="border border-red-900 px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-red-400">
                          {(pinned.category as PostCategory).title}
                        </span>
                      )}
                      <span className="font-mono text-xs text-neutral-500">
                        {new Date(pinned.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <h2 className="mb-4 text-2xl font-extrabold uppercase leading-tight text-white md:text-3xl">
                      {pinned.title}
                    </h2>

                    {pinned.excerpt && (
                      <p className="text-sm leading-relaxed text-neutral-400">
                        {pinned.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-red-400 border-b border-red-900 pb-0.5 group-hover:text-red-300 transition-colors">
                      Read Article
                    </span>
                    <span className="text-red-400 group-hover:translate-x-1 transition-transform duration-200 font-mono text-xs">→</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── NEWS GRID ── */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
              Archive
            </p>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight">
              All Articles
            </h2>
          </div>

          {gridPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post, i) => {
                  const idx = (page - 1) * POSTS_PER_PAGE + i + 1
                  const cover = typeof post.coverImage === 'object' ? post.coverImage as Media : null
                  const category = typeof post.category === 'object' ? post.category as PostCategory : null

                  return (
                    <article key={post.id} className="group bg-neutral-50 hover:bg-white transition-colors duration-200 flex flex-col border border-neutral-200">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden bg-neutral-200">
                        {cover?.url ? (
                          <Image
                            src={cover.url}
                            alt={cover.alt ?? post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
                            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                              No Image
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-8">
                        <div className="mb-5 flex items-start justify-between">
                          <span className="font-mono text-xs text-neutral-400">
                            {String(idx).padStart(2, '0')}
                          </span>
                          <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-red-900 font-mono text-xs">→</span>
                        </div>

                        {category && (
                          <span className="mb-3 inline-block border-l-2 border-red-900 pl-2 font-mono text-xs uppercase tracking-widest text-red-900">
                            {category.title}
                          </span>
                        )}

                        <h3 className="mb-3 text-lg font-extrabold uppercase leading-tight flex-1">
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p className="mb-5 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-200">
                          <span className="font-mono text-xs text-neutral-400">
                            {new Date(post.createdAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                          <Link
                            href={`/news/${post.slug}`}
                            className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-red-900 border-b border-red-900 pb-0.5 hover:text-red-700 transition-colors"
                          >
                            Read Article
                          </Link>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <NewsGrid currentPage={page} totalPages={totalPages} />
              )}
            </>
          ) : (
            <div className="flex items-center justify-center py-24 border border-neutral-200">
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                No articles published yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
