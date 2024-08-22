import { SimpleTextType } from '../objects/simple-text-type'

export type FormBlockType = {
	active?: boolean
	componentIndex?: number
	anchor?: string
  formId?: string
	content?: SimpleTextType
	formContent?: SimpleTextType
}