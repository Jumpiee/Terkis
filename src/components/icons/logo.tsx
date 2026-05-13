import Image from 'next/image'
import React from 'react'

export function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <Image
      src="/api/media/file/LOGO.png"
      alt="TERKIS Logo"
      width={340}
      height={100}
      className="h-8 w-auto"
    />
  )
}
