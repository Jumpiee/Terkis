'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export function PerPageLink({ value, active }: { value: number; active: boolean }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function href() {
    const params = new URLSearchParams(searchParams?.toString())
    params.set('limit', String(value))
    params.delete('page')
    return `${pathname}?${params.toString()}`
  }

  return (
    <Link
      href={href()}
      className={`flex h-7 w-9 items-center justify-center border-r border-neutral-200 font-mono text-[9px] font-bold uppercase tracking-widest transition-colors last:border-r-0 ${
        active
          ? 'bg-neutral-900 text-white'
          : 'text-neutral-500 hover:bg-neutral-900 hover:text-white'
      }`}
    >
      {value}
    </Link>
  )
}
