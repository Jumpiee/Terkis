'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  currentPage: number
  totalPages: number
}

export function NewsGrid({ currentPage, totalPages }: Props) {
  const pathname = usePathname()

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="mt-12 flex items-center justify-center gap-0 border border-neutral-200" aria-label="Pagination">
      {/* Prev */}
      {currentPage > 1 ? (
        <Link
          href={`${pathname}?page=${currentPage - 1}`}
          className="flex h-11 items-center border-r border-neutral-200 px-5 font-mono text-xs font-bold uppercase tracking-widest text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
        >
          ← Prev
        </Link>
      ) : (
        <span className="flex h-11 items-center border-r border-neutral-200 px-5 font-mono text-xs font-bold uppercase tracking-widest text-neutral-300 cursor-not-allowed">
          ← Prev
        </span>
      )}

      {/* Page numbers */}
      {pages.map((p) => (
        <Link
          key={p}
          href={`${pathname}?page=${p}`}
          className={`flex h-11 w-11 items-center justify-center border-r border-neutral-200 font-mono text-xs font-bold transition-colors ${
            p === currentPage
              ? 'bg-neutral-900 text-white'
              : 'text-neutral-500 hover:bg-neutral-900 hover:text-white'
          }`}
        >
          {p}
        </Link>
      ))}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={`${pathname}?page=${currentPage + 1}`}
          className="flex h-11 items-center px-5 font-mono text-xs font-bold uppercase tracking-widest text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
        >
          Next →
        </Link>
      ) : (
        <span className="flex h-11 items-center px-5 font-mono text-xs font-bold uppercase tracking-widest text-neutral-300 cursor-not-allowed">
          Next →
        </span>
      )}
    </nav>
  )
}
