// Run: npx tsx src/endpoints/seed/scripts/seed-saer.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding SAER ---')
  const token = await login()
  console.log('✓ Authenticated')

  const brand = await findOrCreate('brands', 'saer', { title: 'SAER', slug: 'saer' }, token)
  const category = await findOrCreate('product-categories', 'mechanical', { title: 'Mechanical', slug: 'mechanical' }, token)

  const mainImagePath = path.resolve(__dirname, '../../../../public/media/SAER.png')
  const mainImageId = await uploadMedia(mainImagePath, 'SAER Pump Main Image', token)

  const gallery = [{ image: mainImageId }]

  // 1. SAER IR close-coupled centrifugal pump
  {
    console.log('Evaluating: SAER IR Close-Coupled...')

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: 'Up to 90', unit: 'kW', label: 'MOTOR POWER P2' },
          { title: '2 & 4 Poles', unit: '', label: 'MOTOR POLES' },
          { title: 'Up to 700', unit: 'm', label: 'MAX HEAD' },
          { title: 'Up to 450', unit: 'm³/h', label: 'MAX SURFACE FLOW' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'End-suction close-coupled centrifugal pump with high-efficiency 2 & 4 poles motors up to 90kW.',
        items: [
          { title: 'Close-Coupled Design', body: 'Compact monoblock configuration reduces footprint and eliminates shaft alignment issues.' },
          { title: 'Made in Italy', body: '100% manufactured in Italy with premium cast iron, bronze, or stainless steel components.' },
          { title: 'High Flow Output', body: 'Capable of supplying up to 450 m³/h, ideal for high-volume utility networks.' },
          { title: 'IP 55 Protection', body: 'Surface motor features standard IP55 dust and water ingress protection.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Motor Power', value: 'Up to 90 kW' },
          { label: 'Motor Poles', value: '2 & 4 Poles models' },
          { label: 'Configuration', value: 'Close-coupled End-suction' },
          { label: 'Applications', value: 'Water supply, agriculture, building utilities' },
          { label: 'Max Head', value: 'Up to 700 m' },
          { label: 'Max Flow Rate', value: 'Up to 450 m³/h (Surface) / 300 m³/h (Submersible)' },
          { label: 'Temperature Range', value: '-15°C to +70°C (Standard); up to +120°C (Optional)' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Water Utility Mains', body: 'Booster systems and mains distribution for clean municipal water.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'HVAC Circulation', body: 'Industrial heating, cooling, and utility water recirculation loops.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Agricultural Irrigation', body: 'High-volume sprinkler and flood irrigation water supplies.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a SAER IR Centrifugal Pump?',
        description: 'Our technical engineering team will help you size the flow capacity and select wetted end materials.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'saer-centrifugal-water-pump', {
      title: 'SAER Centrifugal & Submersible Water Pumps',
      slug: 'saer-centrifugal-water-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('End-suction close-coupled centrifugal pump with high-efficiency 2 & 4 poles motors up to 90kW.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'SAER IR Centrifugal Pumps | Terkis',
        description: 'End-suction close-coupled centrifugal pump with high-efficiency motors for water supply.',
        image: mainImageId
      }
    }, token)
  }

  // 2. SAER L-Series Inline pump
  {
    console.log('Evaluating: SAER L-Series Inline...')

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '0.18 to 92', unit: 'kW', label: 'MOTOR POWER RANGE' },
          { title: 'DN 25 to 150', unit: '', label: 'SUCTION / OUTLET' },
          { title: '0.5 to 800', unit: 'm³/h', label: 'FLOW RATE RANGE' },
          { title: 'Nodular Iron', unit: '', label: 'BODY MATERIAL' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Space-saving vertical in-line pump made of nodular cast iron for HVAC and hot water utilities.',
        items: [
          { title: 'In-line Port Design', body: 'Suction and delivery connections are placed on the same axis for easy in-line piping integration.' },
          { title: 'Space-Saving Vertical', body: 'Vertical assembly design minimizes physical floor footprint in compact plant rooms.' },
          { title: 'Nodular Cast Iron', body: 'Nodular iron body casing provides high pressure rating and structural rigidity.' },
          { title: 'High-Temperature seals', body: 'Handles media up to +120°C with optional high-temperature mechanical seals.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Motor Power', value: '0.18 kW up to 92 kW' },
          { label: 'Suction & Outlet Ports', value: 'DN 25 up to DN 150' },
          { label: 'Flow Rate Range', value: '0.5 up to 800 m³/h' },
          { label: 'Body Material', value: 'Nodular cast iron' },
          { label: 'Max Head', value: 'Up to 700 m' },
          { label: 'Temperature Range', value: '-15°C to +70°C (Standard); up to +120°C (Optional)' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'HVAC Circulation', body: 'Circulates hot and chilled water through building climate systems.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Pressure Boosting', body: 'Maintains consistent mains pressure in tall commercial buildings.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'District Heating', body: 'High-efficiency thermal hot water supply loops.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a SAER L-Series Inline Pump?',
        description: 'Our technical engineering team will help you configure the inline ports and mechanical seals for your HVAC lines.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'saer-l-series-inline-pump', {
      title: 'SAER L-Series In-Line Centrifugal Electric Pump',
      slug: 'saer-l-series-inline-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Space-saving vertical in-line pump made of nodular cast iron for HVAC and hot water utilities.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'SAER L-Series Inline Pumps | Terkis',
        description: 'Space-saving vertical in-line pump made of nodular cast iron for HVAC and utility water systems.',
        image: mainImageId
      }
    }, token)
  }

  // 3. SAER MKM multistage vertical pump
  {
    console.log('Evaluating: SAER MKM multistage...')

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '0.75 to 4', unit: 'kW', label: 'MOTOR POWER RANGE' },
          { title: 'Up to 13', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: 'Up to 123.5', unit: 'm', label: 'MAX PRESSURE HEAD' },
          { title: 'ErP Code', unit: '', label: 'ECO-DESIGN DIRECTIVE' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Vertical close-coupled multistage electric pump for high-pressure irrigation and autoclaves.',
        items: [
          { title: 'Multistage Design', body: 'Multiple stacked impellers generate high pressure lift (up to 123.5m) with low motor power.' },
          { title: 'Eco-Design Compliant', body: 'Meets the strict EU 2009/125/CE (ErP) energy efficiency directives.' },
          { title: 'Close-Coupled Vertical', body: 'Extremely silent operation and compact vertical footprint.' },
          { title: 'Sturdy Support Base', body: 'Cast iron pump foot and base casing guarantee high operational stability.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Models Range', value: '37 models divided in 4 series' },
          { label: 'Motor Power', value: '0.75 up to 4 kW (at ~2900 rpm)' },
          { label: 'Max Flow Rate', value: '13 m³/h' },
          { label: 'Max Head', value: '123.5 m (Shut-off: 136.5 m)' },
          { label: 'Liquid Temperature', value: '-15°C to +90°C (Special configurations: 120°C)' },
          { label: 'Directive Conformance', value: '2009/125/CE (ErP directive)' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'High-Pressure Booster', body: 'Autoclave systems and pressure boosting loops in apartment buildings.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Irrigation Systems', body: 'High-head agricultural water supply and sprinkling lines.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Boiler Feed Systems', body: 'Small boiler water injection loops and cleaning installations.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a SAER MKM Multistage Pump?',
        description: 'Our technical engineering team will size the stage counts and motor power for your high-pressure lines.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'saer-mkm-series-vertical-multistage-pump', {
      title: 'SAER MKM-Series Vertical Multistage Electric Pump',
      slug: 'saer-mkm-series-vertical-multistage-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Vertical close-coupled multistage electric pump for high-pressure irrigation and autoclaves.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'SAER MKM Multistage Pumps | Terkis',
        description: 'Vertical close-coupled multistage electric pump for high-pressure autoclaves and agricultural irrigation.',
        image: mainImageId
      }
    }, token)
  }


  console.log('✓ SAER Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
