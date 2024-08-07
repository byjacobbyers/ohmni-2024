import { SimpleTextType } from '../objects/simple-text-type'
import { DefaultImageType } from '../objects/default-img-type'
import { CtaType } from '../objects/cta-type'

export type HeroBlockType = {
	active?: boolean
	componentIndex?: number
	anchor?: string
  formId?: string
  image?: DefaultImageType
	content?: SimpleTextType
  cta?: CtaType
}