// Run: npx tsx src/endpoints/seed/scripts/seed-protectoseal.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding Protectoseal ---')
  const token = await login()
  console.log('✓ Authenticated')

  const brand = await findOrCreate('brands', 'protectoseal', { title: 'Protectoseal', slug: 'protectoseal' }, token)
  const category = await findOrCreate('product-categories', 'mechanical', { title: 'Mechanical', slug: 'mechanical' }, token)

  // 1. Protectoseal Tank Conservation Vent
  {
    console.log('Evaluating: Protectoseal Conservation Vent...')
    const mainImagePath = path.resolve(__dirname, '../../../../public/media/PS-001.png')
    const mainImageId = await uploadMedia(mainImagePath, 'Protectoseal Conservation Vent Main Image', token)

    const gallery = [{ image: mainImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '1" to 24"', unit: '', label: 'SIZE RANGE' },
          { title: 'Weight/Spring', unit: '', label: 'LOAD SETTING TYPE' },
          { title: 'ANSI/JIS', unit: '', label: 'FLANGE CONNECTION' },
          { title: 'ATEX / UL', unit: '', label: 'STANDARDS COMPLIANCE' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Weight or spring-loaded pressure and vacuum relief conservation vent to prevent tank evaporation loss.',
        items: [
          { title: 'Evaporation Control', body: 'Keeps storage tank vapors contained up to the relief set point, reducing product evaporation loss.' },
          { title: 'Dual Relief Pallets', body: 'Independent pressure and vacuum pallets protect tank structural integrity against pressure/vacuum collapse.' },
          { title: 'Cushioned Air-Seals', body: 'FEP Teflon or elastomer pallet seals ensure low leakage below the set relief point.' },
          { title: 'Corrosion Resistant', body: 'Constructed in Aluminum, Carbon Steel, 316 Stainless Steel, or Hastelloy to resist chemical attack.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Product Type', value: 'Pressure / Vacuum Relief Vent' },
          { label: 'Load Setting', value: 'Weight loaded or Spring loaded' },
          { label: 'Sizes', value: '1" (DN 25) to 24" (DN 600)' },
          { label: 'Materials', value: 'Aluminum, Carbon Steel, 316 SS, Hastelloy, FRP' },
          { label: 'Gas Groups', value: 'NEC Groups B, C, D; IEC Groups IIA, IIB, IIC' },
          { label: 'Sizing Software', value: 'PRO-FLOW III® (API 2000 compliant)' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Refinery Product Storage', body: 'Vapor management and evaporation control for high-value hydrocarbon storage tanks.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Chemical Holding Tanks', body: 'Corrosion-resistant relief protection for chemical tanks.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Vapor Recovery Loops', body: 'Integrates relief loops in tank farm vapor collection headers.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Protectoseal Conservation Vent?',
        description: 'Our technical engineering team will help you calculate breathing requirements and set points using PRO-FLOW III®.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'protectoseal-flame-arrester', {
      title: 'Protectoseal Flame Arresters & Conservation Vents',
      slug: 'protectoseal-flame-arrester',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Weight or spring-loaded pressure and vacuum relief conservation vent to prevent evaporation loss.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Protectoseal Conservation Vents | Terkis',
        description: 'Pressure and vacuum relief conservation vent to prevent product evaporation and tank rupture.',
        image: mainImageId
      }
    }, token)
  }

  // 2. Protectoseal Emergency Pressure Relief Vent
  {
    console.log('Evaluating: Protectoseal Emergency Vent...')
    const mainImagePath = path.resolve(__dirname, '../../../../public/media/PS-002.png')
    const mainImageId = await uploadMedia(mainImagePath, 'Protectoseal Emergency Vent Main Image', token)

    const gallery = [{ image: mainImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '1" to 24"', unit: '', label: 'SIZE RANGE' },
          { title: 'NFPA 30', unit: '', label: 'COMPLIANCE STANDARD' },
          { title: 'High Volume', unit: '', label: 'VENTING CAPACITY' },
          { title: 'Weighted', unit: '', label: 'PALLET OPERATION' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Emergency relief vent to prevent tank rupture caused by fire exposure vapor generation.',
        items: [
          { title: 'Fire Exposure Venting', body: 'Designed to release large vapor volumes generated when a storage tank is exposed to external fire.' },
          { title: 'Automatic Resetting', body: ' Pallet lifts under pressure and reseats automatically once the pressure drops back to safe levels.' },
          { title: 'Safety Compliance', body: 'Fully complies with NFPA 30 and API 2000 emergency venting regulations.' },
          { title: 'Sturdy Pallet Guide', body: 'Stainless steel stem and guide post assure reliable pallet lift and alignment.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Compliance', value: 'NFPA 30 (Emergency Relief Venting for Fire Exposure)' },
          { label: 'Application', value: 'Emergency pressure relief for aboveground storage tanks' },
          { label: 'Venting Capacity', value: 'Sized to release large vapor volumes' },
          { label: 'Operation', value: 'Weighted pallet assembly' },
          { label: 'Sizes', value: '1" (DN 25) to 24" (DN 600)' },
          { label: 'Materials', value: 'Aluminum, Carbon Steel, 316 SS, Hastelloy, FRP' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Tank Fire Safety', body: 'Emergency venting on bulk fuel storage tanks containing volatile hydrocarbons.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Solvent Bulk Tanks', body: 'Prevents catastrophic tank rupture in solvent plant yards.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Refinery Tank Farms', body: 'Mandatory safety relief loop on high-volume refinery process tanks.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Protectoseal Emergency Vent?',
        description: 'Our technical engineering team will calculate the emergency venting area required for your aboveground tanks.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'protectoseal-emergency-pressure-relief-vent', {
      title: 'Protectoseal Emergency Pressure Relief Vent',
      slug: 'protectoseal-emergency-pressure-relief-vent',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Emergency relief vent to prevent tank rupture caused by fire exposure vapor generation.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Protectoseal Emergency Pressure Relief Vent | Terkis',
        description: 'Emergency pressure relief vent complying with NFPA 30 standards for bulk storage tanks.',
        image: mainImageId
      }
    }, token)
  }

  // 3. Protectoseal In-Line Detonation Flame Arrester
  {
    console.log('Evaluating: Protectoseal In-Line Arrester...')
    const mainImagePath = path.resolve(__dirname, '../../../../public/media/PS-003.png')
    const mainImageId = await uploadMedia(mainImagePath, 'Protectoseal Detonation Arrester Main Image', token)

    const gallery = [{ image: mainImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '1" to 24"', unit: '', label: 'SIZE RANGE' },
          { title: 'Detonation', unit: '', label: 'SAFETY RATING' },
          { title: 'EN ISO 16852', unit: '', label: 'COMPLIANCE CODE' },
          { title: 'Min Drop', unit: '', label: 'PRESSURE LOSS DESIGN' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Premium flame arrester stopping deflagrations and unstable detonations with minimal pressure drop.',
        items: [
          { title: 'Detonation Prevention', body: 'Stops both low-speed deflagrations and high-velocity unstable detonations in pipelines.' },
          { title: 'Crimped Metal Element', body: 'Precision crimped ribbon element quenches flame front heat below ignition temperatures.' },
          { title: 'E-Flow® Technology', body: 'Optimized internal design provides superior flame quenching with minimal piping pressure drop.' },
          { title: 'Bi-Directional Arrest', body: 'Arrests flame fronts approaching from either direction in manifold piping.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'System Type', value: 'In-line unstable detonation flame arrester' },
          { label: 'Application', value: 'Vapor recovery and manifold lines' },
          { label: 'Function', value: 'Arrests deflagrations, stable and unstable detonations' },
          { label: 'Safety Rating', value: 'Detonation level safety certification' },
          { label: 'Sizes', value: '1" (DN 25) to 24" (DN 600)' },
          { label: 'Materials', value: 'Aluminum, Carbon Steel, 316 SS, Hastelloy, FRP' },
          { label: 'Compliance Standards', value: 'EN ISO 16852, ATEX, UL, FM' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Vapor Recovery Lines', body: 'Prevents flashback propagation inside vapor return piping runs.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Manifold Flaring Systems', body: 'Critical safety buffer on waste gas flare header entry lines.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Combustible Vent Piping', body: 'Inline protection on process lines venting group B/C/D combustible vapors.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Protectoseal Detonation Flame Arrester?',
        description: 'Our technical engineering team will size the flame arrester element to comply with EN ISO 16852 pressure limits.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'protectoseal-inline-detonation-flame-arrester', {
      title: 'Protectoseal In-Line Unstable Detonation Flame Arrester',
      slug: 'protectoseal-inline-detonation-flame-arrester',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Premium flame arrester stopping deflagrations and unstable detonations with minimal pressure drop.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Protectoseal In-Line Detonation Arrester | Terkis',
        description: 'Premium in-line detonation flame arrester with E-Flow® technology for vapor recovery safety.',
        image: mainImageId
      }
    }, token)
  }


  console.log('✓ Protectoseal Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
