import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CarouselBlock } from '@/blocks/Carousel/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ApplicationsBlockComponent } from '@/blocks/ApplicationsBlock/Component'
import { DataSheetBlockComponent } from '@/blocks/DataSheet/Component'
import { StatsBlockComponent } from '@/blocks/StatsBlock/Component'
import { TechDownloadsBlockComponent } from '@/blocks/TechDownloads/Component'
import { TechnicalPillarsBlockComponent } from '@/blocks/TechnicalPillars/Component'
import { ThreeItemGridBlock } from '@/blocks/ThreeItemGrid/Component'
import { toKebabCase } from '@/utilities/toKebabCase'
import React, { Fragment } from 'react'

import type {
  ArchiveBlock as ArchiveBlockType,
  BannerBlock as BannerBlockType,
  CallToActionBlock as CallToActionBlockType,
  CarouselBlock as CarouselBlockType,
  ContentBlock as ContentBlockType,
  FormBlock as FormBlockType,
  MediaBlock as MediaBlockType,
  ApplicationsBlock,
  DataSheetBlock,
  StatsBlock,
  TechDownloadsBlock,
  TechnicalPillarsBlock,
  ThreeItemGridBlock as ThreeItemGridBlockType,
} from '../payload-types'

type LayoutBlock =
  | ApplicationsBlock
  | ArchiveBlockType
  | DataSheetBlock
  | BannerBlockType
  | CallToActionBlockType
  | CarouselBlockType
  | ContentBlockType
  | FormBlockType
  | MediaBlockType
  | StatsBlock
  | TechDownloadsBlock
  | TechnicalPillarsBlock
  | ThreeItemGridBlockType

const blockComponents = {
  applicationsBlock: ApplicationsBlockComponent,
  archive: ArchiveBlock,
  dataSheet: DataSheetBlockComponent,
  banner: BannerBlock,
  carousel: CarouselBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  statsBlock: StatsBlockComponent,
  techDownloads: TechDownloadsBlockComponent,
  technicalPillars: TechnicalPillarsBlockComponent,
  threeItemGrid: ThreeItemGridBlock,
}

export const RenderBlocks: React.FC<{
  blocks: LayoutBlock[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore - weird type mismatch here */}
                  <Block id={toKebabCase(blockName!)} {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
