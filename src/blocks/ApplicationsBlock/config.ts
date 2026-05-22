import type { Block } from 'payload'

export const ApplicationsBlock: Block = {
  slug: 'applicationsBlock',
  interfaceName: 'ApplicationsBlock',
  labels: {
    singular: 'Applications Block',
    plural: 'Applications Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Service Conditions',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Industrial Applications',
    },
    {
      name: 'applications',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'code', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        { name: 'badge', type: 'text', required: true },
      ],
    },
  ],
}
