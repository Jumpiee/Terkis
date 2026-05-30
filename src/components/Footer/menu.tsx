import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'

interface Props {
  menu: Footer['navItems']
}

const defaultLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'News', href: '/news' },
  { label: 'Contacts', href: '/contact' },
]

export function FooterMenu({ menu }: Props) {
  return (
    <nav>
      <ul className="space-y-2 pt-1">
        {defaultLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-red-900 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
        {menu && menu.length > 0 && menu.map((item) => (
          <li key={item.id}>
            <CMSLink
              appearance="link"
              {...item.link}
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-red-900 transition-colors"
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
