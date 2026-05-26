// Run: npx tsx src/endpoints/seed/scripts/seed-hitork.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding HITORK ---')
  const token = await login()
  console.log('✓ Authenticated')

  const brand = await findOrCreate('brands', 'hitork', { title: 'HITORK', slug: 'hitork' }, token)
  const category = await findOrCreate('product-categories', 'electrical', { title: 'Electrical', slug: 'electrical' }, token)

  const mainImagePath = path.resolve(__dirname, '../../../../public/media/PUMP1.png')
  const mainImageId = await uploadMedia(mainImagePath, 'HITORK Control Valve Main Image', token)

  const gallery = [{ image: mainImageId }]

  const layout = [
    {
      blockType: 'statsBlock',
      blockName: 'Key Figures',
      stats: [
        { title: 'DN 50 - 300', unit: '', label: 'NOMINAL SIZE' },
        { title: 'ANSI 150-600', unit: '', label: 'PRESSURE RATING' },
        { title: 'Equal %', unit: '', label: 'FLOW CHARACTERISTIC' },
        { title: 'Linear / EQ', unit: '', label: 'FLOW REGULATION' }
      ]
    },
    {
      blockType: 'technicalPillars',
      blockName: 'Engineering Advantages',
      eyebrow: 'Why Choose Us',
      heading: 'Engineering Advantages',
      description: 'High-performance cage-guided single-seated control valves designed for throttling pressure and flow control.',
      items: [
        { title: 'Cage Guided Trim', body: 'Cage guiding provides maximum plug stability and minimizes vibration in high pressure drop applications.' },
        { title: 'Balanced Plug Design', body: 'Reduces actuator force requirements, enabling the use of smaller, more cost-effective actuators.' },
        { title: 'Class IV / VI Leakage', body: 'Metal-to-metal or soft-seated trims provide positive shut-off options.' },
        { title: 'High Rangeability', body: 'Wide control range allows precise flow regulation across varying process demands.' }
      ],
      image: mainImageId
    },
    {
      blockType: 'dataSheet',
      blockName: 'Specifications Sheet',
      eyebrow: 'Technical Specs',
      heading: 'Operational Matrix',
      specs: [
        { label: 'Model', value: 'HITORK Cage Guided Control Valve' },
        { label: 'Nominal Diameter', value: 'DN 50 to DN 300 (2" to 12")' },
        { label: 'Pressure Rating', value: 'ANSI Class 150 / 300 / 600 / PN 16 - PN 100' },
        { label: 'Body Material', value: 'WCB Carbon Steel, CF8/CF8M Stainless Steel' },
        { label: 'Trim Material', value: 'Hardened Stainless Steel, Stellite facing optional' },
        { label: 'Actuator Type', value: 'Intelligent Electric or Pneumatic Diaphragm' }
      ]
    },
    {
      blockType: 'applicationsBlock',
      blockName: 'Applications',
      eyebrow: 'Service Conditions',
      heading: 'Industrial Applications',
      applications: [
        { code: 'APP-01', title: 'Steam Throttling', body: 'Controls high-temperature steam lines in power and heating stations.', badge: 'Electrical' },
        { code: 'APP-02', title: 'Gas Throttling', body: 'Regulates high-pressure hydrocarbon gas feeds in refineries.', badge: 'Electrical' },
        { code: 'APP-03', title: 'Water Pressure Throttling', body: 'Provides steady-state pressure relief and supply control.', badge: 'Electrical' }
      ]
    },
    {
      blockType: 'ctaBanner',
      blockName: 'CTA',
      heading: 'Need a HITORK Intelligent Control Valve?',
      description: 'Our engineering team will help you calculate the Cv flow coefficient and select the right trim materials.',
      primaryLabel: 'Request a Quote',
      primaryHref: '/contact',
      secondaryLabel: 'View All Products',
      secondaryHref: '/products'
    }
  ]

  await findOrCreate('products', 'hitork-intelligent-electric-actuator', {
    title: 'HITORK Intelligent Valve Actuators',
    slug: 'hitork-intelligent-electric-actuator',
    _status: 'published',
    brand: brand.id,
    categories: [category.id],
    description: richText('High-performance cage-guided control valve with intelligent electric or pneumatic actuation for precise throttling and flow control.'),
    gallery,
    priceInUSDEnabled: false,
    relatedProducts: [],
    layout,
    meta: {
      title: 'HITORK Intelligent Valve Actuators | Terkis',
      description: 'High-performance cage-guided single-seated control valves with intelligent actuation options.',
      image: mainImageId
    }
  }, token)

  console.log('✓ HITORK Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
