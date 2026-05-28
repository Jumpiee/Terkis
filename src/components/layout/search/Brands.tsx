import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Suspense } from 'react'

import { BrandItem } from './Brands.client'

async function BrandList() {
  const payload = await getPayload({ config: configPromise })

  const brands = await payload.find({
    collection: 'brands',
    sort: 'title',
  })

  if (brands.docs.length === 0) return null

  return (
    <ul className="flex flex-col">
      {brands.docs.map((brand) => (
        <li key={brand.id}>
          <BrandItem brand={brand} />
        </li>
      ))}
    </ul>
  )
}

export function Brands() {
  return (
    <Suspense fallback={null}>
      <BrandList />
    </Suspense>
  )
}
