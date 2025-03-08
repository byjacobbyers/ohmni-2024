import { SeoType } from '../components/seo-type'
import { NavObjectType } from '../objects/navigation-obj-type'
import { PageBuilderType } from '../components/page-builder-type'
import { SimpleTextType } from '../objects/simple-text-type'

export type PageType = {
	_id: string
	_createdAt: Date
	_updatedAt: Date
	title: string
  shortKey: string
	slug: {
		current: string
	}
	sections: PageBuilderType
	pageNav: NavObjectType
	seo: SeoType
}
