import type { Block } from 'payload'

export const DataSheet: Block = {
  slug: 'dataSheet',
  interfaceName: 'DataSheetBlock',
  labels: {
    singular: 'Data Sheet',
    plural: 'Data Sheets',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Data Sheet',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Operational Matrix',
    },
    {
      name: 'specs',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}
