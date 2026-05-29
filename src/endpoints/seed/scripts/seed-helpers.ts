import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export const BASE_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
export const EMAIL = process.env.SEED_EMAIL ?? 'ai@hotmail.com'
export const PASSWORD = process.env.SEED_PASSWORD ?? 'admin1234'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function api(method: 'GET' | 'POST' | 'PATCH' | 'DELETE', pathStr: string, body?: unknown, token?: string) {
  const res = await fetch(`${BASE_URL}/api${pathStr}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `JWT ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(`[${method} ${pathStr}] ${res.status}: ${JSON.stringify(json)}`)
  return json
}

export async function login(): Promise<string> {
  const data = await api('POST', '/users/login', { email: EMAIL, password: PASSWORD })
  if (!data?.token) throw new Error('Login failed')
  return data.token
}

export async function findOrCreate(
  collection: string,
  slug: string,
  createData: Record<string, unknown>,
  token: string,
): Promise<{ id: string | number }> {
  const params = new URLSearchParams({ 'where[slug][equals]': slug })
  const res = await api('GET', `/${collection}?${params}`, undefined, token)
  if (res.docs?.length > 0) return res.docs[0]
  const created = await api('POST', `/${collection}`, createData, token)
  return created.doc ?? created
}

const MEDIA_STATIC_DIR = path.resolve(__dirname, '../../../../public/media')

export async function uploadMedia(filePath: string, altText: string, token: string): Promise<number> {
  const filename = path.basename(filePath)

  // 1. Check if media already exists in DB AND the file is physically on disk
  const params = new URLSearchParams({ 'where[filename][equals]': filename })
  const searchRes = await api('GET', `/media?${params}`, undefined, token)
  if (searchRes.docs?.length > 0) {
    const existingId = searchRes.docs[0].id
    const physicalPath = path.join(MEDIA_STATIC_DIR, filename)
    if (fs.existsSync(physicalPath)) {
      console.log(`  ✓ Media already exists: ${filename} (id: ${existingId})`)
      return Number(existingId)
    }
    // DB record exists but file is missing from disk — delete the stale record and re-upload
    console.log(`  ⚠ DB record exists but file missing from disk, re-uploading: ${filename}`)
    await api('DELETE', `/media/${existingId}`, undefined, token).catch(() => {})
  }

  // 2. Upload using FormData
  console.log(`  Uploading media: ${filename}...`)
  const fileBuffer = fs.readFileSync(filePath)
  const fileBlob = new Blob([fileBuffer])
  
  const formData = new FormData()
  formData.append('_payload', JSON.stringify({ alt: altText }))
  formData.append('file', fileBlob, filename)
  
  const res = await fetch(`${BASE_URL}/api/media`, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token}`,
    },
    body: formData,
  })
  
  const json = await res.json()
  if (!res.ok) {
    throw new Error(`[POST /media] ${res.status}: ${JSON.stringify(json)}`)
  }
  
  const mediaId = json.doc?.id ?? json.id
  console.log(`  ✓ Media uploaded: ${filename} (id: ${mediaId})`)
  return Number(mediaId)
}

export function richText(text: string) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      children: [
        {
          type: 'paragraph',
          version: 1,
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          textStyle: '',
          children: [
            {
              type: 'text',
              version: 1,
              detail: 0,
              format: 0,
              mode: 'normal' as const,
              style: '',
              text,
            },
          ],
        },
      ],
    },
  }
}

export function richTextWithSections(...paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        version: 1,
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            version: 1,
            detail: 0,
            format: 0,
            mode: 'normal' as const,
            style: '',
            text,
          },
        ],
      })),
    },
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function getCategorySlug(category: string): string {
  const cat = category.toLowerCase().trim()
  if (cat.includes('mech')) return 'mechanical'
  if (cat.includes('elect') || cat.includes('actuator') || cat.includes('control')) return 'electrical'
  if (cat.includes('instrument') || cat.includes('measure') || cat.includes('flow')) return 'instrument'
  return 'mechanical'
}

export function parseStat(label: string, value: string) {
  const units = ['m³/h', 'bar', 'psi', '°C', '°F', 'mm', 'kW', 'in-lbs', 'PSIG', 'V', 'Hz', 'RPM', 'in', '"']
  let foundUnit = ''
  let title = value

  for (const u of units) {
    if (value.includes(u)) {
      foundUnit = u
      title = value.replace(u, '').trim()
      break
    }
  }

  if (title.length > 25) {
    title = title.substring(0, 25)
  }

  return {
    title: title || value,
    unit: foundUnit,
    label: label.toUpperCase(),
  }
}

export function extractOverview(html: string, fallback: string): string {
  const regex = /Product Overview<\/h2>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i
  const match = html.match(regex)
  if (match && match[1]) {
    return match[1].replace(/<[^>]*>/g, '').trim()
  }
  
  const firstPRegex = /<p[^>]*>([\s\S]*?)<\/p>/i
  const firstPMatch = html.match(firstPRegex)
  if (firstPMatch && firstPMatch[1]) {
    const text = firstPMatch[1].replace(/<[^>]*>/g, '').trim()
    if (text.length > 50) return text
  }

  return fallback
}

export function extractKeyFeatures(html: string): { title: string; body: string }[] {
  const regex = /Key Features & Technical Advantages<\/h2>[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/i
  const match = html.match(regex)
  const features: { title: string; body: string }[] = []
  
  let listHtml = ''
  if (match && match[1]) {
    listHtml = match[1]
  } else {
    const fallbackRegex = /Key Features<\/h2>[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/i
    const fallbackMatch = html.match(fallbackRegex)
    if (fallbackMatch && fallbackMatch[1]) {
      listHtml = fallbackMatch[1]
    }
  }

  if (listHtml) {
    const listItems = listHtml.match(/<li[^>]*>([\s\S]*?)<\/li>/gi)
    if (listItems) {
      for (const item of listItems) {
        const strongMatch = item.match(/<strong[^>]*>([\s\S]*?)<\/strong>/i)
        if (strongMatch && strongMatch[1]) {
          const title = strongMatch[1].replace(/<[^>]*>/g, '').replace(/:$/, '').trim()
          const body = item.replace(/<strong[^>]*>[\s\S]*?<\/strong>/i, '').replace(/<[^>]*>/g, '').trim()
          if (title && body) {
            features.push({ title, body })
          }
        } else {
          const cleanItem = item.replace(/<[^>]*>/g, '').trim()
          const colonIndex = cleanItem.indexOf(':')
          if (colonIndex > 0) {
            const title = cleanItem.substring(0, colonIndex).trim()
            const body = cleanItem.substring(colonIndex + 1).trim()
            features.push({ title, body })
          }
        }
      }
    }
  }

  return features
}

export function extractApplications(html: string, category: string): string[] {
  const regex = /Industrial Applications<\/h2>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i
  const match = html.match(regex)
  let text = ''
  if (match && match[1]) {
    text = match[1].replace(/<[^>]*>/g, '').trim()
  } else {
    const fallbackRegex = /Applications<\/h2>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i
    const fallbackMatch = html.match(fallbackRegex)
    if (fallbackMatch && fallbackMatch[1]) {
      text = fallbackMatch[1].replace(/<[^>]*>/g, '').trim()
    }
  }

  if (text) {
    return text
      .split(/,|\band\b|;/)
      .map(s => s.trim())
      .filter(s => s.length > 3 && s.length < 100)
  }

  if (category.toLowerCase() === 'mechanical') {
    return ['Chemical processing', 'Oil & gas transfer', 'Water supply systems']
  } else if (category.toLowerCase() === 'electrical') {
    return ['Valve automation', 'Industrial power systems', 'Remote monitoring']
  } else {
    return ['Flow measurement', 'Process control', 'Industrial telemetry']
  }
}

export function extractSectionParagraph(html: string, sectionKeywords: string[]): string | null {
  for (const keyword of sectionKeywords) {
    const escKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    const regex = new RegExp(`${escKeyword}<\\/h2>[\\s\S]*?<p[^>]*>([\\s\S]*?)<\\/p>`, 'i')
    const match = html.match(regex)
    if (match && match[1]) {
      return match[1].replace(/<[^>]*>/g, '').trim()
    }
  }
  return null
}

export async function seedProduct(
  folderName: string,
  token: string,
  layoutOverride?: (
    metadata: any,
    mainImageId: number | null,
    galleryImageIds: number[],
    htmlContent: string
  ) => any[]
) {
  const dataDir = path.join(__dirname, 'data')
  const dirPath = path.join(dataDir, folderName)
  const metadataPath = path.join(dirPath, 'metadata.json')
  const htmlPath = path.join(dirPath, 'description.html')

  if (!fs.existsSync(metadataPath)) {
    throw new Error(`metadata.json not found in ${folderName}`)
  }

  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))
  const productSlug = slugify(metadata.name)

  console.log(`\nEvaluating product: "${metadata.name}" (${folderName})...`)

  // 1. Check if product already exists
  const slugParams = new URLSearchParams({ 'where[slug][equals]': productSlug })
  const searchProd = await api('GET', `/products?${slugParams}`, undefined, token)
  if (searchProd.docs?.length > 0) {
    console.log(`✓ Product already exists: "${metadata.name}" (slug: ${productSlug}) - Skipping`)
    return searchProd.docs[0]
  }

  // 2. Brand
  const brandSlug = slugify(metadata.brand)
  const brand = await findOrCreate('brands', brandSlug, { title: metadata.brand, slug: brandSlug }, token)
  console.log(`  Brand: ${metadata.brand} (id: ${brand.id})`)

  // 3. Category
  const categorySlug = getCategorySlug(metadata.category)
  const categoryTitle = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)
  const category = await findOrCreate(
    'product-categories',
    categorySlug,
    { title: categoryTitle, slug: categorySlug },
    token,
  )
  console.log(`  Category: ${categoryTitle} (id: ${category.id})`)

  // 4. Upload Images
  let mainImageId: number | null = null
  if (metadata.main_image) {
    const mainImagePath = path.join(dirPath, metadata.main_image)
    if (fs.existsSync(mainImagePath)) {
      try {
        mainImageId = await uploadMedia(mainImagePath, `${metadata.name} Main Image`, token)
      } catch (e: any) {
        console.warn(`  ⚠ Failed to upload main image: ${e.message}`)
      }
    }
  }

  const gallery: { image: number }[] = []
  if (mainImageId) {
    gallery.push({ image: mainImageId })
  }

  const galleryImageIds: number[] = []
  if (metadata.gallery_images && Array.isArray(metadata.gallery_images)) {
    for (const imgPath of metadata.gallery_images) {
      const fullImgPath = path.join(dirPath, imgPath)
      if (fs.existsSync(fullImgPath)) {
        try {
          const galleryImageId = await uploadMedia(fullImgPath, `${metadata.name} Gallery Image`, token)
          galleryImageIds.push(galleryImageId)
          gallery.push({ image: galleryImageId })
        } catch (e: any) {
          console.warn(`  ⚠ Failed to upload gallery image ${imgPath}: ${e.message}`)
        }
      }
    }
  }

  // Fallback if gallery is empty (validation requires minRows: 1)
  if (gallery.length === 0) {
    console.warn(`  ⚠ No images found. Using fallback hat-logo.png if available.`)
    const fallbackPath = path.join(__dirname, '..', 'hat-logo.png')
    if (fs.existsSync(fallbackPath)) {
      try {
        const fallbackId = await uploadMedia(fallbackPath, `${metadata.name} Fallback Image`, token)
        gallery.push({ image: fallbackId })
      } catch (e: any) {
        console.error(`  ✗ Failed to upload fallback image: ${e.message}`)
      }
    }
  }

  // 5. Parse HTML
  let htmlContent = ''
  if (fs.existsSync(htmlPath)) {
    htmlContent = fs.readFileSync(htmlPath, 'utf8')
  }

  const overviewText = extractOverview(htmlContent, metadata.short_description)

  // 6. Build Layout Blocks
  let layout: any[] = []
  if (layoutOverride) {
    layout = layoutOverride(metadata, mainImageId, galleryImageIds, htmlContent)
  } else {
    // Default layout generation logic
    const keyFeatures = extractKeyFeatures(htmlContent)
    const applications = extractApplications(htmlContent, metadata.category)
    const workingPrinciple = extractSectionParagraph(htmlContent, [
      'Working Principle & Design',
      'Working Principle',
      'Principle & Design',
    ])
    const maintenance = extractSectionParagraph(htmlContent, [
      'Maintenance, Safety & Warranty',
      'Maintenance',
      'Warranty',
    ])

    // A. statsBlock
    const stats: any[] = []
    const entries = Object.entries(metadata.attributes || {})
    for (let i = 0; i < 4; i++) {
      const entry = entries[i]
      if (entry) {
        stats.push(parseStat(entry[0], String(entry[1])))
      } else {
        stats.push({
          title: '100%',
          unit: '',
          label: 'QUALITY GUARANTEED',
        })
      }
    }
    layout.push({
      blockType: 'statsBlock',
      blockName: 'Key Performance Figures',
      stats,
    })

    // B. Working Principle (Content)

    // C. technicalPillars
    if (keyFeatures.length > 0 && mainImageId) {
      layout.push({
        blockType: 'technicalPillars',
        blockName: 'Engineering Advantages',
        eyebrow: 'Why Choose Us',
        heading: 'Engineering Advantages',
        description: 'Key technological features and operational benefits.',
        items: keyFeatures.slice(0, 8),
        image: mainImageId,
      })
    }

    // D. dataSheet
    const specs = Object.entries(metadata.attributes || {}).map(([label, value]) => ({
      label,
      value: String(value),
    }))
    if (specs.length > 0) {
      layout.push({
        blockType: 'dataSheet',
        blockName: 'Technical Specifications',
        eyebrow: 'Technical Data',
        heading: 'Operational Matrix',
        specs,
      })
    }

    // E. applicationsBlock
    const appItems = []
    const limit = Math.floor(applications.length / 3) * 3 || 3
    for (let i = 0; i < limit; i++) {
      const name = applications[i]
      appItems.push({
        code: `APP-${String(i + 1).padStart(2, '0')}`,
        title: name.charAt(0).toUpperCase() + name.slice(1),
        body: `Optimized performance for ${name} service conditions.`,
        badge: metadata.category,
      })
    }
    layout.push({
      blockType: 'applicationsBlock',
      blockName: 'Industrial Applications',
      eyebrow: 'Service Conditions',
      heading: 'Industrial Applications',
      applications: appItems,
    })

    // F. Maintenance (Content)

    // G. ctaBanner
    layout.push({
      blockType: 'ctaBanner',
      blockName: 'Request Quote CTA',
      heading: `Need a ${metadata.name}?`,
      description: `Our engineering team will help you select the right model for your operational requirements.`,
      primaryLabel: 'Request a Quote',
      primaryHref: '/contact',
      secondaryLabel: 'View All Products',
      secondaryHref: '/products',
    })
  }

  // 7. Create product
  const product = await api(
    'POST',
    '/products',
    {
      title: metadata.name,
      slug: productSlug,
      _status: 'published',
      brand: brand.id,
      categories: [category.id],
      description: richText(overviewText),
      gallery: gallery,
      priceInUSDEnabled: false,
      relatedProducts: [],
      layout,
      meta: {
        title: `${metadata.name} | Terkis`,
        description: metadata.short_description.substring(0, 150),
        image: mainImageId,
      },
    },
    token,
  )
  console.log(`✓ Product created successfully: "${product.doc?.title}" → /products/${product.doc?.slug}`)
  return product.doc ?? product
}
