// Run: npx tsx src/endpoints/seed/scripts/seed-faure-herman.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding FAURE HERMAN ---')
  const token = await login()
  console.log('✓ Authenticated')

  const brand = await findOrCreate('brands', 'faure-herman', { title: 'FAURE HERMAN', slug: 'faure-herman' }, token)
  const category = await findOrCreate('product-categories', 'instrument', { title: 'Instrument', slug: 'instrument' }, token)

  // 1. Heliflu TLM
  {
    console.log('Evaluating: Faure Herman Heliflu TLM...')
    const folderDir = path.join(__dirname, 'data', 'faure_herman_heliflu_tlm_flowmeter')
    const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.png'), 'Faure Herman Heliflu TLM Main Image', token)
    const galleryImageId = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_1.png'), 'Faure Herman Heliflu TLM Gallery Image', token)

    const gallery = [{ image: mainImageId }, { image: galleryImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '1/2" to 20"', unit: '', label: 'NOMINAL SIZE RANGE' },
          { title: '±0.15%', unit: '', label: 'ACCURACY' },
          { title: '< 0.02%', unit: '', label: 'REPEATABILITY' },
          { title: 'Low/Med', unit: '', label: 'VISCOSITY CAPACITY' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Space-saving custody transfer helical turbine flowmeter with integrated flow conditioner for refined hydrocarbon products.',
        items: [
          { title: 'Integrated Conditioner', body: 'Integrated flow conditioning eliminates the need for straight inlet and outlet pipe runs.' },
          { title: 'Helical Rotor', body: 'Ensures optimal torque and minimal sensitivity to velocity profiles compared to flat-bladed rotors.' },
          { title: 'Removable Cartridge', body: 'Allows verification and maintenance without removing the entire flowmeter housing.' },
          { title: 'Custody Transfer Grade', body: 'Complies with MID, ATEX, and OIML requirements for fiscal custody transfer.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Viscosity Range', value: 'Low to medium viscosity refined products (gasoline, diesel, jet fuel)' },
          { label: 'Flow Conditioning', value: 'Integrated (no straight pipe runs required)' },
          { label: 'Primary Applications', value: 'Refinery loading racks, airport refuelers, wagon/road tankers' },
          { label: 'Accuracy', value: '±0.15% over 10:1 turndown' },
          { label: 'Repeatability', value: '< 0.02%' },
          { label: 'Sizes', value: '1/2" to 20" (DN15 to DN500)' },
          { label: 'Pressure Rating', value: 'ANSI 150 to ANSI 2500' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Refinery Loading Racks', body: 'Fiscal custody transfer measurement during truck and railcar loading.', badge: 'Instrument' },
          { code: 'APP-02', title: 'Airport Refuelers', body: 'Provides compact, high-accuracy metering on mobile airport refueling trucks.', badge: 'Instrument' },
          { code: 'APP-03', title: 'Pipeline Balancing', body: 'Measures low-viscosity fuels in custody transfer pipe junctions.', badge: 'Instrument' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Heliflu TLM Turbine Flowmeter?',
        description: 'Our technical engineering team will help you select the cartridge and sizing package for your refined hydrocarbon process.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'faure-herman-heliflu-tlm-flowmeter', {
      title: 'Faure Herman Heliflu TLM Helical Turbine Flowmeter',
      slug: 'faure-herman-heliflu-tlm-flowmeter',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Space-saving custody transfer helical turbine flowmeter with integrated flow conditioner for refined hydrocarbon products.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Faure Herman Heliflu TLM | Terkis',
        description: 'Custody transfer helical turbine flowmeter with integrated flow conditioner for refined hydrocarbon products.',
        image: mainImageId
      }
    }, token)
  }

  // 2. Heliflu TZN
  {
    console.log('Evaluating: Faure Herman Heliflu TZN...')
    const folderDir = path.join(__dirname, 'data', 'faure_herman_heliflu_tzn_turbine_flowmeter')
    const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.jpg'), 'Faure Herman Heliflu TZN Main Image', token)
    const galleryImageId = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_1.png'), 'Faure Herman Heliflu TZN Gallery Image', token)

    const gallery = [{ image: mainImageId }, { image: galleryImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '1/2" to 20"', unit: '', label: 'NOMINAL SIZE RANGE' },
          { title: '±0.15%', unit: '', label: 'ACCURACY' },
          { title: '> 350', unit: 'cSt', label: 'VISCOSITY LIMIT' },
          { title: 'ASME/API', unit: '', label: 'STANDARDS COMPLIANCE' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Helical rotor turbine flowmeter custom-calibrated for high-viscosity custody transfer, master metering, and pipeline monitoring.',
        items: [
          { title: 'High Viscosity', body: 'Custom-calibrated for high-viscosity hydrocarbon transfers (greater than 350 cSt).' },
          { title: 'Ultra-High Stability', body: 'Double-rotor option compensates for high swirl and viscosity pulsations.' },
          { title: 'Rapid Maintenance', body: 'Allows full cartridge replacement and calibration checks in under 1 hour.' },
          { label: 'Flow Tuning Options', body: 'Provides Downsizing (DS) and Flexible Flowrates (FF) configurations for optimized utility.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Viscosity Range', value: 'Suitable for high viscosities (greater than 350 cSt)' },
          { label: 'Accuracy & Repeatability', value: 'Custody transfer grade, ultra-high pulse stability' },
          { label: 'Maintenance Time', value: 'Cartridge replacement in under 1 hour' },
          { label: 'Flow Tuning', value: 'DS (Downsizing) & FF (Flexible Flowrates) options' },
          { label: 'Standards Compliance', value: 'ASME, API, OIML, ATEX certifications' },
          { label: 'Accuracy', value: '±0.15% over 10:1 turndown' },
          { label: 'Repeatability', value: '< 0.02%' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Crude Oil Pipelines', body: 'Custody transfer and pipeline flow monitoring of raw crude oil.', badge: 'Instrument' },
          { code: 'APP-02', title: 'Master Metering', body: 'Acts as the reference standard master meter for calibrating other flow devices.', badge: 'Instrument' },
          { code: 'APP-03', title: 'Lubricant Blending', body: 'Precise dosing of high-viscosity base oils and fuel additives.', badge: 'Instrument' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Heliflu TZN Flowmeter?',
        description: 'Our technical team will help you size the flowmeter and calibrate it for your specific fluid viscosity.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'faure-herman-flow-meter', {
      title: 'Faure Herman High-Precision Flow Meters',
      slug: 'faure-herman-flow-meter',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Helical rotor turbine flowmeter custom-calibrated for high-viscosity custody transfer, master metering, and pipeline monitoring.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Faure Herman Heliflu TZN | Terkis',
        description: 'High-viscosity custody transfer turbine flowmeter designed for crude oil and pipeline monitoring.',
        image: mainImageId
      }
    }, token)
  }

  // 3. UF 800 Ultrasonic Flowmeter
  {
    console.log('Evaluating: Faure Herman UF 800...')
    const folderDir = path.join(__dirname, 'data', 'faure_herman_uf_800_ultrasonic_flowmeter')
    const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.png'), 'Faure Herman UF 800 Main Image', token)
    const galleryImageId = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_1.png'), 'Faure Herman UF 800 Gallery Image', token)

    const gallery = [{ image: mainImageId }, { image: galleryImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: 'Up to 10', unit: 'm', label: 'MAX PIPE DIAMETER' },
          { title: 'Up to 8', unit: 'chords', label: 'ACOUSTIC PATHS' },
          { title: 'Zero', unit: '', label: 'PRESSURE DROP' },
          { title: '18-Path', unit: '', label: 'MEASURING TECHNOLOGY' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Multi-chord transit-time ultrasonic flowmeter designed for high-accuracy flow profiling in large pipes and open channels.',
        items: [
          { title: 'Transit-Time Principle', body: 'Measures flow velocities by comparing acoustic transit times upstream and downstream.' },
          { title: 'Non-Intrusive Design', body: 'Clamp-on or wetted transducer options cause zero piping pressure drop.' },
          { title: 'Inline Maintenance', body: 'Transducers can be cleaned and serviced without draining process pipelines.' },
          { title: 'High Path Configurations', body: 'Supports up to 8 acoustic paths for complex swirl flow profile compensation.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Pipe Diameter Range', value: 'Up to 10 meters' },
          { label: 'Acoustic Paths', value: 'Up to 8 chords' },
          { label: 'Configuration', value: 'Fixed transmitter or Portable kit' },
          { label: 'Transducer Types', value: 'External clamp-on, wetted insertion, open channel mounts' },
          { label: 'Measurement Principle', value: 'Transit-time differential ultrasonic' },
          { label: 'Accuracy', value: '±0.15% over 10:1 turndown' },
          { label: 'Repeatability', value: '< 0.02%' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Large Aqueducts', body: 'Flow monitoring in municipal water transmission pipelines.', badge: 'Instrument' },
          { code: 'APP-02', title: 'Open Channel Drains', body: 'Measures high-volume waste streams in open channel outfalls.', badge: 'Instrument' },
          { code: 'APP-03', title: 'Chemical Main Headers', body: 'Non-contact flow metering of corrosive process chemicals.', badge: 'Instrument' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Faure Herman UF 800?',
        description: 'Our technical team will help you configure wetted insertion or clamp-on sensor mounts for your pipes.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'faure-herman-uf-800-ultrasonic-flowmeter', {
      title: 'Faure Herman UF 800 Ultrasonic Flowmeter',
      slug: 'faure-herman-uf-800-ultrasonic-flowmeter',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Multi-chord transit-time ultrasonic flowmeter designed for high-accuracy flow profiling in large pipes and open channels.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Faure Herman UF 800 | Terkis',
        description: 'Transit-time ultrasonic flowmeter for high-accuracy flow profiling in large pipelines and open channels.',
        image: mainImageId
      }
    }, token)
  }

  console.log('✓ FAURE HERMAN Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
