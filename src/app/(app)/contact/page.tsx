import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const contactDetails = [
  {
    label: 'Enquiry',
    value: 'sales@terkis.co.th',
    description: '',
  },
  {
    label: 'Phone',
    value: '+66 84 903 5656',
    description: '',
  },
  {
    label: 'Headquarters',
    value: 'Terkis Co., Ltd. (Head Office)',
    description: '111/12 Moo 11 Racha Thewa Bang Phli Samut Prakan 10540',
  },
]

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>
}) {
  const { subject } = await searchParams
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">

      {/* ── CONTACT DETAILS ─────────────────────────────────────────────── */}
      <section className="border-b border-neutral-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
              Contact
            </p>
            <h1 className="text-3xl font-extrabold uppercase tracking-tight">
              Get in Touch
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-px bg-neutral-200 md:grid-cols-3">
            {contactDetails.map((detail, idx) => (
              <article key={detail.label} className="group bg-white p-10 hover:bg-neutral-50 transition-colors">
                <div className="mb-8 flex items-center gap-4">
                  <span className="flex h-9 w-9 items-center justify-center border border-neutral-900 font-mono text-xs font-bold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-neutral-200 group-hover:bg-red-900 transition-colors duration-500" />
                </div>
                <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
                  {detail.label}
                </p>
                <h3 className="mb-4 text-lg font-extrabold uppercase leading-tight tracking-tight">
                  {detail.value}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {detail.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
