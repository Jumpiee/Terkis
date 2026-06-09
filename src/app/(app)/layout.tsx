import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
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

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  robots: {
    follow: true,
    index: true,
  },
  title: {
    default: process.env.SITE_NAME || 'Terkis',
    template: `%s | ${process.env.SITE_NAME || 'Terkis'}`,
  },
  twitter: {
    card: 'summary_large_image',
  },
}

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
