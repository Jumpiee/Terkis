// Run: npx tsx src/endpoints/seed/scripts/seed-klaus-union.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding Klaus Union (Manual Designs) ---')
  const token = await login()
  console.log('✓ Authenticated')

  // Brand
  const brand = await findOrCreate('brands', 'klaus-union', { title: 'Klaus Union', slug: 'klaus-union' }, token)
  console.log(`✓ Brand: Klaus Union (id: ${brand.id})`)

  // Category
  const category = await findOrCreate('product-categories', 'mechanical', { title: 'Mechanical', slug: 'mechanical' }, token)
  console.log(`✓ Category: Mechanical (id: ${category.id})`)

  // =========================================================================
  // 1. Klaus Union NOV Mechanical Seal Process Pump
  // =========================================================================
  {
    console.log('\nEvaluating: Klaus Union NOV Mechanical Seal Process Pump...')
    const mainImagePath = path.resolve(__dirname, '../../../../public/media/KU-001.png')
    const mainImageId = await uploadMedia(mainImagePath, 'Klaus Union NOV Main Image', token)

    const gallery = [{ image: mainImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Performance Figures',
        stats: [
          { title: '3,500', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: '220', unit: 'm L.C.', label: 'MAX DELIVERY HEAD' },
          { title: '-120 to +550', unit: '°C', label: 'TEMPERATURE RANGE' },
          { title: 'PN 400', unit: '', label: 'PRESSURE RATING' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Engineered Design',
        heading: 'Standardized Casing & Sealing',
        description: 'Centrifugal process pump with mechanical seal built to international DIN/ISO standards.',
        items: [
          { title: 'Standardized Casing', body: 'Direct dimensional interchangeability with standard chemical process pumps.' },
          { title: 'Robust Shaft', body: 'Heavy-duty design minimizes shaft deflection at the seal faces for extended seal life.' },
          { title: 'Flexible Sealing', body: 'Supports standard cartridge single or double mechanical seals.' },
          { title: 'Material Versatility', body: 'Available in Stainless Steel, Duplex, Hastelloy®, and Titanium alloys.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Design Standards', value: 'DIN EN ISO 2858 / 5199' },
          { label: 'Max Flow Rate', value: '3,500 m³/h' },
          { label: 'Max Delivery Head', value: '220 m L.C.' },
          { label: 'Temperature Range', value: '-120 °C to +550 °C' },
          { label: 'Pressure Rating', value: 'Max. PN 400' },
          { label: 'Materials', value: 'Stainless Steel, Duplex, Hastelloy®, Titanium' },
          { label: 'Standards', value: 'DIN EN ISO 15783, API 685' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Utility Water Circulation', body: 'Reliable handling of utility and process water loops.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Chemical Blending', body: 'Safe transfer of non-volatile and mild chemical solutions.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Solvent Handling', body: 'Efficient transfer of non-toxic industrial solvents.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Klaus Union NOV Pump?',
        description: 'Our engineering team will help you configure the right shaft seal and flush plan for your process.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'klaus-union-nov-seal-process-pump', {
      title: 'Klaus Union NOV Mechanical Seal Process Pump',
      slug: 'klaus-union-nov-seal-process-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Standardized centrifugal pump with mechanical seal, built to DIN EN ISO 2858 and 5199.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Klaus Union NOV Mechanical Seal Process Pump | Terkis',
        description: 'Standardized centrifugal pump with mechanical seal, built to DIN EN ISO 2858 and 5199.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 2. Klaus Union SLM AP API 685 Magnetic Drive Pump
  // =========================================================================
  {
    console.log('\nEvaluating: Klaus Union SLM AP API 685 Magnetic Drive Pump...')
    const mainImagePath = path.resolve(__dirname, '../../../../public/media/KU-002.png')
    const mainImageId = await uploadMedia(mainImagePath, 'Klaus Union SLM AP Main Image', token)

    const gallery = [{ image: mainImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Performance Figures',
        stats: [
          { title: '3,500', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: '220', unit: 'm L.C.', label: 'MAX DELIVERY HEAD' },
          { title: '-200 to +550', unit: '°C', label: 'TEMPERATURE RANGE' },
          { title: 'PN 400', unit: '', label: 'PRESSURE RATING' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Refinery Class',
        heading: 'API 685 Sealless Safety',
        description: 'Heavy-duty magnetic drive pump for petroleum and refining applications requiring absolute leak containment.',
        items: [
          { title: 'API 685 Compliance', body: 'Designed specifically for oil, gas, and petrochemical refinery environments.' },
          { title: 'Zero Emissions', body: 'Hermetic magnetic coupling eliminates toxic hydrocarbon leakage.' },
          { title: 'Double Containment', body: 'Available with secondary containment shell systems for critical process security.' },
          { title: 'High Piping Loads', body: 'Heavy-wall casing design handles extreme nozzle loads common in refinery piping.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Design Standards', value: 'API 685' },
          { label: 'Max Flow Rate', value: '3,500 m³/h' },
          { label: 'Max Delivery Head', value: '220 m L.C.' },
          { label: 'Temperature Range', value: '-200 °C to +550 °C' },
          { label: 'Pressure Rating', value: 'Max. PN 400' },
          { label: 'Materials', value: 'Stainless Steel, Duplex, Hastelloy®, Titanium' },
          { label: 'Standards', value: 'DIN EN ISO 15783, API 685' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Volatile Hydrocarbons', body: 'Leak-free pumping of light hydrocarbons and volatile fuels.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Hot Oil Recirculation', body: 'High-temperature oil circulation up to +550 °C.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Toxic Chemical Process', body: 'Absolute containment of hazardous chemicals.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Klaus Union SLM AP Pump?',
        description: 'Contact our API 685 specialists to select the correct containment and bearing monitor configurations.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'klaus-union-slm-ap-refinery-pump', {
      title: 'Klaus Union SLM AP API 685 Magnetic Drive Pump',
      slug: 'klaus-union-slm-ap-refinery-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Heavy-duty API 685 compliant magnetic drive pump for petroleum and refining applications.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Klaus Union SLM AP API 685 Magnetic Drive Pump | Terkis',
        description: 'Heavy-duty API 685 compliant magnetic drive pump for petroleum and refining applications.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 3. Klaus Union SLM DSP-2C Twin Screw Pump
  // =========================================================================
  {
    console.log('\nEvaluating: Klaus Union SLM DSP-2C Twin Screw Pump...')
    const mainImagePath = path.resolve(__dirname, '../../../../public/media/KU-003.png')
    const mainImageId = await uploadMedia(mainImagePath, 'Klaus Union SLM DSP Main Image', token)

    const gallery = [{ image: mainImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Performance Figures',
        stats: [
          { title: '1,800', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: '40', unit: 'bar', label: 'MAX DIFF PRESSURE' },
          { title: '100,000', unit: 'cSt', label: 'MAX VISCOSITY' },
          { title: '-120 to +400', unit: '°C', label: 'TEMPERATURE RANGE' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'High Viscosity',
        heading: 'Sealless Multi-phase Transfer',
        description: 'API 676 compliant positive displacement twin screw pump with magnetic drive for aggressive, viscous, or gas-entrained fluids.',
        items: [
          { title: 'Twin Screw Displacement', body: 'Smooth, non-pulsating axial flow prevents fluid shear and emulsion.' },
          { title: 'Extreme Viscosity Range', body: 'Efficiently transfers fluids with viscosities up to 100,000 cSt.' },
          { title: 'Sealless Magnetic Drive', body: 'Replaces mechanical shaft seals, eliminating leak paths for viscous media.' },
          { title: 'Gas Tolerance', body: 'Handles multi-phase mixtures with high gas fractions without losing prime.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Design Standards', value: 'API 676' },
          { label: 'Max Flow Rate', value: '1,800 m³/h' },
          { label: 'Max Differential Pressure', value: '40 bar' },
          { label: 'Temperature Range', value: '-120 °C to +400 °C' },
          { label: 'Pressure Rating', value: 'Max. PN 400' },
          { label: 'Max Viscosity', value: '100,000 mm²/s (cSt)' },
          { label: 'Max Delivery Head', value: 'Up to 470 m (higher for multi-stage)' },
          { label: 'Materials', value: 'Stainless Steel, Duplex, Hastelloy®, Titanium' },
          { label: 'Standards', value: 'DIN EN ISO 15783, API 685' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Crude Oil Loading', body: 'High-capacity transfer of viscous hydrocarbons and crude oil.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Bitumen & Polymer Feed', body: 'Pumping hot asphalt and thick chemical polymers.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Multi-phase Pipelines', body: 'Transporting oil-gas-water mixtures with high gas fraction.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Klaus Union SLM DSP Pump?',
        description: 'Our engineers can design custom heating jackets and select the correct screw pitch for your viscosity profile.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'klaus-union-slm-dsp-screw-pump', {
      title: 'Klaus Union SLM DSP-2C Twin Screw Pump',
      slug: 'klaus-union-slm-dsp-screw-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Sealless twin screw positive displacement pump for high viscosity, multi-phase fluid mixtures.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Klaus Union SLM DSP-2C Twin Screw Pump | Terkis',
        description: 'Sealless twin screw positive displacement pump for high viscosity, multi-phase fluid mixtures.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 4. Klaus Union SLM GV Multi-Stage Magnetic Drive Centrifugal Pump
  // =========================================================================
  {
    console.log('\nEvaluating: Klaus Union SLM GV Multi-Stage Pump...')
    const mainImagePath = path.resolve(__dirname, '../../../../public/media/KU-004.png')
    const mainImageId = await uploadMedia(mainImagePath, 'Klaus Union SLM GV Main Image', token)

    const gallery = [{ image: mainImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Performance Figures',
        stats: [
          { title: '300', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: '2,200', unit: 'm L.C.', label: 'MAX DELIVERY HEAD' },
          { title: '-120 to +350', unit: '°C', label: 'TEMPERATURE RANGE' },
          { title: 'PN 250', unit: '', label: 'PRESSURE RATING' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'High Pressure',
        heading: 'Multi-Stage Sealless Design',
        description: 'High-head multi-stage magnetic drive pump based on DIN ISO 15783 and API 685 for high-pressure injection.',
        items: [
          { title: 'Multi-Stage Power', body: 'Generates high discharge heads up to 2,200 meters through multiple series impellers.' },
          { title: 'Axial Thrust Balance', body: 'Internal hydraulic balancing system minimizes thrust bearing loads, extending runtime.' },
          { title: 'Sealless Safety', body: 'Magnetically coupled containment shell prevents toxic chemical leaks under high pressures.' },
          { title: 'API 685 Version', body: 'Available in configurations meeting stringent oil and gas safety requirements.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Design Standards', value: 'DIN EN ISO 15783 / API 685' },
          { label: 'Max Flow Rate', value: '300 m³/h' },
          { label: 'Max Delivery Head', value: '2,200 m L.C.' },
          { label: 'Temperature Range', value: '-120 °C to +350 °C' },
          { label: 'Pressure Rating', value: 'Max. PN 250' },
          { label: 'Materials', value: 'Stainless Steel, Duplex, Hastelloy®, Titanium' },
          { label: 'Standards', value: 'DIN EN ISO 15783, API 685' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Boiler Feedwater', body: 'Reliable feed injection into high-pressure boilers without seal wear.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Chemical Injection', body: 'High-pressure dosing of toxic or aggressive chemicals.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Hydrocarbon Injection', body: 'High-head liquid gas and hydrocarbon process feeds.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Klaus Union SLM GV Pump?',
        description: 'Discuss your high-head process injection requirements with our technical sales engineers.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'klaus-union-slm-gv-multistage-pump', {
      title: 'Klaus Union SLM GV Multi-Stage Magnetic Drive Centrifugal Pump',
      slug: 'klaus-union-slm-gv-multistage-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('High-head multi-stage magnetic drive pump based on DIN ISO 15783 and API 685.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Klaus Union SLM GV Multi-Stage Magnetic Drive Centrifugal Pump | Terkis',
        description: 'High-head multi-stage magnetic drive pump based on DIN ISO 15783 and API 685.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 5. Klaus Union SLM NV ISO Sealless Magnetic Drive Pump
  // =========================================================================
  {
    console.log('\nEvaluating: Klaus Union SLM NV ISO Sealless Pump...')
    const mainImagePath = path.resolve(__dirname, '../../../../public/media/KU-005.png')
    const mainImageId = await uploadMedia(mainImagePath, 'Klaus Union SLM NV Main Image', token)

    const gallery = [{ image: mainImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Performance Figures',
        stats: [
          { title: '3,500', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: '220', unit: 'm L.C.', label: 'MAX DELIVERY HEAD' },
          { title: '-200 to +550', unit: '°C', label: 'TEMPERATURE RANGE' },
          { title: 'PN 400', unit: '', label: 'PRESSURE RATING' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Standard Process',
        heading: 'ISO Standard Sealless Pump',
        description: 'DIN EN ISO 2858 / 15783 magnetic drive pump for leak-free, safe handling of hazardous chemicals.',
        items: [
          { title: 'Zero Leakage', body: 'Sealless design removes mechanical shaft seals, preventing any chemical emissions.' },
          { title: 'Static Containment', body: 'High-strength containment shell provides a pressure barrier.' },
          { title: 'Product Lubricated Bearings', body: 'High-purity silicon carbide journal bearings are lubricated by the pumped chemical, ensuring long life.' },
          { title: 'ISO Standardized', body: 'Dimensional interchangeability with standard DIN EN ISO 2858 pumps.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Design Standards', value: 'DIN EN ISO 2858 / 15783' },
          { label: 'Max Flow Rate', value: '3,500 m³/h' },
          { label: 'Max Delivery Head', value: '220 m L.C.' },
          { label: 'Temperature Range', value: '-200 °C to +550 °C' },
          { label: 'Pressure Rating', value: 'Max. PN 400' },
          { label: 'Materials', value: 'Stainless Steel, Duplex, Hastelloy®, Titanium' },
          { label: 'Standards', value: 'DIN EN ISO 15783, API 685' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Hazardous Chemicals', body: 'Safe transfer of acids, alkalis, and toxic process fluids.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Organic Solvents', body: 'Emission-free storage tank transfer of highly flammable solvents.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Toxic Dosing Loops', body: 'Continuous inline feed of dangerous chemical agents.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Klaus Union SLM NV Pump?',
        description: 'Select the premier standard for chemical process safety. Contact us for compatibility assessments.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'klaus-union-slm-nv-sealless-pump', {
      title: 'Klaus Union SLM NV ISO Sealless Magnetic Drive Pump',
      slug: 'klaus-union-slm-nv-sealless-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('DIN EN ISO 2858 / 15783 magnetic drive pump for leak-free handling of hazardous chemicals.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Klaus Union SLM NV ISO Sealless Magnetic Drive Pump | Terkis',
        description: 'DIN EN ISO 2858 / 15783 magnetic drive pump for leak-free handling of hazardous chemicals.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 6. Klaus Union SLM NVT Submerged Sump Pump
  // =========================================================================
  {
    console.log('\nEvaluating: Klaus Union SLM NVT Submerged Sump Pump...')
    const mainImagePath = path.resolve(__dirname, '../../../../public/media/KU-006.png')
    const mainImageId = await uploadMedia(mainImagePath, 'Klaus Union SLM NVT Main Image', token)

    const gallery = [{ image: mainImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Performance Figures',
        stats: [
          { title: '3,500', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: '220', unit: 'm L.C.', label: 'MAX DELIVERY HEAD' },
          { title: '6,000', unit: 'mm', label: 'MAX SUBMERGING DEPTH' },
          { title: '-40 to +200', unit: '°C', label: 'TEMPERATURE RANGE' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Sump Drainage',
        heading: 'Submerged Vertical Sealless Pump',
        description: 'Submerged vertical sump pump with sealless magnet drive, suitable for deep tanks.',
        items: [
          { title: 'Submerging Depth', body: 'Column lengths up to 6,000 mm allow drainage of deep chemical storage tanks.' },
          { title: 'Sealless Top', body: 'Magnetic drive containment replaces standard packing glands, removing leak paths.' },
          { title: 'Robust Shaft Guides', body: 'Intermediate column shaft guide bearings are product-lubricated.' },
          { title: 'No Wetted Seals', body: 'Eliminates wetted mechanical seals inside the tank, drastically reducing maintenance.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Design Standards', value: 'DIN EN ISO 2858 / DIN EN ISO 15783' },
          { label: 'Max Flow Rate', value: '3,500 m³/h' },
          { label: 'Max Delivery Head', value: '220 m L.C.' },
          { label: 'Temperature Range', value: '-40 °C to +200 °C' },
          { label: 'Pressure Rating', value: 'Max. PN 63' },
          { label: 'Submerging Depth', value: 'Max. 6,000 mm' },
          { label: 'Materials', value: 'Stainless Steel, Duplex, Hastelloy®, Titanium' },
          { label: 'Standards', value: 'DIN EN ISO 15783, API 685' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Deep Chemical Tanks', body: 'Emptying hazardous liquids from deep vertical storage vessels.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Underground Drainage', body: 'Safe drainage of toxic run-off and process wastewater sumps.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Refinery Collection Pits', body: 'Emptying oil sludge and drain pits with absolute containment.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Klaus Union SLM NVT Sump Pump?',
        description: 'Specify your tank depth and wetted materials to get a custom engineered vertical column pump.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'klaus-union-slm-nvt-sump-pump', {
      title: 'Klaus Union SLM NVT Submerged Sump Pump',
      slug: 'klaus-union-slm-nvt-sump-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Submerged vertical sump pump with sealless magnet drive, suitable for deep tanks.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Klaus Union SLM NVT Submerged Sump Pump | Terkis',
        description: 'Submerged vertical sump pump with sealless magnet drive, suitable for deep tanks.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 7. Klaus Union SLM SV Side Channel Magnetic Drive Pump
  // =========================================================================
  {
    console.log('\nEvaluating: Klaus Union SLM SV Side Channel Pump...')
    const mainImagePath = path.resolve(__dirname, '../../../../public/media/KU-007.PNG')
    const mainImageId = await uploadMedia(mainImagePath, 'Klaus Union SLM SV Main Image', token)

    const gallery = [{ image: mainImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Performance Figures',
        stats: [
          { title: '42', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: '470', unit: 'm L.C.', label: 'MAX DELIVERY HEAD' },
          { title: '-120 to +250', unit: '°C', label: 'TEMPERATURE RANGE' },
          { title: 'PN 400', unit: '', label: 'PRESSURE RATING' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Self-Priming',
        heading: 'Side Channel Sealless Pump',
        description: 'Self-priming multi-stage side channel pump with magnet drive for low flow and high head applications.',
        items: [
          { title: 'Dry Self-Priming', body: 'Excellent gas-handling capability, allowing the pump to self-prime from dry suction lines.' },
          { title: 'High Pressure', body: 'Generates substantial discharge heads with lower capacities compared to centrifugal pumps.' },
          { title: 'Zero VOC Emissions', body: 'Static containment shell prevents volatile organic compound (VOC) emissions.' },
          { title: 'Gas Entrainment', body: 'Tolerates high gas fractions, preventing vapor locks when pumping volatile fluids.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Design Standards', value: 'DIN EN ISO 15783' },
          { label: 'Max Flow Rate', value: '42 m³/h' },
          { label: 'Max Delivery Head', value: '470 m L.C.' },
          { label: 'Temperature Range', value: '-120°C to +250 °C' },
          { label: 'Pressure Rating', value: 'Max. PN 400' },
          { label: 'Materials', value: 'Stainless Steel, Duplex, Hastelloy®, Titanium' },
          { label: 'Standards', value: 'DIN EN ISO 15783, API 685' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'LPG Cylinder Loading', body: 'Safe transfer of liquefied petroleum gas and pressurized hydrocarbons.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Condensate Extraction', body: 'Pumping hot condensate under high vacuum conditions.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Volatile Solvents', body: 'Safe handling of solvents near their boiling point.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Klaus Union SLM SV Pump?',
        description: 'Ideal for low-flow, high-head gas mixtures. Contact us for application sizing.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'klaus-union-slm-sv-side-channel-pump', {
      title: 'Klaus Union SLM SV Side Channel Magnetic Drive Pump',
      slug: 'klaus-union-slm-sv-side-channel-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Self-priming multi-stage side channel pump with magnet drive for low flow and high head applications.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Klaus Union SLM SV Side Channel Magnetic Drive Pump | Terkis',
        description: 'Self-priming multi-stage side channel pump with magnet drive for low flow and high head applications.',
        image: mainImageId
      }
    }, token)
  }



  console.log('✓ Klaus Union Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
