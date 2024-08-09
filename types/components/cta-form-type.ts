import { SimpleTextType } from '../objects/simple-text-type'
import { DefaultImageType } from '../objects/default-img-type'

export type CtaFormType = {
	active?: boolean
	componentIndex?: number
	anchor?: string
  formId?: string
	content?: SimpleTextType
	buttonText?: string
  file?: DefaultImageType
}
