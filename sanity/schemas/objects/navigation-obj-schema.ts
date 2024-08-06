import { defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

const navObject = defineType({
	title: 'Navigation',
	name: 'navObject',
	description: 'Navigation. Leave blank to use default navigation.',
	icon: LinkIcon,
	type: 'object',
	options: {
		collapsible: true,
	},
	initialValue: {
		header: {
			_type: 'reference',
			_ref: '1803e92e-e49f-4cd4-bc51-e4aabae093b9',
		},
		footer: {
			_type: 'reference',
			_ref: 'c36f384a-3a07-4c3d-a683-ca94cb91974d',
		},
	},
	fields: [
		{
			name: 'header',
			title: 'Header',
			type: 'reference',
			to: [{ type: 'navigation' }],
		},
		{
			name: 'footer',
			title: 'Footer',
			type: 'reference',
			to: [{ type: 'navigation' }],
		},
	],
})

export default navObject
