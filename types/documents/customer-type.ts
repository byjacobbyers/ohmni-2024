import { DefaultImageType } from '../objects/default-img-type'

export type CustomerType = {
	active: boolean
	title: string
	url: string
	image: DefaultImageType
	descender: number
	_type: 'customer'
	_key?: string
}
