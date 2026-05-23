import type { Block } from 'payload'

export const TechDownloads: Block = {
  slug: 'techDownloads',
  interfaceName: 'TechDownloadsBlock',
  imageURL: '/block-previews/tech_downloads_block.png',
  imageAltText: 'Preview of the Tech Downloads Block layout',
  labels: {
    singular: 'Tech Downloads',
    plural: 'Tech Downloads',
  },
  fields: [
    // Left column
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Support Materials',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Technical Downloads',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'documents',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'file', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    // Right column — CTA panel
    {
      name: 'ctaEyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Direct Engineering Support',
    },
    {
      name: 'ctaHeading',
      type: 'text',
      required: true,
      defaultValue: 'Request a Custom Sizing Report',
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'ctaInputLabel',
      type: 'text',
      required: true,
      defaultValue: 'Process Medium',
    },
    {
      name: 'ctaInputPlaceholder',
      type: 'text',
      defaultValue: 'e.g. Sulfuric Acid 98%',
    },
    {
      name: 'ctaButtonLabel',
      type: 'text',
      required: true,
      defaultValue: 'Submit Request',
    },
  ],
}
