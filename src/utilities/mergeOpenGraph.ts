import type { Metadata } from 'next'

import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Quality in Your Flow.',
  images: [
    {
      url: `${getServerSideURL()}/image/industrial-plant.webp`,
    },
  ],
  siteName: process.env.SITE_NAME || 'Terkis',
  title: process.env.SITE_NAME || 'Terkis',
}

export const mergeOpenGraph = (og?: Partial<Metadata['openGraph']>): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
