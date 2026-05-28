import type { Block } from 'payload'

export const StatsBlock: Block = {
  imageURL: '/block-previews/stats_block.png',
  imageAltText: 'Preview of the Stats Block layout',
  slug: 'statsBlock',
  interfaceName: 'StatsBlock',
  labels: {
    singular: 'Stats Block',
    plural: 'Stats Blocks',
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'unit', type: 'text' },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}
