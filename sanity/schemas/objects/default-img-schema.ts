import { defineField } from 'sanity'

const defaultImage = defineField({
	title: 'Image',
	type: 'image',
	description:
		'Be meaningful with your image names. No screenshot_01.png. Keep file sizes small and under 400kb. Rough estimates for image widths are as follows: 2400px wide fullscreen, 1200px wide half screen, 800px wide quarter screen and 400px wide for small images.',
	name: 'defaultImage',
	fields: [
		defineField({
			title: 'Alternative Text',
			description:
				'REQUIRED for Screen readers, keep it short and descriptive. Can one keyword fit in here?',
			name: 'alt',
			type: 'string',
			validation: Rule => Rule.required(),
		})
	],
	preview: {
		select: {
			name: 'alt',
			image: 'asset',
		},
		prepare(selection) {
			const { name, image } = selection
			return {
				title: `${name ? name : 'No Alternative Text Provided'}`,
				media: image,
			}
		},
	},
})

export default defaultImage
