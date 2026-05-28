'use client'

import { cn } from '@/utilities/cn'
import { createUrl } from '@/utilities/createUrl'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
  className?: string
}

export const Search: React.FC<Props> = ({ className }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const val = e.target as HTMLFormElement
    const search = val.search as HTMLInputElement
    const newParams = new URLSearchParams(searchParams.toString())

    if (search.value) {
      newParams.set('q', search.value)
    } else {
      newParams.delete('q')
    }

    router.push(createUrl('/products', newParams))
  }

  return (
    <div className="flex w-full justify-center px-6">
      <form
        className={cn('relative w-full max-w-2xl', className)}
        onSubmit={onSubmit}
      >
        <input
          autoComplete="off"
          className="w-full border border-neutral-300 bg-white px-4 py-3 pr-10 font-mono text-xs uppercase tracking-widest text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors"
          defaultValue={searchParams?.get('q') || ''}
          key={searchParams?.get('q')}
          name="search"
          placeholder="SEARCH PRODUCTS..."
          type="text"
        />
        <div className="absolute right-0 top-0 mr-4 flex h-full items-center">
          <SearchIcon className="h-3.5 w-3.5 text-neutral-400" />
        </div>
      </form>
    </div>
  )
}
