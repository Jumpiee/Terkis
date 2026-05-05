import Image from "next/image"
import PartnersGrid from "@/components/PartnerGrid/page"

const pillars = [
  {
    title: "Technical Excellence",
    description:
      "Our engineering team provides deep-domain expertise in thermodynamic simulation and flow dynamics to ensure optimal hardware selection.",
  },
  {
    title: "Global Sourcing",
    description:
      "Direct partnerships with Tier-1 European and American manufacturers, ensuring genuine parts and direct-from-factory reliability.",
  },
  {
    title: "Compliance First",
    description:
      "Strict adherence to ASME, API, and ISO standards. Every component is supplied with full traceability and performance certification.",
  },
]

const categories = [
  {
    title: "Advanced Pumping Systems",
    description: "Centrifugal, positive displacement, and vacuum solutions for volatile fluids.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIEFalUGxusGZnWk1jBKqqBdnZdjU4PfbLjH4wlZXjcouYvfwCU6_mMSVFtrhlMyFQX9kKl_WshJJNaa5Y1ZwCP4ywsU_E2XnMTFbCxtHb6BjfJI9lwUMX2YeS_LwhDNxEzNXyvNuifeAnFfiLfGhWBdTpk5yswR1xGukRi2MpODBzAF5meKVemm0a2-IuGczzyo_DRLRpiLngEiGbP8cayjMQn0H6HqjsJWwnfnL1J8Jsj0y0JWh5r_y0-uuIcIQeMCYgNH5_gjs",
    alt: "Heavy-duty centrifugal pump assembly",
  },
  {
    title: "Pressure Management",
    description:
      "Safety relief valves, regulators, and bursting discs for high-pressure environments.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKoz5gHndWXh5_3oy-EIPO-532FWLFESOSHBJb_lwVAN8QhdlBaE2gP-TdEgwEX9ld9U-GTLt-vQecDerBRtAUcpmZlp8u8aUisXQ-e9R1XcCutPz4yV49FiqWDUOGJsAOIugxdo78ol51ZSQPopXeECcDB-Grbf4LStLX0YAdDLdmayGpRjAAzQsniB_BMeFbtN842Mc1HuWWkt_qEp3tMYQZZJkl5BbnoAzq_SIOt9a9oUJggWxU7R77gw8ystaTXdvOH5h0aVY",
    alt: "Industrial pressure relief valve with brass fittings",
  },
  {
    title: "Industrial Sealing",
    description: "Mechanical seals and gaskets designed for extreme temperature and pH variations.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDDb-MMmeocsZZEng578yPflwCU1dWY3SW_FSzWRd-9K0CwDEgiNkmgyTOc_2YYsGxVKXq-IY4EQ_2AHJt8wgfGF38znes6bl4ZI-CUD93yQgD7X6mpZ70gttzbMt3MoCP0rOHKVFmT6rnoyWyVXzYd0TXRlvuvEI_OVgbLlSRySU5fftQuCm-jKSxOjormhNMqkZsOTjgbjM1ZnIgqm3AcBHX--P5-QAMGJvm3HzUwk3vgj4Hw7EDMe6okQTKJJJiPMq4P81Lg_Q",
    alt: "Industrial mechanical seals and circular graphite gaskets",
  },
]

export default function Page() {
  return (
    <div className="bg-neutral-50 text-neutral-900">
    

      <main>
        <section id="solutions" className="relative overflow-hidden border-b border-neutral-900">
          <div className="absolute inset-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2AtGfT9ErBSi2r-BW9xyaoPmerBMO9YU99zvWZmf6nAxQoTC0QKWcjG5NkFMGj-nxRWnAzxiK9RIfnONT_lR9Zs30BHBgHklT3GO8HgjgwP4PI-aJFJRDB8LSW2Txc0xpB4G8YW-_1KQXSJTYKUkf_o9TABPnFGRXOXIsbQuGk9kgyUOi1yslnLidrIfeIhcbt22SybhakBmUNagzwOZrcK_oKXq-E8TXUk80bt_4zovCMy95joixgNzMwqPBLbc3grWatl2gXwk"
              alt="Industrial piping infrastructure with valves and conduits"
              className="h-full w-full object-cover grayscale opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 via-neutral-50/90 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto grid min-h-[42rem] max-w-7xl grid-cols-12 gap-8 px-6 py-16">
            <div className="col-span-12 lg:col-span-8">
              <div className="mb-6 flex items-center gap-4">
                <span className="h-0.5 w-12 bg-red-900" />
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-red-900">System Integrity: 99.9%</span>
              </div>
              <h1 className="mb-8 max-w-4xl text-4xl font-extrabold uppercase leading-tight md:text-5xl">
                Precision Engineering for <span className="text-red-900">Critical Flow</span> Infrastructure
              </h1>
              <p className="mb-10 max-w-2xl text-lg text-neutral-700">
                Specializing in zero-failure fluid control systems for petrochemical, energy, and heavy industrial sectors.
              </p>
              <div className="flex flex-wrap gap-4">
                <button type="button" className="bg-red-900 px-8 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-red-800 rounded-md cursor-pointer">
                  Explore Technical Specs
                </button>
                <button type="button" className="border border-neutral-900 px-8 py-4 text-xs font-bold uppercase tracking-[0.12em] hover:bg-neutral-200 rounded-md cursor-pointer">
                  Download Capability Profile
                </button>
              </div>
            </div>

            <div className="col-span-12 hidden border-l border-neutral-300 pl-8 lg:col-span-4 lg:flex lg:flex-col lg:justify-center">
              <div className="space-y-10">
                <div>
                  <p className="text-2xl font-semibold text-red-900">30+ YEARS</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-600">Engineering Heritage</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-red-900">ZERO</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-600">Reported System Failures</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-red-900">GLOBAL</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-600">Sourcing Network</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="excellence" className="border-b border-neutral-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <article
                key={pillar.title}
                id={pillar.title === "Global Sourcing" ? "sourcing" : undefined}
                className={`group p-10 hover:bg-neutral-100 ${i < pillars.length - 1 ? "border-b md:border-b-0 md:border-r border-neutral-200" : ""}`}
              >
                <h3 className="mb-4 text-2xl font-bold uppercase">{pillar.title}</h3>
                <p className="text-neutral-700">{pillar.description}</p>
                <div className="mt-8 h-1 w-12 bg-red-900 transition-all duration-300 group-hover:w-full" />
              </article>
            ))}
          </div>
        </section>

        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-red-900">System Components</p>
                <h2 className="text-3xl font-bold uppercase">Mission-Critical Categories</h2>
              </div>
              <span className="hidden text-sm text-neutral-500 md:block">CAT_INDEX_v2.04</span>
            </div>

            <div className="grid grid-cols-1 gap-px bg-neutral-900 md:grid-cols-3">
              {categories.map((category) => (
                <article key={category.title} className="group bg-white p-8">
                  <div className="mb-12">
                    <h4 className="mb-2 text-2xl font-bold uppercase">{category.title}</h4>
                    <p className="mb-6 text-neutral-700">{category.description}</p>
                    <span className="border-b border-red-900 pb-1 text-xs font-bold uppercase tracking-[0.12em] text-red-900">
                      View Specifications
                    </span>
                  </div>
                  <div className="h-64 grayscale transition-all duration-500 group-hover:grayscale-0">
                    <img src={category.image} alt={category.alt} className="h-full w-full object-contain" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="heritage" className="border-y border-neutral-200 bg-neutral-100 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center"> 
            <h2 className="text-3xl font-bold uppercase tracking-wide">Our Partner</h2>
          </div>

          <PartnersGrid></PartnersGrid>
        </div>
      </section>
      </main>
    </div>
  )
}