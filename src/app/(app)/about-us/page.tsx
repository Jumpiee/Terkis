import Image from 'next/image'
import PartnersGrid from '@/components/PartnerGrid/page'
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollReveal } from '@/components/ScrollReveal'

// ── Data ─────────────────────────────────────────────────────────────

const stats = [
  { value: '20+', label: "Years in Thailand's Industrial Sector" },
  { value: '14', label: 'International Brands Represented' },
  { value: '6', label: 'Origin Countries (DE·UK·IT·DK·USA·JP)' },
  { value: 'API/ISO', label: 'Certified Product Standards' },
]

const capabilities = [
  {
    index: '01',
    title: 'Authorized Distribution',
    description:
      "Thailand's authorized agent for 14 premium manufacturers across Europe, America, and Japan. We ensure direct factory channels and full material traceability.",
    specs: ['Factory Direct', '14 Brands'],
  },
  {
    index: '02',
    title: 'Process Engineering',
    description:
      'Specialist equipment selection for petrochemical, refinery, and bulk liquid storage applications. Matching technical specs to API 610, 6D, and 2000 standards.',
    specs: ['Oil & Gas', 'Petrochemical'],
  },
  {
    index: '03',
    title: 'Technical Consultation',
    description:
      'We support engineering teams from initial specification through to commissioning, coordinating directly with manufacturer technical departments.',
    specs: ['Spec-Ready', 'Commissioning'],
  },
]

const partners = [
  { name: 'FLUIMAC', logo: '/api/media/file/FLUIMAC.jpg' },
  { name: 'HOMA', logo: '/api/media/file/HOMA.png' },
  { name: 'SEKO', logo: '/api/media/file/SEKO.png' },
  { name: 'VICTORPUMP', logo: '/api/media/file/VICTOR.png' },
  { name: 'TOKYO', logo: '/api/media/file/TOKYO.png' },
  { name: 'MAXSEAL', logo: '/api/media/file/MAXSEAL.png' },
  { name: 'FLOTITE', logo: '/api/media/file/FLOTITE.png' },
  { name: 'FAUDI', logo: '/api/media/file/FAUDI.png' },
  { name: 'AFH', logo: '/api/media/file/AFH.png' },
  { name: 'AIRCON', logo: '/api/media/file/AIRCON.png' },
]

// ── Page ─────────────────────────────────────────────────────────────

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* ── SECTION: COMPANY DETAIL (HERO) ──────────────── */}
      <section className="relative overflow-hidden border-b border-neutral-200 bg-white pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <ScrollReveal animation="animate-fade-in">
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
              Authorized Distributor · Thailand
            </p>
          </ScrollReveal>
          <ScrollReveal animation="animate-fade-up" delay={200}>
            <h1 className="text-red-900 text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[1.05] max-w-4xl">
              Quality<br />
              <span className="text-black">in your flow</span> <br />
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="animate-fade-up" delay={400}>
            <p className="mt-8 max-w-xl text-base text-neutral-600 leading-relaxed">
              Terkis is a specialist distributor of premium industrial equipment from Germany, the UK, Italy, Denmark, the USA, and Japan — sourced specifically for petrochemical, refinery, and process plant applications.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────── */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-200">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} animation="animate-fade-in" delay={i * 100}>
                <div className="px-8 py-10 flex flex-col gap-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold leading-none text-neutral-900 tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                    {stat.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: WHAT WE DO ──────────────────────── */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal animation="animate-slide-in-left">
            <div className="mb-12">
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
                Capabilities
              </p>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight">
                What We Do
              </h2>
              <p className="mt-3 max-w-xl text-sm text-neutral-600">
                Comprehensive fluid control engineering from specification to commissioning.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-px bg-neutral-200 md:grid-cols-3">
            {capabilities.map((cap, i) => (
              <ScrollReveal key={cap.title} animation="animate-fade-up" delay={i * 100}>
                <article className="group bg-white hover:bg-neutral-50 transition-colors duration-200 p-8 flex flex-col h-full">
                  <div className="mb-6 flex items-start justify-between">
                    <span className="font-mono text-xs text-neutral-400">{cap.index}</span>
                    <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-red-900 font-mono text-xs">→</span>
                  </div>

                  <h3 className="mb-3 text-lg font-extrabold uppercase leading-tight">{cap.title}</h3>
                  <p className="mb-6 text-sm text-neutral-600 leading-relaxed flex-1">{cap.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {cap.specs.map((spec) => (
                      <span key={spec} className="border border-neutral-200 px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-neutral-500">
                        {spec}
                      </span>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: OUR PARTNER ─────────────────────── */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal animation="animate-fade-in">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-red-900">
                  Our Partners
                </p>
                <h2 className="text-3xl font-extrabold uppercase tracking-tight">
                  International Brands We Represent
                </h2>
                <p className="mt-2 text-sm text-neutral-500">
                  Authorized distributor and agent for leading European and American manufacturers.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="animate-fade-up" delay={200}>
            <PartnersGrid />
          </ScrollReveal>

          <ScrollReveal animation="animate-fade-in" delay={400}>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-neutral-400">
              All products are supplied through authorized distribution channels.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
