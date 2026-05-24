// Run: npx tsx src/endpoints/seed/scripts/seed-homa-pumpen.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding HOMA PUMPEN ---')
  const token = await login()
  console.log('✓ Authenticated')

  const brand = await findOrCreate('brands', 'homa-pumpen', { title: 'HOMA PUMPEN', slug: 'homa-pumpen' }, token)
  const category = await findOrCreate('product-categories', 'mechanical', { title: 'Mechanical', slug: 'mechanical' }, token)

  // 1. HOMA CMX(S) Stainless Steel Sewage Pump
  {
    console.log('Evaluating: HOMA CMX(S)...')
    const folderDir = path.join(__dirname, 'data', 'homa_cmxs_stainless_sewage_pump')
    const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.png'), 'HOMA CMXS Pump Main Image', token)
    const galleryImageId = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_1.png'), 'HOMA CMXS Pump Gallery Image', token)

    const gallery = [{ image: mainImageId }, { image: galleryImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '68.2 to 384.1', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: '2.0 to 42.1', unit: 'm', label: 'MAX HEAD' },
          { title: 'DN 80 - 150', unit: '', label: 'DISCHARGE FLANGE' },
          { title: '80 to 100', unit: 'mm', label: 'SPHERICAL CLEARANCE' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Corrosion-resistant stainless steel submersible pump with single-channel impeller for acid/alkaline sewage.',
        items: [
          { title: 'Stainless Steel Build', body: 'Fully cast stainless steel wet-end parts ensure corrosion resistance in chemical effluents.' },
          { title: 'Single-Channel Impeller', body: 'Enables high-efficiency operation while handling large suspended solids (up to 100mm).' },
          { title: 'Class H Insulation', body: 'High-temperature motor windings rated up to 180°C protect against overload.' },
          { title: 'IP 68 Protection', body: 'Submersible design with dual mechanical shaft seals operates continuously flooded.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Spherical Clearance', value: '80 to 100 mm' },
          { label: 'Discharge Flange', value: 'DN 80 / DN 100 / DN 150' },
          { label: 'Max Flow Rate', value: '68.2 to 384.1 m³/h' },
          { label: 'Max Head', value: '2.0 to 42.1 m' },
          { label: 'Body Material', value: 'Stainless Steel wet-end components' },
          { label: 'Protection Rating', value: 'IP 68' },
          { label: 'Solids Handling', value: 'Up to 100 mm (4") free passage' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Chemical Effluent', body: 'Pumps acid/alkaline wastewater and aggressive sewage in industrial plants.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Food Processing Sump', body: 'Corrosion-free pumping of washing water and organic waste slurry.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Aggressive Drainage', body: 'Submersible drainage of mineralized and corrosive mine drainage water.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a HOMA CMX(S) Stainless Pump?',
        description: 'Our technical team will help you size the pump head and verify chemical compatibility for your process.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'homa-cmxs-stainless-sewage-pump', {
      title: 'HOMA CMX(S) Stainless Steel Sewage Pump',
      slug: 'homa-cmxs-stainless-sewage-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Corrosion-resistant stainless steel submersible pump with single-channel impeller for acid/alkaline sewage.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'HOMA CMX(S) Stainless Steel Sewage Pump | Terkis',
        description: 'Stainless steel submersible pump with single-channel impeller for corrosive sewage.',
        image: mainImageId
      }
    }, token)
  }

  // 2. HOMA Single Channel Sewage Pump
  {
    console.log('Evaluating: HOMA Single Channel...')
    const folderDir = path.join(__dirname, 'data', 'homa_single_channel_sewage_pump')
    const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.png'), 'HOMA Single Channel Pump Main Image', token)
    const galleryImageId = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_1.png'), 'HOMA Single Channel Pump Gallery Image', token)

    const gallery = [{ image: mainImageId }, { image: galleryImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '72.0 to 390.0', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: '4.8 to 42.2', unit: 'm', label: 'MAX HEAD' },
          { title: '1.7 to 43.0', unit: 'kW', label: 'MOTOR POWER P1' },
          { title: '80 to 100', unit: 'mm', label: 'SPHERICAL CLEARANCE' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Submersible sewage pump with high-efficiency single channel impeller and large solid clearance for raw municipal wastewater.',
        items: [
          { title: 'High Flow Capacity', body: 'Enables high-volume pumping up to 390 m³/h, ideal for storm water and municipal mains.' },
          { title: 'Clog-Free Operation', body: 'Closed single-channel impeller design prevents ragging and handles large solids (up to 100mm).' },
          { title: 'Class H Motor', body: 'Equipped with heavy-duty thermal protection sensor loops in the stator.' },
          { title: 'Explosion Proof', body: 'Available in FM and ATEX certified explosion proof versions for wet wells.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Spherical Clearance', value: '80 to 100 mm' },
          { label: 'Discharge Flange', value: 'DN 80 / DN 100 / DN 150' },
          { label: 'Max Flow Rate', value: '72.0 to 390.0 m³/h' },
          { label: 'Max Head', value: '4.8 to 42.2 m' },
          { label: 'Motor Power P1', value: '1.7 to 43.0 kW' },
          { label: 'Rotational Speed', value: '2900 / 1450 / 960 rpm' },
          { label: 'Solids Handling', value: 'Up to 100 mm (4") free passage' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Municipal Sewage Racks', body: 'Pumps raw municipal wastewater to primary clarifying tanks.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Industrial Wastewater', body: 'Continuous discharge of large solids-laden effluents from factory mains.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Rainwater Retention', body: 'Empties rainwater buffering reservoirs during flood safety loops.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a HOMA Single Channel Sewage Pump?',
        description: 'Our engineering team will help you size the discharge line and calculate head loss for your lift station.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'homa-pumpen-submersible-sewage-pump', {
      title: 'HOMA Submersible Sewage Pumps',
      slug: 'homa-pumpen-submersible-sewage-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Submersible sewage pump with high-efficiency single channel impeller and large solid clearance for raw municipal wastewater.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'HOMA Submersible Sewage Pumps | Terkis',
        description: 'Submersible sewage pump with high-efficiency single channel impeller and large solid clearance.',
        image: mainImageId
      }
    }, token)
  }

  // 3. HOMA V(X) Vortex Submersible Sewage Pump
  {
    console.log('Evaluating: HOMA Vortex...')
    const folderDir = path.join(__dirname, 'data', 'homa_vx_vortex_sewage_pump')
    const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.png'), 'HOMA Vortex Sewage Pump Main Image', token)
    const galleryImageId = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_1.png'), 'HOMA Vortex Sewage Pump Gallery Image', token)

    const gallery = [{ image: mainImageId }, { image: galleryImageId }]

    const layout = [
      {
        blockType: 'statsBlock',
        blockName: 'Key Figures',
        stats: [
          { title: '54.0 to 228.0', unit: 'm³/h', label: 'MAX FLOW RATE' },
          { title: '7.0 to 53.8', unit: 'm', label: 'MAX HEAD' },
          { title: '1.3 to 25.4', unit: 'kW', label: 'MOTOR POWER P2' },
          { title: 'Vortex', unit: '', label: 'IMPELLER TYPE' }
        ]
      },
      {
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Submersible sewage pump with vortex (recessed) impeller, ideal for gas-containing fluids and highly abrasive solids.',
        items: [
          { title: 'Vortex Impeller', body: 'The recessed impeller creates a vortex swirl in the pump casing, reducing direct fluid-impeller contact.' },
          { title: 'High Solid Clearance', body: 'Provides complete 80-100mm free passage, preventing fibrous rags from winding on impeller blades.' },
          { title: 'Gassy Liquid Handling', body: 'Vortex action easily handles entrained gas bubbles and vapor lock potentials.' },
          { title: 'Rugged Bearing Block', body: 'Equipped with heavy-duty wear-resistant bearings and double mechanical seals.' }
        ],
        image: mainImageId
      },
      {
        blockType: 'dataSheet',
        blockName: 'Specifications Sheet',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs: [
          { label: 'Spherical Clearance', value: '80 to 100 mm' },
          { label: 'Discharge Flange', value: 'DN 80 to DN 100' },
          { label: 'Max Flow Rate', value: '54.0 to 228.0 m³/h' },
          { label: 'Max Head', value: '7.0 to 53.8 m' },
          { label: 'Motor Power P2', value: '1.3 to 25.4 kW' },
          { label: 'Rotational Speed', value: '2900 / 1450 / 960 rpm' },
          { label: 'Solids Handling', value: 'Up to 100 mm (4") free passage' }
        ]
      },
      {
        blockType: 'applicationsBlock',
        blockName: 'Applications',
        eyebrow: 'Service Conditions',
        heading: 'Industrial Applications',
        applications: [
          { code: 'APP-01', title: 'Fibrous Sewage Racks', body: 'Pumps sewage containing rags, fibers, and heavy solid sludge.', badge: 'Mechanical' },
          { code: 'APP-02', title: 'Abrasive Swirl Sumps', body: 'Submersible handling of sand-filled water and abrasive quarry drainage.', badge: 'Mechanical' },
          { code: 'APP-03', title: 'Gassy Sludge Wells', body: 'Handles active biological sludge holding tanks where outgassing occurs.', badge: 'Mechanical' }
        ]
      },
      {
        blockType: 'ctaBanner',
        blockName: 'CTA',
        heading: 'Need a HOMA Vortex Sewage Pump?',
        description: 'Our technical team will help you configure the vortex impeller and wear linings for your abrasive process.',
        primaryLabel: 'Request a Quote',
        primaryHref: '/contact',
        secondaryLabel: 'View All Products',
        secondaryHref: '/products'
      }
    ]

    await findOrCreate('products', 'homa-vx-vortex-sewage-pump', {
      title: 'HOMA V(X) Vortex Submersible Sewage Pump',
      slug: 'homa-vx-vortex-sewage-pump',
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText('Submersible sewage pump with vortex (recessed) impeller, ideal for gas-containing fluids and highly abrasive solids.'),
      gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: 'HOMA V(X) Vortex Sewage Pump | Terkis',
        description: 'Submersible sewage pump with vortex impeller for gas-containing and abrasive liquids.',
        image: mainImageId
      }
    }, token)
  }

  console.log('✓ HOMA PUMPEN Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
