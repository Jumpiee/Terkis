import { Brands } from '@/components/layout/search/Brands'
import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { Search } from '@/components/Search'
import { sorting } from '@/lib/constants'
import React, { Suspense } from 'react'

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-neutral-900">

      {/* Search bar */}
      <div className="border-b border-neutral-200 bg-white py-5">
        <Suspense fallback={null}>
          <Search />
        </Suspense>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-0 md:flex-row">

          {/* Sidebar */}
          <aside className="w-full flex-none border-b border-neutral-200 py-6 md:w-48 md:border-b-0 md:border-r md:py-10 md:pr-8">
            <div className="flex flex-col gap-8">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Category
                </p>
                <Suspense fallback={null}>
                  <Categories />
                </Suspense>
              </div>
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Brand
                </p>
                <Suspense fallback={null}>
                  <Brands />
                </Suspense>
              </div>
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Sort by
                </p>
                <FilterList list={sorting} />
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 py-10 md:pl-10">
            {children}
          </div>

        </div>
      </div>
    </div>
  )
}
