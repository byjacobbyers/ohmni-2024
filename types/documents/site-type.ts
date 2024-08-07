import { SeoType } from '../components/seo-type'
import { SocialType } from '../components/social-type'

export type SiteType = {
	title: string
	altTitle: string
	foundingYear: string
	address: string
	addressLocality: string
	addressRegion: string
	postalCode: string
	addressCountry: string
	founder: string
	social: SocialType
	seo: SeoType
}
