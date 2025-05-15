import { CtaType } from './cta-type'

export type PriceType = {
  featured?: boolean
	title?: string
  pricingType?: 'retainer' | 'oneTime'
  price?: number
  cta?: CtaType
  offer?: string
  perks?: string[]
}