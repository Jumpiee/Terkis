// Run: npx tsx src/endpoints/seed/scripts/seed-product-test.ts
const BASE_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
const EMAIL = process.env.SEED_EMAIL ?? 'ai@hotmail.com'
const PASSWORD = process.env.SEED_PASSWORD ?? 'admin1234'

async function api(method: 'GET' | 'POST' | 'PATCH', path: string, body?: unknown, token?: string) {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `JWT ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(`[${method} ${path}] ${res.status}: ${JSON.stringify(json)}`)
  return json
}
async function login(): Promise<string> {
  const data = await api('POST', '/users/login', { email: EMAIL, password: PASSWORD })
  if (!data?.token) throw new Error('Login failed')
  return data.token
}
async function findOrCreate(collection: string, slug: string, createData: Record<string, unknown>, token: string): Promise<{ id: string | number }> {
  const params = new URLSearchParams({ 'where[slug][equals]': slug })
  const res = await api('GET', `/${collection}?${params}`, undefined, token)
  if (res.docs?.length > 0) return res.docs[0]
  const created = await api('POST', `/${collection}`, createData, token)
  return created.doc ?? created
}
function richText(text: string) {
  return { root: { type: 'root', version: 1, direction: 'ltr' as const, format: '' as const, indent: 0,
    children: [{ type: 'paragraph', version: 1, direction: 'ltr' as const, format: '' as const,
      indent: 0, textFormat: 0, textStyle: '',
      children: [{ type: 'text', version: 1, detail: 0, format: 0, mode: 'normal' as const, style: '', text }] }] } }
}

async function main() {
  console.log(`\nSeeding Klaus Union → ${BASE_URL}\n`)
  const token = await login()
  console.log('✓ Authenticated')

  const brand = await findOrCreate('brands', 'klaus-union', { title: 'Klaus Union', slug: 'klaus-union' }, token)
  console.log(`✓ Brand: Klaus Union (id: ${brand.id})`)

  const category = await findOrCreate('product-categories', 'mechanical', { title: 'Mechanical', slug: 'mechanical' }, token)
  console.log(`✓ Category: Mechanical (id: ${category.id})`)

  const layout = [
    {
      blockType: 'statsBlock',
      blockName: 'Key Performance Figures',
      stats: [
        { title: '3,500', unit: 'm³/h', label: 'Max Flow Rate' },
        { title: '470', unit: 'm LC', label: 'Max Delivery Head' },
        { title: 'PN 400', unit: '', label: 'Pressure Rating' },
        { title: '−120 / +550', unit: '°C', label: 'Temperature Range' },
      ],
    },
    {
      blockType: 'dataSheet',
      blockName: 'Technical Specifications',
      eyebrow: 'Technical Data',
      heading: 'Operational Matrix',
      specs: [
        { label: 'Max Flow Rate', value: 'Up to 3,500 m³/h' },
        { label: 'Max Delivery Head', value: 'Up to 470 m LC (multi-stage higher)' },
        { label: 'Pressure Rating', value: 'Up to PN 400 (5,800 psi)' },
        { label: 'Temperature Range', value: '−120 °C to +450 °C (+550 °C optional)' },
        { label: 'Materials', value: 'Stainless Steel, Duplex, Hastelloy®, Titanium' },
        { label: 'Design Standards', value: 'DIN EN ISO 15783, API 685' },
        { label: 'Pump Series', value: 'SLM NV, SLM AP, SLM GV, SLM SV, SLM NVT, NOV' },
        { label: 'Seal Type', value: 'Sealless magnetic drive / Mechanical seal (NOV series)' },
      ],
    },
    {
      blockType: 'comparisonTable',
      blockName: 'Model Series Comparison',
      eyebrow: 'Product Range',
      heading: 'Select Your Series',
      columns: [
        { code: 'SLM-NV', label: 'SLM NV', sub: 'ISO Sealless' },
        { code: 'SLM-AP', label: 'SLM AP', sub: 'API 685' },
        { code: 'SLM-GV', label: 'SLM GV', sub: 'Multi-Stage' },
        { code: 'SLM-SV', label: 'SLM SV', sub: 'Side Channel' },
        { code: 'SLM-NVT', label: 'SLM NVT', sub: 'Submerged' },
      ],
      rows: [
        { param: 'Max Flow Rate', values: [{ cell: '3,500 m³/h' }, { cell: '3,500 m³/h' }, { cell: '300 m³/h' }, { cell: '42 m³/h' }, { cell: '3,500 m³/h' }] },
        { param: 'Max Delivery Head', values: [{ cell: '220 m LC' }, { cell: '220 m LC' }, { cell: '2,200 m LC' }, { cell: '470 m LC' }, { cell: '220 m LC' }] },
        { param: 'Temperature Range', values: [{ cell: '−200 to +550 °C' }, { cell: '−200 to +550 °C' }, { cell: '−120 to +350 °C' }, { cell: '−120 to +250 °C' }, { cell: '−40 to +200 °C' }] },
        { param: 'Max Pressure', values: [{ cell: 'PN 400' }, { cell: 'PN 400' }, { cell: 'PN 250' }, { cell: 'PN 400' }, { cell: 'PN 63' }] },
        { param: 'Standard', values: [{ cell: 'ISO 2858 / 15783' }, { cell: 'API 685' }, { cell: 'ISO 15783 / API 685' }, { cell: 'ISO 15783' }, { cell: 'ISO 2858 / 15783' }] },
      ],
    },
    {
      blockType: 'applicationsBlock',
      blockName: 'Industrial Applications',
      eyebrow: 'Service Conditions',
      heading: 'Industrial Applications',
      applications: [
        { code: 'APP-01', title: 'Chemical Processing', body: 'Hermetically sealed transfer of aggressive acids, solvents, and toxic chemicals with zero emission to atmosphere.', badge: 'Mechanical' },
        { code: 'APP-02', title: 'Oil, Gas & Petrochemical', body: 'API 685 compliant pumps for crude oil, LPG, and refined product transfer in upstream and downstream operations.', badge: 'Mechanical' },
        { code: 'APP-03', title: 'Cryogenic Service', body: 'Specialized models handle liquid nitrogen, LNG, and other cryogenic media down to −200 °C without seal failure.', badge: 'Mechanical' },
        { code: 'APP-04', title: 'High-Temperature Service', body: 'Thermal oil, molten sulfur, and hot process streams up to +550 °C with heated containment shell options.', badge: 'Mechanical' },
      ],
    },
    {
      blockType: 'ctaBanner',
      blockName: 'Request Quote CTA',
      heading: 'Need a Sealless Pump for Your Process?',
      description: 'Our engineering team will help you select the right Klaus Union series for your fluid, pressure, and temperature requirements.',
      primaryLabel: 'Request a Quote',
      primaryHref: '/contact',
      secondaryLabel: 'View All Products',
      secondaryHref: '/products',
    },
  ]

  const product = await api('POST', '/products', {
    title: 'Klaus Union Sealless Magnetic Drive Pumps',
    slug: 'klaus-union-magnetic-drive-pump',
    _status: 'published',
    brand: brand.id,
    categories: [category.id],
    description: richText("Klaus Union is a global leader and pioneer in sealless pump technology, having introduced the world's first magnetic drive pump in 1955. These pumps are designed for the hermetically sealed handling of hazardous, aggressive, or high-value fluids where zero leakage is mandatory. By replacing traditional mechanical seals with a magnetic coupling and a static containment shell, Klaus Union ensures absolute safety for personnel and the environment, even in the most extreme temperature and pressure conditions."),
    gallery: [],
    priceInUSDEnabled: false,
    relatedProducts: [],
    layout,
    meta: {
      title: 'Klaus Union Sealless Magnetic Drive Pumps | Terkis',
      description: 'Zero-leakage sealless magnetic drive pumps for hazardous, aggressive, and high-value fluids. API 685 compliant. Up to 3,500 m³/h, PN 400 rated.',
    },
  }, token)

  console.log(`✓ Product created: "${product.doc?.title}" (id: ${product.doc?.id})`)
  console.log(`\n  Preview: ${BASE_URL}/products/klaus-union-magnetic-drive-pump\n`)
}

main().catch((err) => { console.error('\n✗ Seed failed:', err.message); process.exit(1) })
