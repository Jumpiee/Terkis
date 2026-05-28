// Run: npx tsx src/endpoints/seed/scripts/seed-dixon-loading-arm.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding DIXON Loading Arms ---')
  const token = await login()
  console.log('✓ Authenticated')

  const brand = await findOrCreate('brands', 'dixon', { title: 'DIXON', slug: 'dixon' }, token)
  const category = await findOrCreate('product-categories', 'mechanical', { title: 'Mechanical', slug: 'mechanical' }, token)

  // 1. Dixon Standard Loading Arm (Top/Bottom)
  {
    console.log('Evaluating: Dixon Standard Loading Arm...')
    const folderDir = path.join(__dirname, 'data', 'dixon_loading_arm')
    const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.png'), 'Dixon Standard Loading Arm Main Image', token)
    const galleryImage1Id = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_1.png'), 'Dixon Standard Loading Arm Gallery 1', token)
    const galleryImage2Id = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_2.png'), 'Dixon Standard Loading Arm Gallery 2', token)

    const gallery = [{ image: mainImageId }, { image: galleryImage1Id }, { image: galleryImage2Id }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '3" and 4"', unit: '', label: 'SIZE OPTIONS' },
          { title: 'Alum / Steel', unit: '', label: 'PIPE MATERIALS' },
          { title: 'Torsion Spring', unit: '', label: 'COUNTERBALANCE' },
          { title: 'ESB1', unit: '', label: 'SPRING MODEL' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Top or bottom articulating pipe loading system utilizing high-strength swivels and torsion spring counterbalance for safe chemical transfer.',
        items: [
          { title: 'Articulating Pipes', body: 'Rigid pipe loading eliminates fluid handling hose kinks, bursts, and safety hazards.' },
          { title: 'Split Flange Swivel', body: 'Base swivel joints allow 360-degree rotation and simplify seal maintenance.' },
          { title: 'Torsion Spring', body: 'Torsion spring counterbalance allows easy manual lifting and docking of the loading arm.' },
          { title: 'Wide Seal Selection', body: 'Sealing options include Nitrile, FKM, PTFE, and EPDM to cover broad process media.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Size Options', value: '3" and 4"' },
          { label: 'Pipe Materials', value: 'Aluminum, Carbon Steel, 316 Stainless Steel' },
          { label: 'Base Swivels', value: 'Carbon Steel V-ring, split flange, or 316 Stainless Steel split flange' },
          { label: 'Seals Options', value: 'Nitrile rubber, FKM, Low temperature FKM, PTFE, EPDM, Food-grade Nitrile' },
          { label: 'Counterbalance', value: 'ESB1 torsion spring (left or right hand)' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Top Railcar Loading', body: 'Articulating top-loading of chemical process fluids and oils.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Bottom Truck Loading', body: 'Allows vapor recovery and bottom product loading at petroleum racks.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Industrial Acid Transfer', body: 'Safe fluid transfer systems for aggressive acids in bulk plants.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Dixon Loading Arm?',
        description: 'Our technical engineering team will custom size the reach and swivel configuration for your facility.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'dixon-loading-arm', {
      title: 'Dixon Loading Arms',
      slug: 'dixon-loading-arm',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Top or bottom articulating pipe loading system utilizing high-strength swivels and torsion spring counterbalance for safe chemical transfer.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Dixon Loading Arms | Terkis',
        description: 'Articulating pipe loading system with split flange swivels and spring counterbalance.',
        image: mainImageId
      }
    }, token)
  }

  // 2. Dixon Scissor Style Loading Arm
  {
    console.log('Evaluating: Dixon Scissor Style Loading Arm...')
    const folderDir = path.join(__dirname, 'data', 'dixon_scissor_loading_arm')
    const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.png'), 'Dixon Scissor Style Loading Arm Main Image', token)
    const galleryImage1Id = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_1.png'), 'Dixon Scissor Style Loading Arm Gallery 1', token)
    const galleryImage2Id = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_2.png'), 'Dixon Scissor Style Loading Arm Gallery 2', token)

    const gallery = [{ image: mainImageId }, { image: galleryImage1Id }, { image: galleryImage2Id }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '2", 3", and 4"', unit: '', label: 'SIZE OPTIONS' },
          { title: 'Extended', unit: '', label: 'HORIZONTAL REACH' },
          { title: 'Scissor Fold', unit: '', label: 'ARM GEOMETRY' },
          { title: 'FKM Standard', unit: '', label: 'SEAL MATERIAL' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Folding scissor-design loading arm offering extended horizontal reach, compact storage, and low-torque manual manipulation.',
        items: [
          { title: 'Scissor Design', body: 'Folding arm geometry enables long horizontal reach while returning to a compact vertical storage profile.' },
          { title: 'Low-Torque Swivels', body: 'Precision double-ball-race swivels provide easy, frictionless manual positioning.' },
          { title: 'Remote Control Valve', body: 'Allows top load valve actuation via a remote mechanical handle kit for safety.' },
          { title: 'Pipe Construction', body: 'Made of aluminum, carbon steel, or 316 stainless steel to ensure media compatibility.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Size Options', value: '2", 3", and 4"' },
          { label: 'Pipe Materials', value: 'Aluminum, Carbon Steel, 316 Stainless Steel' },
          { label: 'Base Swivel', value: 'Carbon Steel split flange base swivel (standard)' },
          { label: 'Seals', value: 'FKM (standard), Nitrile, Low-temp FKM, PTFE, EPDM, Food-grade Nitrile' },
          { label: 'Control Accessories', value: 'Tee deflector, diffuser, top load valve with remote handle kit' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Multi-Compartment Loading', body: 'Extended reach is ideal for loading multiple truck dome compartments without relocating vehicles.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Compact Racks', body: 'Vertical fold fits low-overhead chemical terminals and loading platforms.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Corrosive Transfer', body: 'Stainless steel pipes handle aggressive acids and process solvents.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Dixon Scissor Style Loading Arm?',
        description: 'Our technical engineering team will custom calculate the envelope requirements for your loading terminal.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'dixon-scissor-loading-arm', {
      title: 'Dixon Scissor Style Loading Arm',
      slug: 'dixon-scissor-loading-arm',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Folding scissor-design loading arm offering extended horizontal reach, compact storage, and low-torque manual manipulation.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Dixon Scissor Style Loading Arm | Terkis',
        description: 'Scissor style folding loading arm offering extended horizontal reach and low-torque manual operation.',
        image: mainImageId
      }
    }, token)
  }

  console.log('✓ DIXON Loading Arms Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
