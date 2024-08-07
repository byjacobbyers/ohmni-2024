import { SimpleTextType } from "../objects/simple-text-type"
import { PriceType } from "../objects/price-type"
import { CtaType } from "../objects/cta-type"


export type PriceBlockType = {
  active?: boolean
	componentIndex?: number
	anchor?: string
  content?: SimpleTextType
  columns?: PriceType[]
}