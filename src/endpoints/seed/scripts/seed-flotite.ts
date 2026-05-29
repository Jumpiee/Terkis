// Run: npx tsx src/endpoints/seed/scripts/seed-flotite.ts
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding Flo-Tite Products (Redo) ---')
  const token = await login()
  console.log('✓ Authenticated')

  // Brand
  const brand = await findOrCreate('brands', 'flo-tite', { title: 'Flo-Tite', slug: 'flo-tite' }, token)
  console.log(`✓ Brand: Flo-Tite (id: ${brand.id})`)

  // Categories
  const categoryMechanical = await findOrCreate('product-categories', 'mechanical', { title: 'Mechanical', slug: 'mechanical' }, token)
  const subCategoryMultiPort = await findOrCreate('product-categories', 'multi-port-valves', { title: 'Multi-Port Valves', slug: 'multi-port-valves', parent: categoryMechanical.id }, token)
  const subCategoryFlanged = await findOrCreate('product-categories', 'flanged-valves', { title: 'Flanged Valves', slug: 'flanged-valves', parent: categoryMechanical.id }, token)
  const subCategorySpecialty = await findOrCreate('product-categories', 'specialty-control-severe-service-valves', { title: 'Specialty, Control, and Severe Service Valves', slug: 'specialty-control-severe-service-valves', parent: categoryMechanical.id }, token)
  
  // Media (Placeholder)
  const mainImagePath = path.resolve(__dirname, '../../../../public/media/img1.jpg')
  const mainImageId = await uploadMedia(mainImagePath, 'Flo-Tite Valve Placeholder Image', token)
  const gallery = [{ image: mainImageId }]

  // =========================================================================
  // 1. Flo-Tite Bottom Entry Flanged MPF 155
  // =========================================================================
  {
    console.log('\nSeeding: Flo-Tite Bottom Entry Flanged MPF 155...')

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '3-Way', unit: '', label: 'VALVE STYLE' },
          { title: '2" to 6"', unit: '', label: 'SIZE RANGE' },
          { title: 'Class 150', unit: 'ANSI', label: 'PRESSURE RATING' },
          { title: '-20 to +550', unit: '°F', label: 'TEMP RANGE' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Design Excellence',
        heading: 'Multi-Port Precision',
        description: 'High-performance 3-Way ball valve engineered for precise mixing and diverting in industrial piping systems.',
        items: [
          { title: '3-Way Versatility', body: 'Bottom entry design allows for efficient mixing of two inlet streams or diverting one stream to two outlets.' },
          { title: 'ISO 5211 Ready', body: 'Integrally cast mounting pads ensure easy automation with pneumatic or electric actuators.' },
          { title: 'Bottom Entry Stem', body: 'Blow-out proof stem design provides maximum safety under high-pressure conditions.' },
          { title: 'Severe Service Seals', body: 'High-temperature seating materials allow continuous operation up to 550 °F.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Style', value: '3-Way Bottom Entry Mixing/Diverting' },
          { label: 'Size Range', value: '2" to 6"' },
          { label: 'Pressure Ratings', value: 'ANSI Class 150' },
          { label: 'Temperature Range', value: '-20 °F to 550 °F' },
          { label: 'Mounting', value: 'Integrally Cast ISO 5211 Mounting Pads' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Flow Mixing', body: 'Combines two inlet streams into a single outlet for blending operations.', badge: 'Multi-Port' },
          { code: 'APP-02', title: 'Flow Diverting', body: 'Directs a single inlet stream to one of two outlets for process routing.', badge: 'Multi-Port' },
          { code: 'APP-03', title: 'Automation-Ready', body: 'ISO 5211 mounting pads allow effortless integration with actuators.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need Multi-Port Valve Solutions?',
        description: 'Our technical team will help you select the right Flo-Tite multi-port valve configuration for your process.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'flo-tite-bottom-entry-flanged-mpf-155', {
      title: 'Flo-Tite Bottom Entry Flanged MPF 155',
      slug: 'flo-tite-bottom-entry-flanged-mpf-155',
      sku: 'FT-BOTTOM-ENTRY-FLANGED-MPF-155',
      _status: 'published',
      brand: brand.id,
      categories: [categoryMechanical.id, subCategoryMultiPort.id],
      description: richText('The Flo-Tite Bottom Entry Flanged MPF 155 is a high-performance 3-Way Mixing/Diverting ball valve engineered for multi-port valve applications.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Flo-Tite Bottom Entry Flanged MPF 155 | Terkis',
        description: '3-Way Bottom Entry Mixing/Diverting ball valve. ANSI Class 150, 2" to 6", ISO 5211 mounting.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 2. Flo-Tite Full-Flo F150 & F300
  // =========================================================================
  {
    console.log('\nSeeding: Flo-Tite Full-Flo F150 & F300...')

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '2-Piece', unit: '', label: 'SPLIT-BODY DESIGN' },
          { title: '1" to 12"', unit: '', label: 'SIZE RANGE' },
          { title: '150 / 300', unit: 'PSI', label: 'PRESSURE RATING' },
          { title: '-20 to +550', unit: '°F', label: 'TEMP RANGE' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Certified Reliability',
        heading: 'Standard Process Excellence',
        description: 'High-performance split-body flanged ball valves built to carry the toughest industry certifications.',
        items: [
          { title: 'Fire-Safe Certified', body: 'Fully tested and certified to API 607 standards for fire-safe performance.' },
          { title: 'NACE MR0175', body: 'Complies with NACE requirements for sour gas and corrosive H₂S environments.' },
          { title: 'Full Port Design', body: 'Ensures maximum flow capacity and minimal pressure drop across the valve.' },
          { title: 'Split-Body Ease', body: '2-piece design simplifies maintenance and seat replacement in the field.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Style', value: '2-Piece Split-Body Flanged Valves' },
          { label: 'Size Range', value: '1" to 12"' },
          { label: 'Pressure Ratings', value: '150 SWP, optional 300 psig' },
          { label: 'Temperature Range', value: '-20 °F to 550 °F' },
          { label: 'Mounting', value: 'Integrally Cast ISO 5211 Mounting Pads' },
          { label: 'Compliance', value: 'API 607, NACE MR0175, ISO 5211, CE' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Oil & Gas Pipelines', body: 'Reliable isolation for upstream and midstream services.', badge: 'Flanged' },
          { code: 'APP-02', title: 'Chemical Refining', body: 'Corrosion-resistant flanged valves for aggressive media.', badge: 'Flanged' },
          { code: 'APP-03', title: 'Petrochemical Process', body: 'Absolute sealing for high-temperature refined products.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Looking for Reliable Flanged Valves?',
        description: 'Our engineers can help you specify the correct Flo-Tite Full-Flo configuration for your pressure class and service conditions.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'flo-tite-full-flo-f150-f300', {
      title: 'Flo-Tite Full-Flo F150 & F300',
      slug: 'flo-tite-full-flo-f150-f300',
      sku: 'FT-FULL-FLO-F150-F300',
      _status: 'published',
      brand: brand.id,
      categories: [categoryMechanical.id, subCategoryFlanged.id],
      description: richText('The Flo-Tite Full-Flo F150 & F300 are high-performance 2-Piece Split-Body Flanged Ball Valves built for demanding industrial applications.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Flo-Tite Full-Flo F150 & F300 Flanged Ball Valves | Terkis',
        description: '2-Piece Split-Body Flanged Ball Valves, 1" to 12", 150/300 PSI. API 607, NACE MR0175.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 3. Flo-Tite Series 145 Spring Return / Deadman Handle
  // =========================================================================
  {
    console.log('\nSeeding: Flo-Tite Series 145 Spring Return / Deadman Handle...')

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: 'Spring Return', unit: '', label: 'HANDLE TYPE' },
          { title: '1/2" to 2"', unit: '', label: 'SIZE RANGE' },
          { title: '1000', unit: 'MAWP/WOG', label: 'PRESSURE RATING' },
          { title: 'Safety', unit: '', label: 'CATEGORY' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Operator Safety',
        heading: 'Fail-Safe Protection',
        description: 'Manual ball valves with automatic spring-return action for safety-critical industrial loops.',
        items: [
          { title: 'Deadman Action', body: 'The spring-return handle automatically closes the valve upon release, preventing continuous flow.' },
          { title: '1000 MAWP/WOG', body: 'High pressure rating suitable for both utility water and industrial chemical lines.' },
          { title: 'Compact Safety', body: 'Integrated spring housing minimizes profile while maximizing operational force.' },
          { title: 'Severe Service Build', body: 'Constructed from premium materials to ensure the mechanism never binds in corrosive environments.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Handle Type', value: 'Spring Return / Deadman (Safety Category)' },
          { label: 'Size Range', value: '1/2" to 2"' },
          { label: 'Pressure Ratings', value: '1000 MAWP/WOG' },
          { label: 'Mounting', value: 'Integrally Cast ISO 5211 Mounting Pads' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Emergency Shutoff', body: 'Automatic closure prevents spills during operator incapacitation.', badge: 'Safety' },
          { code: 'APP-02', title: 'Sampling Systems', body: 'Safe extraction of process media with controlled manual drainage.', badge: 'Specialty' },
          { code: 'APP-03', title: 'Fuel Handling', body: 'Provides mandatory fail-safe closure for small fuel feed lines.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need Safety-Category Valve Solutions?',
        description: 'Speak with our team to find the right Flo-Tite Series 145 configuration for your safety-critical requirements.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'flo-tite-series-145-spring-return-deadman-handle', {
      title: 'Flo-Tite Series 145 Spring Return / Deadman Handle (Safety Category)',
      slug: 'flo-tite-series-145-spring-return-deadman-handle',
      sku: 'FT-SERIES-145-SPRING-RETURN---DEADMAN-HANDLE-(SAFETY-CATEGORY)',
      _status: 'published',
      brand: brand.id,
      categories: [categoryMechanical.id, subCategorySpecialty.id],
      description: richText('The Flo-Tite Series 145 Spring Return / Deadman Handle is a safety-category industrial ball valve designed for applications where automatic closure is critical.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Flo-Tite Series 145 Spring Return / Deadman Handle | Terkis',
        description: 'Safety-category spring return / deadman handle ball valve. 1/2" to 2", 1000 MAWP/WOG.',
        image: mainImageId
      }
    }, token)
  }

  // =========================================================================
  // 4. Flo-Tite Trans-Flo Multi-Port MPF 15 / 30 / 60
  // =========================================================================
  {
    console.log('\nSeeding: Flo-Tite Trans-Flo Multi-Port MPF 15 / 30 / 60...')

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '3 & 4-Way', unit: '', label: 'VALVE STYLE' },
          { title: 'Up to 14"', unit: 'FLANGED', label: 'SIZE RANGE' },
          { title: 'Class 150/300/600', unit: 'ANSI', label: 'PRESSURE RATING' },
          { title: 'Up to 550', unit: '°F', label: 'TEMP RANGE' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Complex Routing',
        heading: 'Trans-Flo Multi-Port Flexibility',
        description: 'Versatile 3 and 4-way flanged ball valves for complex multi-stream process routing and manifold reduction.',
        items: [
          { title: 'Multi-Way Routing', body: 'Replaces multiple 2-way valves and tees with a single multi-port unit to reduce footprint.' },
          { title: 'High Pressure Class', body: 'Available in ANSI Class 600 for demanding high-pressure pipeline manifolds.' },
          { title: 'Interchangeable Balls', body: 'Support for L, T, X, and I port ball configurations for any routing logic.' },
          { title: 'Large Bore Options', body: 'Flanged sizes up to 14" allow for high-volume process routing.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Style', value: 'Flanged Multi-Port 3 & 4-Way Valves' },
          { label: 'Size Range (Flanged)', value: '3/4" to 14"' },
          { label: 'Size Range (NPT & Tri-Clamp)', value: '1/2" to 4"' },
          { label: 'Pressure Ratings', value: 'ANSI Class 150, 300, 600' },
          { label: 'Temperature Range', value: 'Up to 550 °F' },
          { label: 'Mounting', value: 'Integrally Cast ISO 5211 Mounting Pads' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Industrial Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Multi-Stream Routing', body: '3 & 4-way configurations allow flexible process routing.', badge: 'Multi-Port' },
          { code: 'APP-02', title: 'Manifold Reduction', body: 'Reduces piping complexity and potential leak points.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Hygienic Process', body: 'Tri-Clamp ends support food and pharma utility routing.', badge: 'Specialty' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need Multi-Port Valve Expertise?',
        description: 'Our team can help you choose between 3-way and 4-way configurations and select the right port logic.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'flo-tite-trans-flo-multi-port-mpf-15-30-60', {
      title: 'Flo-Tite Trans-Flo Multi-Port MPF 15 / 30 / 60',
      slug: 'flo-tite-trans-flo-multi-port-mpf-15-30-60',
      sku: 'FT-TRANS-FLO-MULTI-PORT-MPF-15---30---60',
      _status: 'published',
      brand: brand.id,
      categories: [categoryMechanical.id, subCategoryMultiPort.id],
      description: richText('The Flo-Tite Trans-Flo Multi-Port MPF 15 / 30 / 60 offers flanged 3 & 4-Way ball valve configurations for complex flow routing needs.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Flo-Tite Trans-Flo Multi-Port MPF 15 / 30 / 60 | Terkis',
        description: 'Flanged Multi-Port 3 & 4-Way Ball Valves. ANSI Class 150/300/600, up to 14".',
        image: mainImageId
      }
    }, token)
  }

  console.log('\n✓ Flo-Tite Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
