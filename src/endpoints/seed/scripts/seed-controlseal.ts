// Run: npx tsx src/endpoints/seed/scripts/seed-controlseal.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding CONTROLSEAL ---')
  const token = await login()
  console.log('✓ Authenticated')

  const brand = await findOrCreate('brands', 'control-seal', { title: 'Control Seal', slug: 'control-seal' }, token)
  const category = await findOrCreate('product-categories', 'mechanical', { title: 'Mechanical', slug: 'mechanical' }, token)

  // 1. Double Block and Bleed Valve (DBBV)
  {
    console.log('Evaluating: Control Seal DBBV Valve...')
    const folderDir = path.join(__dirname, 'data', 'controlseal_dbbv_valve')
    const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.png'), 'Control Seal DBBV Valve Main Image', token)
    const galleryImageId = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_1.png'), 'Control Seal DBBV Valve Gallery Image', token)

    const gallery = [{ image: mainImageId }, { image: galleryImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '1" to 48"', unit: '', label: 'SIZE RANGE' },
          { title: 'Class 150-2500', unit: '#', label: 'PRESSURE CLASS' },
          { title: '−196 / +250', unit: '°C', label: 'TEMPERATURE RANGE' },
          { title: 'API 6D', unit: '', label: 'DESIGN STANDARDS' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Non-lubricated expanding plug valve featuring double block and bleed operation for provable zero-leakage isolation in critical hydrocarbon networks.',
        items: [
          { title: 'Double Block and Bleed', body: 'Provides complete isolation on both upstream and downstream sides with a bleeder valve for verification.' },
          { title: 'Expanding Plug Design', body: 'Linear mechanical sealing action eliminates seal friction and wear during rotation.' },
          { title: 'Zero Leakage', body: 'Meets the most stringent leakage standards including API 6D and API 598.' },
          { title: 'Low Fugitive Emissions', body: 'Tested and certified compliant with ISO 15848 and Shell MESC SPE 77-312.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Specs',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Size Range', value: '1" to 48"' },
          { label: 'Pressure Class', value: 'ASME Class 150# to 2500#' },
          { label: 'Temperature Range', value: '-196°C to +250°C' },
          { label: 'Bore Type', value: 'Fullbore or Reduced Bore' },
          { label: 'Design Standards', value: 'API 6D, ASME B16.34, API 598' },
          { label: 'Operation', value: 'Manual handwheel, bevel gear, or automated actuator' },
          { label: 'Fugitive Emissions', value: 'ISO 15848 and Shell MESC SPE 77-312 compliant' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Metering Stations', body: 'Zero-leakage calibration isolation for fiscal custody transfer systems.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Refinery Product Blending', body: 'Prevents product cross-contamination in refinery manifold lines.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Airport Fuelling Systems', body: 'Ensures positive isolation in critical fuel hydrant piping loops.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Control Seal DBBV?',
        description: 'Our technical team will help you configure wetted materials and actuator packages for your processes.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'controlseal-dbbv-valve', {
      title: 'Control Seal Double Block and Bleed Valve (DBBV)',
      slug: 'controlseal-dbbv-valve',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Non-lubricated expanding plug valve featuring double block and bleed operation for provable zero-leakage isolation in critical hydrocarbon networks.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Control Seal Double Block and Bleed Valve | Terkis',
        description: 'Expanding plug valve with double block and bleed operation for zero-leakage isolation in pipelines.',
        image: mainImageId
      }
    }, token)
  }

  // 2. Rising Stem Ball Valve (RSBV)
  {
    console.log('Evaluating: Control Seal RSBV Valve...')
    const folderDir = path.join(__dirname, 'data', 'controlseal_rsbv_valve')
    const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.png'), 'Control Seal RSBV Valve Main Image', token)
    const galleryImageId = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_1.png'), 'Control Seal RSBV Valve Gallery Image', token)

    const gallery = [{ image: mainImageId }, { image: galleryImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '1" to 36"', unit: '', label: 'SIZE RANGE' },
          { title: 'Class 150-2500', unit: '#', label: 'PRESSURE CLASS' },
          { title: '−196 / +538', unit: '°C', label: 'TEMPERATURE RANGE' },
          { title: 'Metal-to-Metal', unit: '', label: 'SEATING MATERIAL' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Metal-to-metal rising stem ball valve designed for extreme industrial applications, eliminating seat friction and wear during rotation.',
        items: [
          { title: 'No-Rub Operation', body: 'The stem rises to tilt the ball away from the seat prior to turning, eliminating seat wear and friction.' },
          { title: 'Metal-to-Metal Seating', body: 'Engineered for high-temperature and abrasive service conditions up to +538°C.' },
          { title: 'Single-Seat Design', body: 'Prevents pressure build-up in the valve cavity, enhancing operational safety.' },
          { title: 'Fire-Safe Certified', body: 'Fully certified fire-safe design according to API 607 and API 6FA standards.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Specs',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Size Range', value: '1" to 36"' },
          { label: 'Pressure Class', value: 'ASME Class 150# to 2500#' },
          { label: 'Temperature Range', value: '-196°C to +538°C' },
          { label: 'Seating Material', value: 'Metal-to-metal wetted seats' },
          { label: 'Design Compliance', value: 'ASME B16.34, API 6D, API 607 (Fire-Safe)' },
          { label: 'Bore Type', value: 'Full Bore (piggable) or Reduced Bore' },
          { label: 'Fugitive Emissions', value: 'ISO 15848 and Shell MESC SPE 77-312 compliant' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Molecular Sieve Dehydrators', body: 'High cycling and thermal switching service in gas drying towers.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Emergency ESD Valves', body: 'Critical fail-safe emergency shutdown systems in offshore oil platforms.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Hot Oil Isolation', body: 'Handles heat transfer fluids and hot bitumen streams up to +538°C.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Control Seal RSBV?',
        description: 'Our engineering team will help you configure wetted overlays and high-temperature actuators.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'controlseal-rsbv-valve', {
      title: 'Control Seal Rising Stem Ball Valve (RSBV)',
      slug: 'controlseal-rsbv-valve',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Metal-to-metal rising stem ball valve designed for extreme industrial applications, eliminating seat friction and wear during rotation.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Control Seal Rising Stem Ball Valve | Terkis',
        description: 'Rising stem ball valve with friction-free metal seating for high-temperature and high-cycle service.',
        image: mainImageId
      }
    }, token)
  }

  console.log('✓ CONTROLSEAL Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
