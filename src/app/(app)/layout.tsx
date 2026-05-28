import type { ReactNode } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ensureStartsWith } from '@/utilities/ensureStartsWith'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { GeistMono } from 'geist/font/mono'
import localFont from 'next/font/local'
import React from 'react'
import './globals.css'

const spaceGrotesk = localFont({
  src: [
    { path: '../../fonts/Space_Grotesk/SpaceGrotesk-Light.ttf', weight: '300', style: 'normal' },
    { path: '../../fonts/Space_Grotesk/SpaceGrotesk-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../fonts/Space_Grotesk/SpaceGrotesk-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../fonts/Space_Grotesk/SpaceGrotesk-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../fonts/Space_Grotesk/SpaceGrotesk-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const ibmPlexSansThai = localFont({
  src: [
    { path: '../../fonts/IBM_Plex_Sans_Thai/IBMPlexSansThai-Thin.ttf', weight: '100', style: 'normal' },
    { path: '../../fonts/IBM_Plex_Sans_Thai/IBMPlexSansThai-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: '../../fonts/IBM_Plex_Sans_Thai/IBMPlexSansThai-Light.ttf', weight: '300', style: 'normal' },
    { path: '../../fonts/IBM_Plex_Sans_Thai/IBMPlexSansThai-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../fonts/IBM_Plex_Sans_Thai/IBMPlexSansThai-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../fonts/IBM_Plex_Sans_Thai/IBMPlexSansThai-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../fonts/IBM_Plex_Sans_Thai/IBMPlexSansThai-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-ibm-plex-sans-thai',
  display: 'swap',
})
/* const { SITE_NAME, TWITTER_CREATOR, TWITTER_SITE } = process.env
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined
 */
/* export const metadata = {
  metadataBase: new URL(baseUrl),
  robots: {
    follow: true,
    index: true,
  },
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
} */

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={[spaceGrotesk.variable, ibmPlexSansThai.variable, GeistMono.variable].filter(Boolean).join(' ')}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap" rel="stylesheet" />
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar />
          <LivePreviewListener />

          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
