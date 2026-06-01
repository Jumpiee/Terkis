import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/media/LOGO.png"
        alt="TERKIS Logo"
        width={340}
        height={100}
        className="h-8 w-auto"
      />
    </Link>
  )
}
