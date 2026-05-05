"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { PhoneOutgoing }  from 'lucide-react'

interface Props {
  header: any; 
}

const navLinks = [
  { label: "Home",     href: "/home" },
  { label: "About Us", href: "/aboutus" },
  { label: "Products", href: "/products" },
]
//
export function HeaderClient({ header }: Props) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex flex-1 items-center justify-start">
          <Image
              src="/api/media/file/LOGO.png"
              alt="TERKIS Logo"
              width={360}
              height={120}
              className="h-9 w-auto"
            />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-md font-bold uppercase tracking-wide transition-colors duration-200 pb-1 ${
                  isActive
                    ? "border-b-2 border-red-900 text-red-900"
                    : "border-b-2 border-transparent text-neutral-500 hover:border-red-700 hover:text-red-700"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <Link
            href="/contact"
            className="group hidden items-center justify-center gap-2 rounded-md bg-red-900 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-red-800 hover:px-4 md:inline-flex"
          >
            <PhoneOutgoing className="w-0 overflow-hidden transition-all duration-300 group-hover:w-4"></PhoneOutgoing>
            <span>Contact</span>
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
      <div className={`overflow-hidden transition-all duration-300 md:hidden ${menuOpen ? "max-h-64 border-t border-neutral-100" : "max-h-0"}`}>
        <nav className="flex flex-col gap-4 bg-white px-6 py-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-neutral-100 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                  isActive ? "text-red-900" : "text-neutral-500 hover:text-red-700"
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