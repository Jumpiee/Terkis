import type { Block } from 'payload'

export const CtaBanner: Block = {
  slug: 'ctaBanner',
  interfaceName: 'CtaBannerBlock',
  imageURL: '/block-previews/cta_banner_block.png',
  imageAltText: 'Preview of the CTA Banner Block layout',
  labels: {
    singular: 'CTA Banner',
    plural: 'CTA Banners',
  },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'primaryLabel', type: 'text', required: true, defaultValue: 'Contact Us' },
    { name: 'primaryHref', type: 'text', required: true, defaultValue: '/contact' },
    { name: 'secondaryLabel', type: 'text', required: true, defaultValue: 'View All Products' },
    { name: 'secondaryHref', type: 'text', required: true, defaultValue: '/products' },
  ],
}
