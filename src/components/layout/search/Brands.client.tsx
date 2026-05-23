'use client'
import React, { useCallback, useMemo } from 'react'

import { Brand } from '@/payload-types'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx'

type Props = {
  brand: Brand
}

export const BrandItem: React.FC<Props> = ({ brand }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isActive = useMemo(() => {
    return searchParams.getAll('brand').includes(String(brand.id))
  }, [brand.id, searchParams])

  const toggle = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    const selected = params.getAll('brand')
    params.delete('brand')

    if (isActive) {
      selected.filter((id) => id !== String(brand.id)).forEach((id) => params.append('brand', id))
    } else {
      ;[...selected, String(brand.id)].forEach((id) => params.append('brand', id))
    }

    router.push(pathname + '?' + params.toString())
  }, [brand.id, isActive, pathname, router, searchParams])

  return (
    <label className="flex cursor-pointer items-center gap-2 py-1.5 group" onClick={toggle}>
      <span
        className={clsx(
          'flex h-3.5 w-3.5 flex-none items-center justify-center border transition-colors',
          isActive
            ? 'border-red-900 bg-red-900'
            : 'border-neutral-400 bg-white group-hover:border-neutral-700',
        )}
      >
        {isActive && (
          <svg viewBox="0 0 10 10" className="h-2 w-2 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
            <path d="M1.5 5.5l2.5 2.5 4.5-5" />
          </svg>
        )}
      </span>
      <span
        className={clsx(
          'font-mono text-xs uppercase tracking-widest transition-colors',
          isActive ? 'font-bold text-red-900' : 'text-neutral-500 group-hover:text-neutral-900',
        )}
      >
        {brand.title}
      </span>
    </label>
  )
}
