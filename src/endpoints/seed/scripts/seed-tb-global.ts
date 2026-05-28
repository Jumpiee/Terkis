// Run: npx tsx src/endpoints/seed/scripts/seed-tb-global.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding TB Global Technologies ---')
  const token = await login()
  console.log('✓ Authenticated')

  const brand = await findOrCreate('brands', 'tb-global-technologies', { title: 'TB Global Technologies', slug: 'tb-global-technologies' }, token)
  const category = await findOrCreate('product-categories', 'mechanical', { title: 'Mechanical', slug: 'mechanical' }, token)

  const folderDir = path.join(__dirname, 'data', 'tb_niigata_chiksan_single_drainage_system')
  const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.png'), 'TB-NIIGATA Chiksan Single Drainage System Main Image', token)

  const gallery = [{ image: mainImageId }]

  const layout = [
    {
      blockType: 'statsBlock',
      blockName: 'Key Figures',
      stats: [
        { title: 'DN 65 to 300', unit: '', label: 'NOMINAL SIZE RANGE' },
        { title: '3.43', unit: 'MPa', label: 'MAX WORKING INT PRESSURE' },
        { title: '0.25', unit: 'MPa', label: 'MAX WORKING EXT PRESSURE' },
        { title: '30', unit: 'years', label: 'EXPECTED SERVICE LIFE' }
      ]
    },
    {
      blockType: 'technicalPillars',
      blockName: 'Engineering Advantages',
      eyebrow: 'Why Choose Us',
      heading: 'Engineering Advantages',
      description: 'Articulating steel pipe drainage system using Chiksan BD swivel joints, replacing flexible hoses in floating roof storage tanks.',
      items: [
        { title: 'Chiksan BD Swivel Joints', body: 'Proven swivel joints ensure fluid-tight mechanical rotation and structural stability.' },
        { title: 'Articulating Piping', body: 'Rigid steel pipelines eliminate hose kinking, tearing, and collapse risks.' },
        { title: 'Double X-ring Seal', body: 'Outer FPM and inner NBR double seal prevents external containment intrusion.' },
        { title: '30-Year Design Life', body: 'Rugged carbon or stainless steel construction significantly outlasts rubber or composite hoses.' }
      ],
      image: mainImageId
    },
    {
      blockType: 'dataSheet',
      blockName: 'Specifications Sheet',
      eyebrow: 'Technical Data',
      heading: 'Operational Matrix',
      specs: [
        { label: 'Size Range', value: 'DN 65 to DN 300 (2-1/2" to 12")' },
        { label: 'Max Internal Pressure', value: '3.43 MPa (34.3 bar / 497 psi)' },
        { label: 'Max External Pressure', value: '0.25 MPa (2.5 bar / 36 psi)' },
        { label: 'Swivel Joint Models', value: 'Chiksan BD / BDR Series' },
        { label: 'Joint Body Material', value: 'S40C Carbon Steel (Stainless overlays)' },
        { label: 'Main Packing Material', value: 'NBR or FPM + Stainless Steel Outer Ring' }
      ]
    },
    {
      blockType: 'applicationsBlock',
      blockName: 'Applications',
      eyebrow: 'Service Conditions',
      heading: 'Industrial Applications',
      applications: [
        { code: 'APP-01', title: 'Tank Roof Drainage', body: 'Reliable rainwater drainage systems inside floating roof oil storage tanks.', badge: 'Mechanical' },
        { code: 'APP-02', title: 'Refinery Bulk Tanks', body: 'Handles heavy aromatic fuel and crude storage tanks draining safety.', badge: 'Mechanical' },
        { code: 'APP-03', title: 'Refinery Terminal Farms', body: 'Replaces older rubber hoses to comply with modern environmental regulations.', badge: 'Mechanical' }
      ]
    },
    {
      blockType: 'ctaBanner',
      blockName: 'CTA',
      heading: 'Need a TB-NIIGATA Drainage System?',
      description: 'Our technical team will help you custom engineer the piping joints configuration for your bulk storage tanks.',
      primaryLabel: 'Request a Quote',
      primaryHref: '/contact',
      secondaryLabel: 'View All Products',
      secondaryHref: '/products'
    }
  ]

  await findOrCreate('products', 'tb-global-niigata-single-drain', {
    title: 'Niigata Single Drainage System',
    slug: 'tb-global-niigata-single-drain',
    _status: 'published',
    brand: brand.id,
    categories: [category.id],
    description: richText('Articulating steel pipe drainage system using Chiksan BD swivel joints, replacing flexible hoses in floating roof storage tanks.'),
    gallery,
    priceInUSDEnabled: false,
    relatedProducts: [],
    layout,
    meta: {
      title: 'Niigata Single Drainage System | Terkis',
      description: 'Articulating steel pipe drainage system using Chiksan BD swivel joints for floating roof storage tanks.',
      image: mainImageId
    }
  }, token)

  console.log('✓ TB Global Technologies Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
