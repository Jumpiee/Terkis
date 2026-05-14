"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LogoIcon } from "../icons/logo"
import { Button } from '../ui/button'

interface Props {
  header: any;
}

const navLinks = [
  { label: "About Us", href: "/aboutus" },
  { label: "Products", href: "/products" },
  { label: "News", href: "/news" },
]
//
export function HeaderClient({ header }: Props) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex flex-1 items-center justify-start">
          <LogoIcon></LogoIcon>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-bold uppercase tracking-wide transition-colors duration-200 pb-1 group ${isActive ? "text-red-900" : "text-neutral-500 hover:text-red-700"
                  }`}
              >
                {link.label}

                {/* Underline: always full-width when active, center-expands on hover when inactive */}
                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] bg-red-900 -translate-x-1/2 transition-all duration-300 ease-out ${isActive
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                    }`}
                />
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <Link href="/contact">
            <Button className="bg-red-900 text-white hover:bg-red-800">
              Contact
            </Button>
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-neutral-900 transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-neutral-900 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-neutral-900 transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <div className={`overflow-hidden transition-all duration-500 md:hidden ${menuOpen ? "max-h-64 border-t border-neutral-100" : "max-h-0"}`}>
        <nav className="flex flex-col gap-4 bg-white px-6 py-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-neutral-100 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${isActive ? "text-red-900" : "text-neutral-500 hover:text-red-700"
                  }`}
              >
                {link.label}
              </Link>
            )
          })}

        </nav>
      </div>
    </header>
  )
}