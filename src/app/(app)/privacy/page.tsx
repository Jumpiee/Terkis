const sections = [
  {
    id: "scope",
    title: "Scope of Application",
    content: `This Privacy Notice applies to all individuals who interact with Terkis Co., Ltd. ("Terkis", "we", "our", or "us"), including but not limited to contact persons, employees, authorized representatives, corporate customers, business partners, vendors, website visitors, and recipients of our services.

By accessing our website or engaging with our services, you acknowledge that you have read and understood this Privacy Notice.`,
  },
  {
    id: "collection",
    title: "Data We Collect",
    items: [
      {
        label: "Personal Identifiers",
        detail:
          "Full name, national identification number, passport number, job title, and employee ID.",
      },
      {
        label: "Contact Information",
        detail:
          "Phone numbers, email addresses, business and residential addresses.",
      },
      {
        label: "Financial Details",
        detail:
          "Bank account information, billing and payment records required for transactional purposes.",
      },
      {
        label: "Technical & Online Data",
        detail:
          "IP addresses, browser type, cookies, session data, and browsing behavior on our website.",
      },
      {
        label: "Third-Party Data",
        detail:
          "Personal data you provide about other individuals when conducting business with us.",
      },
    ],
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing",
    content: `We process personal data only where we have a lawful basis to do so. The legal grounds we rely upon include:`,
    list: [
      "Contractual necessity — to fulfill obligations under agreements with you or your organisation.",
      "Legal compliance — to meet obligations imposed by applicable laws and regulations.",
      "Legitimate interests — to operate, improve, and secure our business operations.",
      "Vital interests — to protect the life or safety of individuals where necessary.",
      "Consent — where you have explicitly agreed to specific processing activities.",
    ],
  },
  {
    id: "disclosure",
    title: "Disclosure of Personal Data",
    content:
      "We may share your personal data with the following categories of recipients only to the extent necessary for the purposes described in this Notice:",
    list: [
      "Affiliated companies and subsidiaries within the Terkis group.",
      "Third-party service providers engaged to support our operations (IT, logistics, accounting).",
      "Professional advisors such as lawyers, auditors, and insurers.",
      "Business partners involved in joint offerings or authorised distribution agreements.",
      "Government and regulatory authorities as required by law.",
      "Prospective buyers or transferees in the event of a merger, acquisition, or business sale.",
    ],
  },
  {
    id: "international",
    title: "International Data Transfers",
    content: `As an authorised distributor of products sourced from Europe and the United States, we may transfer personal data to countries outside Thailand. Where data protection standards in a recipient country differ from those in Thailand, we implement appropriate safeguards — including standard contractual clauses and equivalent legal mechanisms — to ensure your data remains protected.`,
  },
  {
    id: "retention",
    title: "Data Retention",
    content: `We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Retention periods are determined by the nature of the data, our contractual obligations, and legal requirements. When data is no longer needed, it is securely deleted or anonymised.`,
  },
  {
    id: "rights",
    title: "Your Rights",
    content:
      "Subject to applicable law, you have the following rights regarding your personal data:",
    items: [
      { label: "Access", detail: "Request a copy of the personal data we hold about you." },
      { label: "Correction", detail: "Request rectification of inaccurate or incomplete data." },
      { label: "Erasure", detail: "Request deletion of your data where there is no legitimate reason for continued processing." },
      { label: "Objection", detail: "Object to processing based on legitimate interests or for direct marketing purposes." },
      { label: "Restriction", detail: "Request that we limit the processing of your data in certain circumstances." },
      { label: "Portability", detail: "Receive your data in a structured, machine-readable format." },
      { label: "Withdrawal of Consent", detail: "Withdraw consent at any time where processing is consent-based, without affecting prior lawful processing." },
    ],
  },
  {
    id: "security",
    title: "Data Security",
    content: `We implement appropriate technical and organisational measures to protect personal data against unauthorised access, disclosure, alteration, and destruction. These measures are regularly reviewed and updated in line with industry best practices and applicable standards.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    content: `If you wish to exercise your rights, have questions about this Privacy Notice, or need to report a data concern, please contact us through the following channels:`,
    contact: {
      company: "Terkis Co., Ltd.",
      address: "Bangkok, Thailand",
      email: "contact@terkis.com",
      phone: "(+66) 02-000-0000",
    },
  },
]

export default function PrivacyNoticePage() {
  return (
    <div className="bg-neutral-50 text-neutral-900">
      {/* Hero */}
      <section className="border-b border-neutral-900 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-0.5 w-12 bg-red-900" />
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-red-900">
              Legal &amp; Compliance
            </span>
          </div>
          <h1 className="mb-6 text-4xl font-extrabold uppercase leading-tight md:text-5xl">
            Privacy <span className="text-red-900">Notice</span>
          </h1>
          <p className="max-w-2xl text-lg text-neutral-700">
            This notice describes how Terkis Co., Ltd. collects, uses, stores, and protects your
            personal data in accordance with applicable data protection legislation.
          </p>
          <p className="mt-4 text-sm text-neutral-500">Last updated: March 2024</p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="border-b border-neutral-200 bg-neutral-100 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-red-900">
            Contents
          </p>
          <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-center gap-3 text-sm font-medium text-neutral-700 hover:text-red-900"
                >
                  <span className="text-xs text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                  <span className="ml-auto h-px w-0 bg-red-900 transition-all duration-300 group-hover:w-6" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-px bg-neutral-200 divide-y divide-neutral-200">
            {sections.map((section, i) => (
              <article
                key={section.id}
                id={section.id}
                className="bg-white px-10 py-12 scroll-mt-24"
              >
                <div className="mb-6 flex items-start gap-6">
                  <span className="mt-1 text-xs font-bold text-neutral-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide">
                      {section.title}
                    </h2>

                    {section.content && (
                      <p className="mb-6 whitespace-pre-line leading-relaxed text-neutral-700">
                        {section.content}
                      </p>
                    )}

                    {section.list && (
                      <ul className="mb-6 space-y-2">
                        {section.list.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-neutral-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-red-900" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.items && (
                      <div className="grid grid-cols-1 gap-px bg-neutral-200 sm:grid-cols-2">
                        {section.items.map((item) => (
                          <div key={item.label} className="bg-neutral-50 p-6">
                            <p className="mb-2 text-sm font-bold uppercase tracking-wide text-red-900">
                              {item.label}
                            </p>
                            <p className="text-sm leading-relaxed text-neutral-700">{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.contact && (
                      <div className="mt-4 border border-neutral-200 bg-neutral-50 p-6">
                        <p className="font-bold uppercase">{section.contact.company}</p>
                        <p className="mt-1 text-neutral-700">{section.contact.address}</p>
                        <div className="mt-4 space-y-1 text-sm text-neutral-700">
                          <p>
                            <span className="font-semibold">Email:</span>{" "}
                            <a
                              href={`mailto:${section.contact.email}`}
                              className="text-red-900 hover:underline"
                            >
                              {section.contact.email}
                            </a>
                          </p>
                          <p>
                            <span className="font-semibold">Phone:</span> {section.contact.phone}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 h-px w-12 bg-red-900" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
