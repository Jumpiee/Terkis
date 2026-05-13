import type { Footer } from '@/payload-types'

import { FooterMenu } from '@/components/Footer/menu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { LogoIcon } from '../icons/logo'

const { COMPANY_NAME, SITE_NAME, CONTACT_PHONE, CONTACT_EMAIL } = process.env

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const menu = footer.navItems || []
  const currentYear = new Date().getFullYear()
  const copyrightName = COMPANY_NAME || SITE_NAME || 'TERKIS'
  const phone = CONTACT_PHONE || '+66 84 903 5656'
  const email = CONTACT_EMAIL || 'sales@terkis.co.th'

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1 — Brand */}
          <div className="space-y-4">
            <LogoIcon />
            <p className="text-[10px] text-zinc-500 uppercase leading-relaxed">
              PROVIDING PRECISION INFRASTRUCTURE<br /> SOLUTIONS FOR THE WORLD
              ENVIRONMENTS.
            </p>
          </div>

          {/* Col 2 — Contact info */}
          <div>
            <span className="text-sm text-zinc-900 dark:text-zinc-50 font-bold uppercase">
              Contact
            </span>
            <div className="space-y-4 pt-4">
              <Link href={`tel:${phone}`} className="flex items-center gap-3">
                <div className="w-10 h-10 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-zinc-500" strokeWidth={1} />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block uppercase tracking-widest">
                    DIRECT_COMMS
                  </span>
                  <span className="text-sm text-zinc-700 hover:text-terkis-red transition-colors">
                    {phone}
                  </span>
                </div>
              </Link>

              <Link href={`mailto:${email}`} className="flex items-center gap-3">
                <div className="w-10 h-10 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-zinc-500" strokeWidth={1} />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block uppercase tracking-widest">
                    EMAIL
                  </span>
                  <span
                    className="text-sm text-zinc-700 hover:text-terkis-red transition-colors"
                  >
                    {email}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Col 3 — Page nav */}
          <div className="space-y-3">
            <span className="text-xs text-zinc-900 dark:text-zinc-50 font-bold uppercase">
              Navigation
            </span>
            <Suspense
              fallback={
                <div className="space-y-2 pt-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-24 h-2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700"
                    />
                  ))}
                </div>
              }
            >
              <FooterMenu menu={menu} />
            </Suspense>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[9px] uppercase tracking-widest text-zinc-400">
            &copy; {currentYear} {copyrightName} INDUSTRIAL INTELLIGENCE. ALL SYSTEMS OPERATIONAL.
          </span>
        </div>
      </div>
    </footer>
  )
}
