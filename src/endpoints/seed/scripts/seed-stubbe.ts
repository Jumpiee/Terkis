// Run: npx tsx src/endpoints/seed/scripts/seed-stubbe.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding STÜBBE (Manual Designs) ---')
  const token = await login()
  console.log('✓ Authenticated')

  // Brand
  const brand = await findOrCreate('brands', 'stubbe', { title: 'STÜBBE', slug: 'stubbe' }, token)
  console.log(`✓ Brand: STÜBBE (id: ${brand.id})`)

  // Categories
  const mechanical = await findOrCreate('product-categories', 'mechanical', { title: 'Mechanical', slug: 'mechanical' }, token)
  const instrument = await findOrCreate('product-categories', 'instrument', { title: 'Instrument', slug: 'instrument' }, token)
  console.log(`✓ Categories: Mechanical (id: ${mechanical.id}), Instrument (id: ${instrument.id})`)

  const mainImagePath = path.resolve(__dirname, '../../../../public/media/STUBBE.png')
  const mainImageId = await uploadMedia(mainImagePath, 'STÜBBE Product Main Image', token)

  const gallery = [{ image: mainImageId }]

  // =========================================================================
  // 1. STÜBBE DFM 165-350 Flowmeter
  // =========================================================================
  {
    console.log('\nEvaluating: STÜBBE DFM 165-350 Flowmeter...')

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: 'Up to 250', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: 'DN 32 - 100', unit: '', label: 'NOMINAL SIZE' },
          { title: 'Plastic', unit: '', label: 'BODY HOUSING' },
          { title: 'PVDF / PE', unit: '', label: 'WETTED MATERIALS' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Precise area flowmeter designed for corrosive liquid media and plastic pipelines.',
        items: [
          { title: 'Thermoplastic Casing', body: 'Resists chemical corrosion from wetted process liquids.' },
          { title: 'Visual Readout', body: 'Clear scale for instant local flow checks.' },
          { title: 'Low Pressure Loss', body: 'Tapered float chamber geometry minimizes pressure drop.' },
          { title: 'Premium Thermoplastics', body: 'Built using high-resistance materials like PE-UHMW, PVDF, and PFA.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Matrix',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Series', value: 'DFM 165-350' },
          { label: 'Application', value: 'Corrosive chemical flow measurement' },
          { label: 'Body Material', value: 'Plastic (Thermoplastic housing)' },
          { label: 'Nominal Size (DN)', value: '32 - 100' },
          { label: 'Max Flow Rate (Q)', value: 'Up to 250 m³/h' },
          { label: 'Materials', value: 'PE-UHMW, PVDF' },
          { label: 'Connection', value: 'Flange DIN / ANSI' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Chemical Dosing Pipelines', body: 'Accurate measurement of dosing chemicals.', badge: 'Instrument' },
          { code: 'APP-02', title: 'Water Treatment', body: 'Recirculation and neutralizing dosing systems.', badge: 'Instrument' },
          { code: 'APP-03', title: 'Plating Baths', body: 'Flow monitoring of corrosive electroplating liquids.', badge: 'Instrument' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a STÜBBE DFM Flowmeter?',
        description: 'Our engineering team will help you select the right plastic flowmeter for your aggressive media.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'stubbe-dfm-165-350-flowmeter', {
      title: 'STÜBBE DFM 165-350 Flowmeter',
      slug: 'stubbe-dfm-165-350-flowmeter',
      _status: 'published',
      brand: brand.id,
      categories: [instrument.id],
      description: richText('Precise area flowmeter designed for corrosive liquid media and plastic pipelines. Secure and efficient handling of corrosive chemicals.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'STÜBBE DFM 165-350 Flowmeter | Terkis',
        description: 'Precise area flowmeter designed for corrosive liquid media and plastic pipelines. Secure and efficient handling of corrosive chemicals.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 2. STÜBBE DHV 712-R Pressure Relief Valve
  // =========================================================================
  {
    console.log('\nEvaluating: STÜBBE DHV 712-R Pressure Relief Valve...')
    
    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: 'Safety', unit: '', label: 'PRIMARY FUNCTION' },
          { title: 'DN 32 - 100', unit: '', label: 'NOMINAL SIZE' },
          { title: 'Thermoplastic', unit: '', label: 'BODY MATERIAL' },
          { title: 'PVDF / PE', unit: '', label: 'DIAPHRAGM/O-RING' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'High-reliability plastic pressure relief valve for dosing and chemical injection lines.',
        items: [
          { title: 'Thermoplastic Body', body: 'Constructed from highly inert plastics to resist acid attacks.' },
          { title: 'Adjustable Setting', body: 'Simple manual adjustment of the relief set point.' },
          { title: 'Diaphragm Control', body: 'Hermetic seal separation between process fluid and actuator chamber.' },
          { title: 'Modular Flexibility', body: 'Wide modular compatibility with DIN and ANSI flange standards.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Matrix',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Series', value: 'DHV 712-R' },
          { label: 'Application', value: 'Chemical pressure relief and safety venting' },
          { label: 'Body Material', value: 'Thermoplastic' },
          { label: 'Nominal Size (DN)', value: '32 - 100' },
          { label: 'Materials', value: 'PE-UHMW, PVDF' },
          { label: 'Connection', value: 'Flange DIN / ANSI' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Chemical Recirculation', body: 'Protects loops from pressure spikes.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Dosing System Safety', body: 'Guarantees bypass safety for dosing pumps.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Acid Venting Lines', body: 'Reliable venting safety in toxic and aggressive systems.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a STÜBBE DHV Relief Valve?',
        description: 'Our engineering team will help you configure the correct body material and relief settings.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'stubbe-dhv-712-r-pressure-relief-valve', {
      title: 'STÜBBE DHV 712-R Pressure Relief Valve',
      slug: 'stubbe-dhv-712-r-pressure-relief-valve',
      _status: 'published',
      brand: brand.id,
      categories: [mechanical.id],
      description: richText('High-reliability plastic pressure relief valve for dosing and chemical injection lines. Secure and efficient handling of corrosive chemicals.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'STÜBBE DHV 712-R Pressure Relief Valve | Terkis',
        description: 'High-reliability plastic pressure relief valve for dosing and chemical injection lines. Secure and efficient handling of corrosive chemicals.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 3. STÜBBE MDM 920 Diaphragm Pressure Gauge Guard
  // =========================================================================
  {
    console.log('\nEvaluating: STÜBBE MDM 920 Diaphragm Pressure Gauge Guard...')
    
    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: 'Isolation', unit: '', label: 'PRIMARY FUNCTION' },
          { title: 'DN 32 - 100', unit: '', label: 'NOMINAL SIZE' },
          { title: 'Thermoplastic', unit: '', label: 'BODY MATERIAL' },
          { title: 'PTFE Coat', unit: '', label: 'DIAPHRAGM TYPE' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Diaphragm pressure gauge guard protecting instruments from direct contact with corrosive process fluids.',
        items: [
          { title: 'Fluid Isolation', body: 'Diaphragm design separates sensitive gauges from aggressive process chemicals.' },
          { title: 'Accurate Transfer', body: 'Flexible diaphragm ensures high fidelity transmission of process pressure to the instrument.' },
          { title: 'Robust Plastics', body: 'Corrosion-resistant thermoplastic shell provides chemical compatibility.' },
          { title: 'Universal Threading', body: 'Fits standard industrial pressure gauges and transmitters.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Matrix',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Series', value: 'MDM 920' },
          { label: 'Application', value: 'Instrumentation protection and chemical isolation' },
          { label: 'Body Material', value: 'Thermoplastic' },
          { label: 'Nominal Size (DN)', value: '32 - 100' },
          { label: 'Materials', value: 'PE-UHMW, PVDF' },
          { label: 'Connection', value: 'Flange DIN / ANSI' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Gauge Protection', body: 'Prevents crystallization and erosion of steel gauges.', badge: 'Instrument' },
          { code: 'APP-02', title: 'Chemical Isolation', body: 'Isolates pressure transmitters in acid lines.', badge: 'Instrument' },
          { code: 'APP-03', title: 'Dosing Loop Safety', body: 'Protects pulsation dampeners and monitoring accessories.', badge: 'Instrument' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a STÜBBE MDM Gauge Guard?',
        description: 'Our engineering team will help you select the correct plastic gauge guard configuration.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'stubbe-mdm-920-diaphragm-pressure-gauge-guard', {
      title: 'STÜBBE MDM 920 Diaphragm Pressure Gauge Guard',
      slug: 'stubbe-mdm-920-diaphragm-pressure-gauge-guard',
      _status: 'published',
      brand: brand.id,
      categories: [instrument.id],
      description: richText('Diaphragm pressure gauge guard protecting instruments from direct contact with corrosive process fluids. Secure and efficient handling of corrosive chemicals.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'STÜBBE MDM 920 Diaphragm Pressure Gauge Guard | Terkis',
        description: 'Diaphragm pressure gauge guard protecting instruments from direct contact with corrosive process fluids. Secure and efficient handling of corrosive chemicals.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 4. STÜBBE PTM Pressure and Temperature Sensor
  // =========================================================================
  {
    console.log('\nEvaluating: STÜBBE PTM Pressure and Temperature Sensor...')
    
    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: 'Dual', unit: '', label: 'SENSOR PARAMETERS' },
          { title: 'DN 32 - 100', unit: '', label: 'NOMINAL SIZE' },
          { title: 'Plastic', unit: '', label: 'WETTED CASING' },
          { title: 'PVDF / PE', unit: '', label: 'HOUSING MATERIALS' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Dual-parameter pressure and temperature sensor designed for chemical piping networks.',
        items: [
          { title: 'Dual Parameter', body: 'Simultaneous monitoring of temperature and pressure in one device.' },
          { title: 'Thermoplastic Housing', body: 'Designed to eliminate corrosion vulnerability in sensor wells.' },
          { title: 'Electronic Signal Output', body: 'Standard telemetry outputs for industrial PLC integration.' },
          { title: 'Chemical Compatibility', body: 'PE-UHMW and PVDF wetted materials prevent leaks and erosion.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Matrix',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Series', value: 'PTM' },
          { label: 'Application', value: 'Pressure and Temperature sensing' },
          { label: 'Body Material', value: 'Plastic wetted components' },
          { label: 'Nominal Size (DN)', value: '32 - 100' },
          { label: 'Materials', value: 'PE-UHMW, PVDF' },
          { label: 'Connection', value: 'Flange DIN / ANSI' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Chemical Piping Networks', body: 'Monitors pressure drops and temperature increases.', badge: 'Instrument' },
          { code: 'APP-02', title: 'Dosing Automation', body: 'Provides feedback loops for dosing speed controllers.', badge: 'Instrument' },
          { code: 'APP-03', title: 'Safety Monitoring', body: 'Alerts PLC systems in case of runaway thermal reactions.', badge: 'Instrument' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a STÜBBE PTM Sensor?',
        description: 'Our engineering team will help you select wetted materials compatible with your process chemistry.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'stubbe-ptm-pressure-and-temperature-sensor', {
      title: 'STÜBBE PTM Pressure and Temperature Sensor',
      slug: 'stubbe-ptm-pressure-and-temperature-sensor',
      _status: 'published',
      brand: brand.id,
      categories: [instrument.id],
      description: richText('Dual-parameter pressure and temperature sensor designed for chemical piping networks. Secure and efficient handling of corrosive chemicals.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'STÜBBE PTM Pressure and Temperature Sensor | Terkis',
        description: 'Dual-parameter pressure and temperature sensor designed for chemical piping networks. Secure and efficient handling of corrosive chemicals.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 5. STÜBBE X-CLASS Standardized Chemical Pump (DIN EN ISO 2858)
  // =========================================================================
  {
    console.log('\nEvaluating: STÜBBE X-CLASS Standardized Chemical Pump...')
    
    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: 'Up to 1,100', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: 'Up to 120', unit: 'm', label: 'MAX HEAD' },
          { title: 'Up to 250', unit: 'kW', label: 'MOTOR POWER' },
          { title: 'PE/PVDF/PFA', unit: '', label: 'LINING MATERIALS' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Heavy-duty standardized chemical pump made of PE-UHMW, PVDF, or PFA with fully metallic chambered casing.',
        items: [
          { title: 'Heavy-Duty Casing', body: 'Fully metallic chambered casing allows operation in outdoor installations and high piping loads.' },
          { title: 'Standard Design', body: 'Complies fully with DIN EN ISO 2858 standardized dimensions for easy replacement.' },
          { title: 'Premium Thermoplastics', body: 'Lined with high-resistance plastics like PE-UHMW, PVDF, and PFA for chemical compatibility.' },
          { title: 'Modular Flexibility', body: 'An extremely wide modular system with a maximum variety of variants to fit specific process requirements.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Matrix',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Standards', value: 'DIN EN ISO 2858' },
          { label: 'Nominal Size DN', value: '25 - 200' },
          { label: 'Max Flow Rate Q', value: 'Up to 1,100 m³/h' },
          { label: 'Max Head H', value: 'Up to 120 m' },
          { label: 'Motor Power', value: 'Up to 250 kW' },
          { label: 'Materials', value: 'PE-UHMW, PVDF, PFA' },
          { label: 'Connections', value: 'Flange DIN / ANSI' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Chemical Processing', body: 'Heavy-duty transport of corrosive process fluids in refineries and plants.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Surface Technology', body: 'Recirculating aggressive pickling and plating acids.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Environmental Engineering', body: 'Pumping toxic waste streams and exhaust air scrubbers.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a STÜBBE X-CLASS Pump?',
        description: 'Our engineering team will help you select the right thermoplastic linings and shaft seals.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'stubbe-x-class-standardized-chemical-pump', {
      title: 'STÜBBE X-CLASS Standardized Chemical Pump (DIN EN ISO 2858)',
      slug: 'stubbe-x-class-standardized-chemical-pump',
      _status: 'published',
      brand: brand.id,
      categories: [mechanical.id],
      description: richText('Heavy-duty standardized chemical pump made of PE-UHMW, PVDF, or PFA with fully metallic chambered casing for harsh installations.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'STÜBBE X-CLASS Standardized Chemical Pump | Terkis',
        description: 'Heavy-duty standardized chemical pump made of PE-UHMW, PVDF, or PFA with fully metallic chambered casing for harsh installations.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 6. STÜBBE X-CLASS Vertical Sump Chemical Pump (Cantilever Design)
  // =========================================================================
  {
    console.log('\nEvaluating: STÜBBE X-CLASS Vertical Sump Chemical Pump...')
    
    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: 'Up to 250', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: 'Up to 90', unit: 'm', label: 'MAX HEAD' },
          { title: 'Up to 1,500', unit: 'mm', label: 'IMMERSION DEPTH' },
          { title: 'Cantilever', unit: '', label: 'SHAFT DESIGN' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Non-self-priming vertical thermoplastic sump pump with cantilever shaft design.',
        items: [
          { title: 'Cantilever Design', body: 'Features a non self-priming single-stage design with a sturdy conical shaft and external bearings.' },
          { title: 'No Wetted Bearings', body: 'Cantilever design operates without bottom bearings or shaft sleeves, preventing dry-running damage.' },
          { title: 'Thermoplastic Sump Casing', body: 'Immersion tube and wetted casing made of highly resistant PE-UHMW or PVDF.' },
          { title: 'Modular Flexibility', body: 'Wide variety of immersion depths up to 1,500 mm and suction extensions up to 2,500 mm.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Matrix',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Nominal Size (DN)', value: '32 - 100' },
          { label: 'Max Flow Rate (Q)', value: 'Up to 250 m³/h' },
          { label: 'Max Head (H)', value: 'Up to 90 m' },
          { label: 'Motor Power', value: 'Up to 75 kW' },
          { label: 'Immersion Depth', value: 'Up to 1,500 mm' },
          { label: 'Suction Tube Extension', value: 'Up to 2,500 mm' },
          { label: 'Materials', value: 'PE-UHMW, PVDF' },
          { label: 'Connections', value: 'Flange DIN / ANSI' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Sump Drainage', body: 'Emptying chemical sump basins and effluent collection pits.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Acid Recirculation', body: 'Continuous pumping of aggressive liquors from storage tanks.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Neutralization Plants', body: 'Recirculating water and waste scrubbers in environment protection loops.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a STÜBBE X-CLASS Vertical Pump?',
        description: 'Our engineering team will help you size the right cantilever shaft and wetted parts materials.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'stubbe-x-class-vertical-sump-chemical-pump', {
      title: 'STÜBBE X-CLASS Vertical Sump Chemical Pump (Cantilever Design)',
      slug: 'stubbe-x-class-vertical-sump-chemical-pump',
      _status: 'published',
      brand: brand.id,
      categories: [mechanical.id],
      description: richText('Non-self-priming vertical thermoplastic sump pump with cantilever shaft design and external double bearing arrangement.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'STÜBBE X-CLASS Vertical Sump Chemical Pump | Terkis',
        description: 'Non-self-priming vertical thermoplastic sump pump with cantilever shaft design and external double bearing arrangement.',
        image: mainImageId
      }
    }, token)
  }


  console.log('\n✓ STÜBBE Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
