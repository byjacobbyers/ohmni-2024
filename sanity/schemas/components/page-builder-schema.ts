import { defineField } from 'sanity'
import PageBuilderInput from './page-builder-input'

const pageBuilder = defineField({
	title: 'Page sections',
	name: 'sections',
	type: 'array',
	group: 'pagebuilder',
	of: [
		{ type: 'heroBlock'},
		{ type: 'ctaBlock' },
		{ type: 'columnBlock' },
		{ type: 'priceBlock' },
		{ type: 'reviewBlock' },
		{ type: 'textBlock' },
		{ type: 'customerRef' },
    { type: 'formBlock' },
    { type: 'faqBlock' },
    { type: 'imageBlock' },
    { type: 'galleryBlock' },
    { type: 'videoBlock' },
    { type: 'spacerBlock' },
    { type: 'dividerBlock' },
	],
	components: {
		input: PageBuilderInput,
	},
})

export default pageBuilder
