import config from '@payload-config'
import { getPayload } from 'payload'

type AboutContent = {
  title: string
  intro: string
}

const processSteps = [
  {
    title: 'Analyze',
    description:
      'Review operating context, constraints, and risk points before selecting components or architecture.',
  },
  {
    title: 'Engineer',
    description:
      'Design practical systems that balance performance, compliance, maintainability, and cost.',
  },
  {
    title: 'Deliver',
    description:
      'Validate implementation against real operating conditions and support long-term reliability.',
  },
] as const

const standards = [
  { name: 'ISO 9001:2015', detail: 'Quality management and controlled delivery workflows.' },
  { name: 'ASME BPVC', detail: 'Safety and pressure vessel compliance for industrial systems.' },
  { name: 'API Standards', detail: 'Industry-aligned specifications for process environments.' },
] as const

const milestones = [
  { year: '1998', label: 'Company founded' },
  { year: '2009', label: 'Expansion into regional projects' },
  { year: '2018', label: 'Integrated engineering programs' },
  { year: '2025', label: 'Reliability-first service model' },
] as const

const partners = ['KSB', 'Flowserve', 'Emerson', 'Ebara', 'Sulzer', 'Spirax', 'Wilo', 'Armstrong'] as const

const fallback: AboutContent = {
  title: 'About Us',
  intro:
    'TERKIS supports industrial teams with engineering services focused on uptime, safety, and long-term performance.',
}

async function getAboutContent(): Promise<AboutContent> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pages',
      limit: 1,
      where: {
        slug: {
          equals: 'about-us',
        },
      },
    })

    const page = result.docs[0]
    if (!page) return fallback

    return {
      title: page.meta?.title || fallback.title,
      intro: page.meta?.description || fallback.intro,
    }
  } catch {
    return fallback
  }
}

export default async function AboutUsPage() {
  const content = await getAboutContent()

  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(170,45,45,0.18),transparent_45%)]" />
        <div className="container relative py-20 md:py-28">
          <p className="inline-block rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Terkis Industrial
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{content.title}</h1>
          <p className="mt-6 max-w-3xl text-base text-muted-foreground md:text-lg">{content.intro}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-2xl font-semibold">25+</p>
              <p className="text-sm text-muted-foreground">Years of engineering support</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-2xl font-semibold">99.9%</p>
              <p className="text-sm text-muted-foreground">Target uptime programs</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-2xl font-semibold">24/7</p>
              <p className="text-sm text-muted-foreground">Technical response availability</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-16 md:py-20">
          <h2 className="text-2xl font-semibold md:text-3xl">Our Process</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-xl border border-border bg-card p-6">
                <p className="text-xs tracking-[0.14em] text-muted-foreground">STEP 0{index + 1}</p>
                <h3 className="mt-3 text-xl font-medium">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container py-16 md:py-20">
          <h2 className="text-2xl font-semibold md:text-3xl">Engineering Standards</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {standards.map((item) => (
              <div key={item.name} className="rounded-xl border border-border bg-background p-6">
                <p className="text-lg font-medium">{item.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container py-16 md:py-20">
          <h2 className="text-2xl font-semibold md:text-3xl">Milestones</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {milestones.map((item) => (
              <div key={item.year} className="rounded-xl border border-border p-5">
                <p className="text-2xl font-semibold">{item.year}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container py-16 md:py-20">
          <h2 className="text-2xl font-semibold md:text-3xl">Strategic Partners</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex h-20 items-center justify-center rounded-xl border border-border bg-card text-sm font-medium"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="container py-16 md:py-20">
          <div className="rounded-2xl border border-border bg-background p-8 md:p-10">
            <h2 className="text-2xl font-semibold md:text-3xl">Plan Your Next System Upgrade</h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              Share your constraints, required uptime, and compliance needs. We will prepare a practical engineering roadmap.
            </p>
            <button className="mt-6 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90">
              Contact Engineering Team
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}