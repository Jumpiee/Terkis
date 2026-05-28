// Run: npx tsx src/endpoints/seed/scripts/seed-victor-pumpen.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding Victor Pumpen ---')
  const token = await login()
  console.log('✓ Authenticated')

  const brand = await findOrCreate('brands', 'victor-pumpen', { title: 'Victor Pumpen', slug: 'victor-pumpen' }, token)
  const category = await findOrCreate('product-categories', 'mechanical', { title: 'Mechanical', slug: 'mechanical' }, token)

  // 1. R-Series Internal Gear Pump
  {
    console.log('Evaluating: Victor Pumpen R-Series Internal Gear Pump...')
    const folderDir = path.join(__dirname, 'data', 'victor_pumpen_r_series_internal_gear_pump')
    const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.jpg'), 'Victor Pumpen R-Series Internal Gear Pump Main Image', token)

    const gallery = [{ image: mainImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: 'Up to 360', unit: 'm³/h', label: 'MAX CAPACITY' },
          { title: 'Up to 16', unit: 'bar', label: 'MAX PRESSURE' },
          { title: '−60 / +350', unit: '°C', label: 'TEMPERATURE RANGE' },
          { title: 'Gear Pump', unit: '', label: 'POSITIVE DISPLACEMENT' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Heavy-duty internal gear pump designed for dosing and transferring non-lubricating, volatile, or highly viscous fluids.',
        items: [
          { title: 'Positive Displacement', body: 'Constant flow rate regardless of pressure variations, ideal for highly viscous fluids.' },
          { title: 'Reversible Flow', body: 'Capable of pumping fluids in both directions by reversing the motor rotation.' },
          { title: 'Wear Resistance', body: 'Available in hardened steel and tungsten carbide configurations for abrasive fluids.' },
          { title: 'Wide Material Options', body: 'Constructed in Cast Iron, Ductile Iron, or Stainless Steel to suit process media.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Max Capacity', value: 'Up to 360 m³/h' },
          { label: 'Max Pressure', value: 'Up to 16 bar' },
          { label: 'Port Sizes', value: 'DN 40 to DN 250 (1-1/4" to 10")' },
          { label: 'Temperature Range', value: '-60°C to +350°C' },
          { label: 'Body Materials', value: 'Cast Iron, Ductile Iron, Stainless Steel' },
          { label: 'Viscosity Handling', value: 'Up to 150,000 mPas' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'High-Viscosity Transfer', body: 'Pumps polymers, resins, bitumen, and molasses with ease.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Chemical Dosing', body: 'Precise dosing of volatile solvents, oils, and chemical reagents.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Abrasive Fluid Pumping', body: 'Handles paints, inks, and loaded slurries with hardened trim.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Victor Pumpen R-Series Pump?',
        description: 'Our technical engineering team will help you configure the gear pump and material overlays for your process.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'victor-pumpen-r-series-internal-gear-pump', {
      title: 'Victor Pumpen R-Series Internal Gear Pump',
      slug: 'victor-pumpen-r-series-internal-gear-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Heavy-duty internal gear pump designed for dosing and transferring non-lubricating, volatile, or highly viscous fluids.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Victor Pumpen R-Series Internal Gear Pump | Terkis',
        description: 'Heavy-duty internal gear pump designed for transferring viscous, non-lubricating, or volatile fluids.',
        image: mainImageId
      }
    }, token)
  }

  // 2. S-Series Self-Priming Centrifugal Pump
  {
    console.log('Evaluating: Victor Pumpen S-Series Self-Priming Pump...')
    const folderDir = path.join(__dirname, 'data', 'victor_pumpen_s_series_self_priming_pump')
    const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.jpg'), 'Victor Pumpen S-Series Self-Priming Pump Main Image', token)

    // Collect gallery images
    const gallery = [{ image: mainImageId }]
    for (let i = 1; i <= 15; i++) {
      const imgFilename = `images/gallery/gallery_${i}.jpeg`
      const imgPath = path.join(folderDir, imgFilename)
      if (fs.existsSync(imgPath)) {
        try {
          const galleryImageId = await uploadMedia(imgPath, `Victor Pumpen S-Series Gallery Image ${i}`, token)
          gallery.push({ image: galleryImageId })
        } catch (e: any) {
          console.warn(`  ⚠ Failed to upload gallery image ${i}: ${e.message}`)
        }
      }
    }

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: 'Up to 600', unit: 'm³/h', label: 'MAX CAPACITY' },
          { title: 'Up to 60', unit: 'mwc', label: 'MAX HEAD' },
          { title: 'Up to 8', unit: 'meters', label: 'MAX SUCTION LIFT' },
          { title: 'Open', unit: '', label: 'IMPELLER TYPE' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Surface-mounted self-priming centrifugal pump with clog-resistant open impeller for solids-laden and abrasive liquids.',
        items: [
          { title: 'Rapid Self-Priming', body: 'Integrates physical priming chamber. Automatically evacuates air from suction lines up to 8m.' },
          { title: 'Open Impeller Design', body: 'Handles large suspended solids (up to 3") without clogging or performance loss.' },
          { title: 'Easy Maintenance', body: 'Replaceable wear plate can be replaced quickly through front inspection cover.' },
          { title: 'Heavy-Duty Bearing Block', body: 'Rugged frame housing with oil lubricated shaft bearings ensures high MTBF.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Max Capacity', value: 'Up to 600 m³/h' },
          { label: 'Max Head', value: 'Up to 60 mwc (meters water column)' },
          { label: 'Max Suction Lift', value: 'Up to 8 meters' },
          { label: 'Max Viscosity', value: 'Up to 50 cSt' },
          { label: 'Body Materials', value: 'Cast Iron, Spheroidal Iron, Stainless Steel (316), Bronze, Aluminum' },
          { label: 'Connections', value: 'Flanged or Threaded (up to 4")' },
          { label: 'Compliance & Standards', value: 'ATEX Zones 1 and 2 available' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Industrial Wastewater', body: 'Pumps dirty, solids-laden sump drainage and slurry effluent.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Emergency Drainage', body: 'Portable diesel or electric driven flood and drainage pump units.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Abrasive Slurry Pumping', body: 'Handles lime slurries, sand mixtures, and abrasive refinery wash waters.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a Victor Pumpen S-Series Pump?',
        description: 'Our technical engineering team will help you size the suction pipe lift and select wetted components.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'victor-pumpen-self-priming-pump', {
      title: 'Victor Pumpen S-Series Self-Priming Pumps',
      slug: 'victor-pumpen-self-priming-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Surface-mounted self-priming centrifugal pump with clog-resistant open impeller for solids-laden and abrasive liquids.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'Victor Pumpen S-Series Self-Priming Pumps | Terkis',
        description: 'Surface-mounted self-priming centrifugal pump with open impeller for solids-laden liquids.',
        image: mainImageId
      }
    }, token)
  }

  console.log('✓ Victor Pumpen Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
