// Run: npx tsx src/endpoints/seed/scripts/seed-aircon.ts
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { login, findOrCreate, uploadMedia, richText } from './seed-helpers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('\n--- Seeding AIRCON ---')
  const token = await login()
  console.log('✓ Authenticated')

  const brand = await findOrCreate('brands', 'aircon', { title: 'AIRCON', slug: 'aircon' }, token)
  const category = await findOrCreate('product-categories', 'electrical', { title: 'Electrical', slug: 'electrical' }, token)

  const folderDir = path.join(__dirname, 'data', 'aircon_c_series_pneumatic_actuator')
  const mainImageId = await uploadMedia(path.join(folderDir, 'images/main.png'), 'AIRCON C Series Pneumatic Actuator Main Image', token)
  const galleryImage1Id = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_1.png'), 'AIRCON C Series Pneumatic Actuator Gallery Image 1', token)
  const galleryImage2Id = await uploadMedia(path.join(folderDir, 'images/gallery/gallery_2.png'), 'AIRCON C Series Pneumatic Actuator Gallery Image 2', token)

  const gallery = [{ image: mainImageId }, { image: galleryImage1Id }, { image: galleryImage2Id }]

  const layout = [
    {
      blockType: 'statsBlock',
      blockName: 'Key Figures',
      stats: [
        { title: '2" to 12"', unit: '', label: 'SIZE RANGE' },
        { title: 'Up to 28,500', unit: 'in-lbs', label: 'TORQUE RANGE' },
        { title: '40 to 150', unit: 'PSIG', label: 'OPERATING PRESSURE' },
        { title: '90° / ±5°', unit: '', label: 'ROTATIONAL STROKE' }
      ]
    },
    {
      blockType: 'content',
      blockName: 'Working Principle',
      columns: [
        {
          size: 'full',
          richText: richText('The actuator operates on a dual-piston rack and pinion mechanism. Compressed air enters the cylinder chambers, driving the pistons inward or outward. The linear motion of the pistons is converted into 90° rotational torque through the integrated pinion gear, operating the attached valve.')
        }
      ]
    },
    {
      blockType: 'technicalPillars',
      blockName: 'Engineering Advantages',
      eyebrow: 'Why Choose Us',
      heading: 'Engineering Advantages',
      description: 'Heavy-duty pneumatic actuators offering precise torque, extreme durability, and universal industrial compliance.',
      items: [
        { title: 'Extruded Aluminum Casing', body: 'Hard-anodized internal and external surfaces resist environmental wear and friction.' },
        { title: 'Travel Adjustments', body: 'Features ±5° bi-directional travel stop adjustments on the pinion rotation.' },
        { title: 'Blow-out Proof Pinion', body: 'Nickel alloy steel pinion gear design ensures structural safety under pressure.' },
        { title: 'Double Acting & Spring Return', body: 'Flexible configurations for fail-safe open/close process requirements.' }
      ],
      image: mainImageId
    },
    {
      blockType: 'dataSheet',
      blockName: 'Specifications Sheet',
      eyebrow: 'Technical Specs',
      heading: 'Operational Matrix',
      specs: [
        { label: 'Size Range', value: '2" to 12" (Models 52-270)' },
        { label: 'Torque Range', value: '50 Thru 28,500 in-lbs (at 80 PSIG supply)' },
        { label: 'Operating Pressure', value: '40 to 150 PSIG' },
        { label: 'Body Material', value: 'Hard-anodized Extruded Aluminum Alloy' },
        { label: 'End Cap Material', value: 'Die Cast Aluminum with powder polyester paint' },
        { label: 'Fasteners', value: 'Stainless Steel 304' },
        { label: 'Rotational Stroke', value: '90° (with ±5° adjustability)' },
        { label: 'Temperature Range', value: '-4°F to 175°F (Standard); -40°F to 300°F (Optional)' }
      ]
    },
    {
      blockType: 'applicationsBlock',
      blockName: 'Applications',
      eyebrow: 'Service Conditions',
      heading: 'Industrial Applications',
      applications: [
        { code: 'APP-01', title: 'Valve Automation', body: 'Standard automated control of quarter-turn ball and butterfly valves.', badge: 'Electrical' },
        { code: 'APP-02', title: 'Refinery Processes', body: 'Reliable flow throttling in petrochemical process pipelines.', badge: 'Electrical' },
        { code: 'APP-03', title: 'Water Systems', body: 'Corrosion-free automation for remote industrial water treatment lines.', badge: 'Electrical' }
      ]
    },
    {
      blockType: 'content',
      blockName: 'Maintenance & Standards',
      columns: [
        {
          size: 'full',
          richText: richText('Pre-lubricated internals ensure long maintenance-free service. Accessories mount easily via standard NAMUR VDI/VDE 3845 dimensions. Enclosure is certified NEMA 4/4X and IP67 powder-coated. Standard 12-month manufacturer warranty.')
        }
      ]
    },
    {
      blockType: 'ctaBanner',
      blockName: 'CTA',
      heading: 'Need an AIRCON Pneumatic Actuator?',
      description: 'Our technical team will help you size the torque requirements for your industrial valves.',
      primaryLabel: 'Request a Quote',
      primaryHref: '/contact',
      secondaryLabel: 'View All Products',
      secondaryHref: '/products'
    }
  ]

  await findOrCreate('products', 'aircon-valve-actuators', {
    title: 'AIRCON C Series Pneumatic Actuator',
    slug: 'aircon-valve-actuators',
    _status: 'published',
    brand: brand.id,
    categories: [category.id],
    description: richText('Heavy-duty rack and pinion pneumatic actuator with dual opposed pistons, ±5° travel stop adjustments, and NAMUR standard interface for industrial valve automation.'),
    gallery,
    priceInUSDEnabled: false,
    relatedProducts: [],
    layout,
    meta: {
      title: 'AIRCON C Series Pneumatic Actuator | Terkis',
      description: 'Heavy-duty rack and pinion pneumatic actuator with dual opposed pistons, ±5° travel stop adjustments, and NAMUR standard interface.',
      image: mainImageId
    }
  }, token)

  console.log('✓ AIRCON Seeding Complete')
}

main().catch((err) => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
