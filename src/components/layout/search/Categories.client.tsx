'use client'
import React, { useCallback, useMemo } from 'react'

import { ProductCategory } from '@/payload-types'
import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
  category: ProductCategory
}

export const CategoryItem: React.FC<Props> = ({ category }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isActive = useMemo(() => {
    return searchParams.get('category') === String(category.id)
  }, [category.id, searchParams])

  const setQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (isActive) {
      params.delete('category')
    } else {
      params.set('category', String(category.id))
    }

    const newParams = params.toString()

    router.push(pathname + '?' + newParams)
  }, [category.id, isActive, pathname, router, searchParams])

  return (
    <button
      onClick={() => setQuery()}
      className={clsx(
        'w-full text-left font-mono text-xs uppercase tracking-widest py-1.5 transition-colors hover:text-neutral-900',
        {
          'font-bold text-red-900': isActive,
          'text-neutral-500': !isActive,
        },
      )}
    >
      {category.title}
    </button>
  )
}
