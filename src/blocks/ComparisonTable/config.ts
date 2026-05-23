import type { Block } from 'payload'

export const ComparisonTable: Block = {
  slug: 'comparisonTable',
  interfaceName: 'ComparisonTableBlock',
  imageURL: '/block-previews/comparison_table.png',
  imageAltText: 'Preview of the Comparison Table layout',
  labels: {
    singular: 'Comparison Table',
    plural: 'Comparison Tables',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Column Headers',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'code', type: 'text', required: true, label: 'Code (e.g. VAR-01)' },
        { name: 'label', type: 'text', required: true, label: 'Column Title' },
        { name: 'sub', type: 'text', label: 'Sub-label' },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Data Rows',
      minRows: 1,
      fields: [
        { name: 'param', type: 'text', required: true, label: 'Parameter / Spec Name' },
        {
          name: 'values',
          type: 'array',
          label: 'Values (one per column, in order)',
          minRows: 1,
          maxRows: 6,
          fields: [{ name: 'cell', type: 'text', required: true }],
        },
      ],
    },
  ],
}
