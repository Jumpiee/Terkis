import { RichText } from '@/components/RichText'
import type { Category, Media, Post, User } from '@/payload-types'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const post = await queryPostBySlug(slug)
  if (!post) return {}

  const cover = typeof post.coverImage === 'object' ? (post.coverImage as Media) : null

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: cover?.url
      ? {
          images: [{ url: cover.url, alt: cover.alt, width: cover.width ?? 1200, height: cover.height ?? 630 }],
        }
      : undefined,
  }
}

export default async function NewsArticlePage({ params }: Args) {
  const { slug } = await params
  const post = await queryPostBySlug(slug)
  if (!post) return notFound()

  const cover = typeof post.coverImage === 'object' ? (post.coverImage as Media) : null
  const category = typeof post.category === 'object' ? (post.category as Category) : null
  const author = typeof post.author === 'object' ? (post.author as User) : null

  // Related posts: same category, excluding current
  const payload = await getPayload({ config: configPromise })
  const relatedResult = category
    ? await payload.find({
        collection: 'posts',
        limit: 3,
        sort: '-createdAt',
        where: {
          and: [
            { _status: { equals: 'published' } },
            { slug: { not_equals: post.slug } },
            { category: { equals: category.id } },
          ],
        },
        depth: 2,
        overrideAccess: false,
      })
    : { docs: [] }

  const related = relatedResult.docs as Post[]

  return (
    <div className="bg-white text-neutral-900">

      {/* ── HERO ── */}
      <section className="bg-neutral-900">
        {cover?.url ? (
          <div className="relative h-[40vh] min-h-80 w-full overflow-hidden md:h-[55vh]">
            <Image
              src={cover.url}
              alt={cover.alt ?? post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/60 to-neutral-900/10" />
            <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12">
              <div className="mx-auto w-full max-w-4xl">
                <HeroMeta category={category} post={post} author={author} />
              </div>
            </div>
          </div>
        ) : (
          <div className="px-6 py-16">
            <div className="mx-auto max-w-4xl">
              <HeroMeta category={category} post={post} author={author} />
            </div>
          </div>
        )}
      </section>

      {/* ── ARTICLE BODY ── */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">

          {/* Breadcrumb */}
          <nav className="mb-10 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
            <Link href="/news" className="hover:text-red-900 transition-colors">News</Link>
            <span>/</span>
            {category && (
              <>
                <span className="text-red-900">{category.title}</span>
                <span>/</span>
              </>
            )}
            <span className="text-neutral-600 truncate max-w-60">{post.title}</span>
          </nav>

          {/* Excerpt callout */}
          {post.excerpt && (
            <div className="mb-10 border-l-2 border-red-900 pl-6">
              <p className="text-base leading-relaxed text-neutral-600">{post.excerpt}</p>
            </div>
          )}

          {/* Rich text */}
          <div className="prose prose-neutral max-w-none prose-headings:font-extrabold prose-headings:uppercase prose-headings:tracking-tight prose-a:text-red-900 prose-a:no-underline hover:prose-a:underline prose-img:rounded-none">
            <RichText data={post.content} enableGutter={false} enableProse={false} />
          </div>
        </div>
      </section>

      {/* ── META FOOTER ── */}
      <section className="border-t border-neutral-200 bg-neutral-50 px-6 py-10">
        <div className="mx-auto max-w-4xl flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6">
            {author && (
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-0.5">Author</p>
                <p className="text-sm font-extrabold uppercase">{author.name ?? author.email}</p>
              </div>
            )}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-0.5">Published</p>
              <p className="text-sm font-extrabold uppercase">
                {new Date(post.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            {category && (
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-0.5">Category</p>
                <span className="inline-block border border-red-900 px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-red-900">
                  {category.title}
                </span>
              </div>
            )}
          </div>

          <Link
            href="/news"
            className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-neutral-900 border-b border-neutral-900 pb-0.5 hover:text-red-900 hover:border-red-900 transition-colors"
          >
            ← Back to News
          </Link>
        </div>
      </section>

      {/* ── RELATED ARTICLES ── */}
      {related.length > 0 && (
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
                Related
              </p>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight">
                More Articles
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((rel, i) => {
                const relCover = typeof rel.coverImage === 'object' ? (rel.coverImage as Media) : null
                const relCat = typeof rel.category === 'object' ? (rel.category as Category) : null

                return (
                  <article key={rel.id} className="group bg-neutral-50 hover:bg-white transition-colors duration-200 flex flex-col border border-neutral-400">
                    <div className="relative aspect-video overflow-hidden bg-neutral-200">
                      {relCover?.url ? (
                        <Image
                          src={relCover.url}
                          alt={relCover.alt ?? rel.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
                          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">No Image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-8">
                      <div className="mb-5 flex items-start justify-between">
                        <span className="font-mono text-xs text-neutral-400">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-red-900 font-mono text-xs">→</span>
                      </div>

                      {relCat && (
                        <span className="mb-3 inline-block border-l-2 border-red-900 pl-2 font-mono text-xs uppercase tracking-widest text-red-900">
                          {relCat.title}
                        </span>
                      )}

                      <h3 className="mb-3 text-lg font-extrabold uppercase leading-tight flex-1">{rel.title}</h3>

                      {rel.excerpt && (
                        <p className="mb-5 text-sm text-neutral-600 leading-relaxed line-clamp-2">{rel.excerpt}</p>
                      )}

                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-200">
                        <span className="font-mono text-xs text-neutral-400">
                          {new Date(rel.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <Link
                          href={`/news/${rel.slug}`}
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
          </div>
        </section>
      )}
    </div>
  )
}

function HeroMeta({
  category,
  post,
  author,
}: {
  category: Category | null
  post: Post
  author: User | null
}) {
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {category && (
          <span className="border border-red-900 bg-red-900/10 px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-red-400">
            {category.title}
          </span>
        )}
        <span className="font-mono text-xs text-neutral-400">
          {new Date(post.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </span>
        {author && (
          <span className="font-mono text-xs text-neutral-400">
            — {author.name ?? author.email}
          </span>
        )}
      </div>
      <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
        {post.title}
      </h1>
    </>
  )
}

async function queryPostBySlug(slug: string): Promise<Post | null> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
    depth: 2,
    overrideAccess: false,
  })
  return (result.docs[0] as Post) ?? null
}