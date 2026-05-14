import { Button } from "@/components/ui/button"
import Link from "next/link"

// ── Data ─────────────────────────────────────────────────────────────
const stats = [
  { value: "30+",    label: "Years in Operation" },
  { value: "500+",   label: "Projects Delivered" },
  { value: "ZERO",   label: "System Failures" },
  { value: "12+",    label: "Countries Served" },
]

const values = [
  {
    title: "Our Mission",
    description:
      "To supply, engineer, and support the most reliable fluid control systems in Southeast Asia — delivering zero-failure solutions that protect both industrial assets and human lives in petrochemical, power, and process industries.",
  },
  {
    title: "Technical Approach",
    description:
      "Every project begins with a full thermodynamic and flow analysis. We don't sell parts — we engineer solutions. Our team holds certifications across API, ASME, and ISO standards, ensuring compliance from specification through commissioning.",
  },
  {
    title: "Global Sourcing",
    description:
      "Direct factory partnerships with Tier-1 European and American manufacturers eliminate gray-market risk. Every component arrives with full material traceability, test certificates, and factory documentation.",
  },
  {
    title: "After-Sales Support",
    description:
      "Our relationship extends beyond delivery. TERKIS provides on-site commissioning support, preventive maintenance programs, and 24/7 emergency technical consultation for all supplied equipment.",
  },
]

const timeline = [
  {
    year: "1994",
    title: "Founded in Bangkok",
    description:
      "Established as a specialist industrial valve and pump distributor serving Thailand's growing petrochemical sector.",
  },
  {
    year: "2001",
    title: "API Certification Achieved",
    description:
      "Became one of Southeast Asia's first distributors to achieve API 610 and API 6D authorized distributor status.",
  },
  {
    year: "2008",
    title: "Regional Expansion",
    description:
      "Expanded operations to serve Malaysia, Singapore, and Vietnam — establishing a regional technical service network.",
  },
  {
    year: "2015",
    title: "ISO 9001:2015 Certification",
    description:
      "Full quality management system certification covering procurement, engineering review, and aftersales services.",
  },
  {
    year: "2024",
    title: "30 Years — Zero Failures",
    description:
      "Marking three decades of operation with no reported system failures attributable to TERKIS-supplied equipment.",
  },
]

const certifications = ["API 610", "API 6D", "ASME BPVC", "ISO 9001:2015", "API 520", "API 526"]

// ── Page ─────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-50 pt-24 pb-16 px-6">
        {/* Red glow accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-red-900" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-red-900">
              Founded 1994 · Bangkok, Thailand
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-[0.9] mb-6 max-w-3xl">
            Engineering <br />
            <span className="text-red-900">Without</span> <br />
            Compromise
          </h1>

          <p className="text-lg text-neutral-600 max-w-xl leading-relaxed">
            TERKIS Industrial Systems is a specialist distributor of mission-critical
            flow control and pumping equipment for Southeast Asia's most demanding
            industrial environments.
          </p>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────── */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-10 py-10 ${i < stats.length - 1 ? "border-r border-neutral-200" : ""}`}
            >
              <p className="text-4xl font-black text-red-900 mb-1">{s.value}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO WE ARE ───────────────────────────────── */}
      <section className="py-16 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-900 mb-3">
              Who We Are
            </p>
            <h2 className="text-3xl font-bold uppercase mb-6">
              Three Decades of Industrial Expertise
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Since 1994, TERKIS has been the trusted partner for Thailand's most critical
              industrial operations. We specialize in the procurement, engineering review,
              and technical support of pumps, valves, seals, and flow control systems.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Our engineers don't just source equipment — they analyze system parameters,
              simulate flow conditions, and validate every selection against international
              standards before a single component leaves the factory.
            </p>
            <div className="flex flex-wrap gap-3">
              {certifications.map((c) => (
                <span
                  key={c}
                  className="border border-neutral-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 rounded-lg"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden bg-neutral-200">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2AtGfT9ErBSi2r-BW9xyaoPmerBMO9YU99zvWZmf6nAxQoTC0QKWcjG5NkFMGj-nxRWnAzxiK9RIfnONT_lR9Zs30BHBgHklT3GO8HgjgwP4PI-aJFJRDB8LSW2Txc0xpB4G8YW-_1KQXSJTYKUkf_o9TABPnFGRXOXIsbQuGk9kgyUOi1yslnLidrIfeIhcbt22SybhakBmUNagzwOZrcK_oKXq-E8TXUk80bt_4zovCMy95joixgNzMwqPBLbc3grWatl2gXwk"
              alt="Industrial pipeline infrastructure"
              className="w-full h-full object-cover grayscale opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3">
              <p className="text-xs font-bold uppercase tracking-wider text-red-900">
                Est. 1994
              </p>
              <p className="text-sm font-semibold text-neutral-900">Bangkok, Thailand</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-900 mb-3">
            Our Principles
          </p>
          <h2 className="text-3xl font-bold uppercase mb-12">How We Operate</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <article
                key={v.title}
                className="group relative bg-neutral-50 hover:bg-neutral-100 rounded-2xl p-8 transition-colors overflow-hidden"
              >
                <span className="text-[80px] font-black text-neutral-100 absolute top-2 right-4 leading-none select-none group-hover:text-neutral-200 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold uppercase text-red-900 mb-3 relative z-10">
                  {v.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed relative z-10">
                  {v.description}
                </p>
                <div className="mt-6 h-px w-10 bg-red-900 transition-all duration-300 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────── */}
      <section className="py-16 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-900 mb-3">
            Our Story
          </p>
          <h2 className="text-3xl font-bold uppercase mb-12">Engineering Heritage</h2>

          <div className="flex flex-col">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className="group flex gap-8 py-8 border-t border-neutral-200 hover:bg-neutral-50 rounded-xl px-4 transition-colors"
              >
                {/* Year */}
                <div className="min-w-[80px]">
                  <span className="text-4xl font-black text-red-900"
                    style={{ fontVariantNumeric: "tabular-nums" }}>
                    {item.year}
                  </span>
                </div>

                {/* Dot connector */}
                <div className="flex flex-col items-center gap-1 pt-2">
                  <div className="w-3 h-3 rounded-full bg-red-900 group-hover:scale-125 transition-transform" />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-neutral-200 mt-1" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <h4 className="font-bold text-neutral-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-16 bg-red-900">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold uppercase text-white mb-2">
              Ready to Work Together?
            </h2>
            <p className="text-red-200 text-sm">
              Talk to a TERKIS engineer about your next project.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link href="/products">
              <Button className=  "bg-white text-red-900 min-h-16 hover:bg-gray-200">
                View Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className=  "text-red-900 min-h-16">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}