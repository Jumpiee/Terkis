// Run: npx tsx src/endpoints/seed/scripts/seed-3pprinz.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding 3P PRINZ ---')
  const token = await login()
  console.log('✓ Authenticated')

  const brand = await findOrCreate('brands', '3p-prinz', { title: '3P PRINZ', slug: '3p-prinz' }, token)
  const category = await findOrCreate('product-categories', 'mechanical', { title: 'Mechanical', slug: 'mechanical' }, token)

  const folderDir = path.join(__dirname, 'data', '3pprinz_cn_series_vane_pump')
  const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.png'), '3P PRINZ CN Series Vane Pump Main Image', token)
  const galleryImageId = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_1.png'), '3P PRINZ CN Series Vane Pump Gallery Image', token)

  const gallery = [{ image: mainImageId }, { image: galleryImageId }]

  const layout = [
    {
      blockType: 'statsBlock',
      blockName: 'Performance Figures',
      stats: [
        { title: 'Up to 62', unit: 'm³/h', label: 'MAX FLOW RATE' },
        { title: 'Up to 14.5', unit: 'bar', label: 'MAX DIFF PRESSURE' },
        { title: '20', unit: 'bar', label: 'MAX SYSTEM PRESSURE' },
        { title: 'Italy', unit: '', label: 'ORIGIN' }
      ]
    },
    {
      blockType: 'content',
      blockName: 'Working Principle',
      columns: [
        {
          size: 'full',
          richText: richText('The pump operates on an eccentric rotation principle. A slot-guided rotor is mounted off-center within the pump body. As the rotor turns, centrifugal force and hydraulic pressure push the self-adjusting vanes outward, keeping them in constant contact with the internal casing wall. The self-adjusting design ensures that as the vanes wear, they automatically slide outward to maintain a tight seal, preventing internal slippage.')
        }
      ]
    },
    {
      blockType: 'technicalPillars',
      blockName: 'Engineering Advantages',
      eyebrow: 'Why Choose Us',
      heading: 'Engineering Advantages',
      description: 'Italian-engineered rotary vane pumps with self-adjusting vanes for maximum longevity and efficiency.',
      items: [
        { title: 'Self-Adjusting Vanes', body: 'Automatically compensate for mechanical wear, maintaining peak volumetric efficiency over years of continuous operation.' },
        { title: 'High Suction Lift', body: 'Excellent self-priming capability allows for drawing volatile fluids from deep storage sumps or long pipeline runs.' },
        { title: 'API 676 Compliance', body: 'Available in specialized designs meeting stringent API 676 refinery specifications.' },
        { title: 'Energy Efficient', body: 'Optimized internal geometry minimizes shear and friction, leading to significantly lower power consumption.' }
      ],
      image: mainImageId
    },
    {
      blockType: 'dataSheet',
      blockName: 'Specifications Sheet',
      eyebrow: 'Technical Specs',
      heading: 'Operational Matrix',
      specs: [
        { label: 'Max Flow Rate', value: 'Up to 62 m³/h (CP Series)' },
        { label: 'Max Differential Pressure', value: 'Up to 14.5 bar (CP Series)' },
        { label: 'Max System Pressure', value: '20 bar (CN Series)' },
        { label: 'Materials', value: 'Cast Iron, Ductile Iron, Carbon Steel, Stainless Steel, Duplex/Super Duplex' },
        { label: 'Self-Priming', value: 'Yes' },
        { label: 'Compliance & Standards', value: 'ATEX Zone 1 Compliance, API 676' },
        { label: 'Origin', value: 'Italy' },
        { label: 'Sealing Options', value: 'Various mechanical seals tailored to fluid type' },
        { label: 'Temperature', value: 'Heating jackets available for high-viscosity media' }
      ]
    },
    {
      blockType: 'applicationsBlock',
      blockName: 'Applications',
      eyebrow: 'Service Conditions',
      heading: 'Industrial Applications',
      applications: [
        { code: 'APP-01', title: 'Petroleum Refineries', body: 'Reliable transfer of volatile fuel oils and hydrocarbon blending.', badge: 'Mechanical' },
        { code: 'APP-02', title: 'Chemical Terminals', body: 'Safe handling of corrosive solvents, alcohols, and aggressive acids.', badge: 'Mechanical' },
        { code: 'APP-03', title: 'Marine Loading', body: 'High-suction fuel transfer for loading and unloading operations.', badge: 'Mechanical' }
      ]
    },
    {
      blockType: 'content',
      blockName: 'Maintenance & Warranty',
      columns: [
        {
          size: 'full',
          richText: richText('Scheduled maintenance involves checking vane wear via the inspection cover. Internals are fully interchangeable. Built-in relief valves are recommended to protect the closed loop from over-pressure. Standard 12-month manufacturer warranty is provided.')
        }
      ]
    },
    {
      blockType: 'ctaBanner',
      blockName: 'CTA',
      heading: 'Need a 3P PRINZ Vane Pump?',
      description: 'Our engineering team will help you select the right configuration for your chemical process.',
      primaryLabel: 'Request a Quote',
      primaryHref: '/contact',
      secondaryLabel: 'View All Products',
      secondaryHref: '/products'
    }
  ]

  await findOrCreate('products', '3p-prinz-rotary-vane-pump', {
    title: '3P PRINZ CN Series Rotary Vane Pump',
    slug: '3p-prinz-rotary-vane-pump',
    _status: 'published',
    brand: brand.id,
    categories: [category.id],
    description: richText('Italian-made, high-efficiency positive displacement rotary vane pump designed with self-adjusting vanes for leak-free, high-suction volatile fluid transfer.'),
    gallery,
    priceInUSDEnabled: false,
    relatedProducts: [],
    layout,
    meta: {
      title: '3P PRINZ CN Series Rotary Vane Pump | Terkis',
      description: 'Italian-made, high-efficiency positive displacement rotary vane pump designed with self-adjusting vanes for leak-free, high-suction volatile fluid transfer.',
      image: mainImageId
    }
  }, token)

  console.log('✓ 3P PRINZ Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
