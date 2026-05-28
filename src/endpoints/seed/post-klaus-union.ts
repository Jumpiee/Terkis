import { RequiredDataFromCollectionSlug } from 'payload'

export const postKlausUnionData: (args: {
  image: string | number
  category: string | number
  author: string | number
}) => RequiredDataFromCollectionSlug<'posts'> = ({ image, category, author }) => {
  return {
    slug: 'klaus-union-partnership-expansion',
    _status: 'published',
    title: 'Terkis Authorized as Exclusive Distributor for Klaus Union SLM-AP Series',
    coverImage: image,
    category: category,
    author: author,
    excerpt:
      'We are pleased to announce our expanded partnership with Klaus Union, bringing the latest SLM-AP magnetic drive pumps to the Thai petrochemical sector.',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Advancing Sealless Technology in Thailand',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: "Terkis Co., Ltd. is proud to announce its appointment as the authorized exclusive distributor for the Klaus Union SLM-AP (American Process) series in Thailand. This expansion reinforces our commitment to providing zero-leakage solutions for high-temperature and hazardous fluid applications in the region's refineries and petrochemical plants.",
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'The SLM-AP series is specifically engineered to meet API 685 standards, offering unparalleled reliability in sealless magnetic drive technology. With the capability to handle temperatures up to 450°C and pressures up to 40 bar, these pumps are the preferred choice for critical process loops where environmental safety and operational uptime are paramount.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  }
}
