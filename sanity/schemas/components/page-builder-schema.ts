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
		{ type: 'ctaForm' },
		{ type: 'columnBlock' },
		{ type: 'priceBlock' },
		{ type: 'reviewBlock' },
		{ type: 'videoBlock' },
		{ type: 'textBlock' },
		{ type: 'formBlock' },
	],
	components: {
		input: PageBuilderInput,
	},
})

export default pageBuilder
