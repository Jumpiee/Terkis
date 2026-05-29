import type { Metadata } from 'next'

import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Quality in Your Flow.',
  images: [
    {
      url: `${getServerSideURL()}/images/og-image.jpg`,
    },
  ],
  siteName: process.env.SITE_NAME || 'Payload Website Template',
  title: process.env.SITE_NAME || 'Payload Website Template',
}

export const mergeOpenGraph = (og?: Partial<Metadata['openGraph']>): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
