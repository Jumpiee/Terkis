// Run: npx tsx src/endpoints/seed/scripts/seed-dixon-ads.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding DIXON ADS ---')
  const token = await login()
  console.log('✓ Authenticated')

  const brand = await findOrCreate('brands', 'dixon', { title: 'DIXON', slug: 'dixon' }, token)
  const category = await findOrCreate('product-categories', 'instrument', { title: 'Instrument', slug: 'instrument' }, token)

  const mainImagePath = path.resolve(__dirname, '../../../../public/media/DIXON.jpg')
  const mainImageId = await uploadMedia(mainImagePath, 'Dixon ADS Overfill Rack Monitor Main Image', token)

  const gallery = [{ image: mainImageId }]

  const layout = [
    {
      blockType: 'statsBlock',
      blockName: 'Key Figures',
      stats: [
        { title: 'API/EN13922', unit: '', label: 'STANDARDS COMPLIANCE' },
        { title: 'Up to 8', unit: 'sensors', label: 'CHANNEL CAPACITY' },
        { title: 'Fail-Safe', unit: '', label: 'INTEGRITY DESIGN' },
        { title: 'ATEX / IECEx', unit: '', label: 'HAZARDOUS APPROVAL' }
      ]
    },
    {
      blockType: 'technicalPillars',
      blockName: 'Engineering Advantages',
      eyebrow: 'Why Choose Us',
      heading: 'Engineering Advantages',
      description: 'Advanced rack monitor system providing fail-safe overfill prevention during terminal loading.',
      items: [
        { title: 'Multi-Channel Support', body: 'Capable of monitoring up to 8 2-wire optic, 5-wire optic, or thermistor sensors simultaneously.' },
        { title: 'Interlock Systems', body: 'Integrated dry contact relays prevent loading pump start until ground and overfill checks pass.' },
        { title: 'Diagnostic LED Display', body: 'Provides real-time local channel indicators for quick sensor fault troubleshooting.' },
        { title: 'Heavy-Duty Housing', body: 'Explosion-proof aluminum enclosure designed to withstand refinery atmospheres.' }
      ],
      image: mainImageId
    },
    {
      blockType: 'dataSheet',
      blockName: 'Specifications Sheet',
      eyebrow: 'Technical Data',
      heading: 'Operational Matrix',
      specs: [
        { label: 'Series', value: 'Dixon ADS Series' },
        { label: 'Application', value: 'Terminal overfill protection and ground verification' },
        { label: 'Compliance Standards', value: 'API RP1004, EN13922' },
        { label: 'Housing Rating', value: 'Explosion-proof Class I, Division 1 / IP66' },
        { label: 'Temperature Range', value: '-40°F to 140°F (-40°C to 60°C)' },
        { label: 'Input Power', value: '120/240 VAC, 50/60 Hz' }
      ]
    },
    {
      blockType: 'applicationsBlock',
      blockName: 'Applications',
      eyebrow: 'Service Conditions',
      heading: 'Industrial Applications',
      applications: [
        { code: 'APP-01', title: 'Tank Truck Loading', body: 'Ensures overfill safety at bottom-loading petroleum terminals.', badge: 'Instrument' },
        { code: 'APP-02', title: 'Railcar Terminals', body: 'Grounds and monitors multi-compartment chemical railcar transfers.', badge: 'Instrument' },
        { code: 'APP-03', title: 'Marine Bunkering', body: 'Fail-safe high level alarm loops on marine terminal docks.', badge: 'Instrument' }
      ]
    },
    {
      blockType: 'ctaBanner',
      blockName: 'CTA',
      heading: 'Need a Dixon ADS Overfill Protection Monitor?',
      description: 'Our technical team will help you integrate the rack monitor with your terminal control system.',
      primaryLabel: 'Request a Quote',
      primaryHref: '/contact',
      secondaryLabel: 'View All Products',
      secondaryHref: '/products'
    }
  ]

  await findOrCreate('products', 'dixon-ads-overfill-monitor', {
    title: 'Dixon ADS Overfill Protection Rack Monitor',
    slug: 'dixon-ads-overfill-monitor',
    _status: 'published',
    brand: brand.id,
    categories: [category.id],
    description: richText('Rack monitor for overfill protection and ground verification in tank truck and railcar loading installations.'),
    gallery,
    priceInUSDEnabled: false,
    relatedProducts: [],
    layout,
    meta: {
      title: 'Dixon ADS Overfill Protection Rack Monitor | Terkis',
      description: 'Fail-safe overfill protection and ground verification rack monitor complying with API and EN standards.',
      image: mainImageId
    }
  }, token)

  console.log('✓ DIXON ADS Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
