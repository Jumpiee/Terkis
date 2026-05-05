'use client'
import { CMSLink } from '@/components/Link'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import Link from 'next/link'
import React, { Suspense } from 'react'
import Image from 'next/image'
import { MobileMenu } from './MobileMenu'
import type { Header } from 'src/payload-types'

import { LogoIcon } from '@/components/icons/logo'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const menu = header.navItems || []
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Image
              src= '/api/media/file/TERKIS.png'
              alt= "TERKIS"
              width={360}
              height={120}
              className="h-12 w-auto"
              />
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#solutions" className="border-b-2 border-red-900 pb-1 font-bold uppercase text-red-900">
              Home
            </a>
            <a href="#excellence" className="font-bold uppercase text-neutral-500 hover:text-red-700">
              About Us
            </a>
            <a href="#sourcing" className="font-bold uppercase text-neutral-500 hover:text-red-700">
              Product
            </a>
            <a href="#heritage" className="font-bold uppercase text-neutral-500 hover:text-red-700">
              Contact
            </a>
          </nav>
        </div>
      </header>
  )
}
