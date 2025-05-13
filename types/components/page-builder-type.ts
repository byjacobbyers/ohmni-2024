
import { TextBlockType } from './text-block-type'
import { CtaBlockType } from './cta-block-type'
import { HeroBlockType } from './hero-block-type'
import { ColumnBlockType } from './column-block-type'
import { PriceBlockType } from './price-block-type'
import { ReviewBlockType } from './review-block-type'


export type PageBuilderType = [
	TextBlockType,
	CtaBlockType,
	HeroBlockType,
	ColumnBlockType,
	PriceBlockType,
	ReviewBlockType,
]
