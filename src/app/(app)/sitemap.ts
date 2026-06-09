import type { MetadataRoute } from 'next'

import { getServerSideURL } from '@/utilities/getURL'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })
  const siteUrl = getServerSideURL()

  // Fetch all published pages
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: true,
    select: {
      slug: true,
      updatedAt: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  // Fetch all published products
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: true,
    select: {
      slug: true,
      updatedAt: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  // Fetch all published news/posts
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: true,
    select: {
      slug: true,
      updatedAt: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const pageEntries: MetadataRoute.Sitemap = pages.docs.map(({ slug, updatedAt }) => ({
    lastModified: updatedAt,
    url: `${siteUrl}/${slug === 'home' ? '' : slug}`,
  }))

  const productEntries: MetadataRoute.Sitemap = products.docs.map(({ slug, updatedAt }) => ({
    lastModified: updatedAt,
    url: `${siteUrl}/products/${slug}`,
  }))

  const postEntries: MetadataRoute.Sitemap = posts.docs.map(({ slug, updatedAt }) => ({
    lastModified: updatedAt,
    url: `${siteUrl}/news/${slug}`,
  }))

  // Static routes that might not be in the 'pages' collection but exist in src/app/(app)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      lastModified: new Date(),
      url: `${siteUrl}/news`,
    },
    {
      lastModified: new Date(),
      url: `${siteUrl}/products`,
    },
  ]

  return [...pageEntries, ...productEntries, ...postEntries, ...staticRoutes]
}
