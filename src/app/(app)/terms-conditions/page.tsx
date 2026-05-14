const sections = [
  {
    id: "general",
    title: "General",
    content: `Access to and use of this Terkis Co., Ltd. site is subject to the laws of Thailand and the following terms and conditions.`,
  },
  {
    id: "copyrights",
    title: "Copyrights",
    content: `All copyrights on this site are reserved by Terkis Co., Ltd. All copyrights and other intellectual property rights in all text, images, sound, software, and other materials on this site are owned by Terkis Co., Ltd.

You are permitted to browse this site and to reproduce extracts by way of printing, downloading to a hard disk, and by distribution to other people — but in all cases, for non-commercial and personal use only. No reproduction of any part of the site may be used for the purpose of business or commercial gain, nor shall it be modified or incorporated in any other work, including but not limited to publication or website, whether in hard copy or electronic format, including posting to any other site.`,
  },
  {
    id: "trademark",
    title: "Trademark",
    content: `All trademarks displayed on this site are owned and used under license by Terkis Co., Ltd.`,
  },
  {
    id: "content",
    title: "Content",
    content: `All information on this site is for general information purposes only. It should not be relied on for any specific purpose, and no representation or warranty is given as regards its accuracy or completeness.

Neither Terkis Co., Ltd. nor its employees shall be liable for any loss, damage, or expense arising out of any access to or use of this site or any site linked to it. Terkis Co., Ltd. reserves the right to make any changes and corrections to this site as and when appropriate and without prior notice.`,
  },
  {
    id: "linked-sites",
    title: "Linked Internet Sites",
    content: `At various points throughout the site, you may be offered automatic links to other internet sites relevant to a particular aspect of this site. This does not indicate that Terkis Co., Ltd. is necessarily associated with any of these other sites or their owners.

Neither Terkis Co., Ltd. nor its employees shall have any responsibility or liability for these other sites or any information contained in them. None of the information in these other sites has been verified or endorsed by Terkis Co., Ltd.`,
  },
  {
    id: "privacy",
    title: "Privacy",
    content: `Terkis Co., Ltd. may collect information during the normal use of the site for the purpose of monitoring use of the site and helping its further development. Such collection shall not result in any personally identifiable data.`,
  },
]

export default function TermsConditionsPage() {
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
            Terms &amp; <span className="text-red-900">Conditions</span>
          </h1>
          <p className="max-w-2xl text-lg text-neutral-700">
            Please read these Terms and Conditions carefully before using this site. Access to and
            use of this site constitutes your acceptance of the following terms.
          </p>
          <p className="mt-4 text-sm text-neutral-500">Effective under the laws of Thailand</p>
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
          <div className="divide-y divide-neutral-200">
            {sections.map((section, i) => (
              <article
                key={section.id}
                id={section.id}
                className="bg-white px-10 py-12 scroll-mt-24"
              >
                <div className="flex items-start gap-6">
                  <span className="mt-1 shrink-0 text-xs font-bold text-neutral-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide">
                      {section.title}
                    </h2>
                    <p className="whitespace-pre-line leading-relaxed text-neutral-700">
                      {section.content}
                    </p>
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
