import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'

interface Props {
  menu: Footer['navItems']
}

export function FooterMenu({ menu }: Props) {
  if (!menu?.length) return null

  return (
    <nav>
      <ul className="space-y-2 pt-1">
        {menu.map((item) => (
          <li key={item.id}>
            <CMSLink
              appearance="link"
              {...item.link}
              className="text-xs uppercase tracking-widest text-gray-500 hover:text-terkis-red transition-colors"
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
