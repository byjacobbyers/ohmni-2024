
import { TextBlockType } from './text-block-type'
import { VideoBlockType } from './video-block-type'
import { CtaBlockType } from './cta-block-type'
import { HeroBlockType } from './hero-block-type'
import { CtaFormType } from './cta-form-type'
import { ColumnBlockType } from './column-block-type'
import { PriceBlockType } from './price-block-type'
import { ReviewBlockType } from './review-block-type'
import { FormBlockType } from './form-block-type'


export type PageBuilderType = [
	TextBlockType,
	VideoBlockType,
	CtaBlockType,
	HeroBlockType,
	CtaFormType,
	ColumnBlockType,
	PriceBlockType,
	ReviewBlockType,
	FormBlockType
]
