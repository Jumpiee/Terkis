import type { Block } from 'payload'

export const TechnicalPillars: Block = {
  imageURL: '/block-previews/technical_pillars.png',
  imageAltText: 'Preview of the Technical Pillars block layout',
  slug: 'technicalPillars',
  interfaceName: 'TechnicalPillarsBlock',
  labels: {
    singular: 'Technical Pillars',
    plural: 'Technical Pillars',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Technical Pillars',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
