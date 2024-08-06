import { defineField } from 'sanity'

const defaultVideo = defineField({
	title: 'Video',
	type: 'file',
	name: 'defaultVideo',
	fields: [
		defineField({
			title: 'Alternative Text',
			description:
				'REQUIRED for Screen readers, keep it short and descriptive. Can one keyword fit in here?',
			name: 'alt',
			type: 'string',
			validation: Rule => Rule.required(),
		}),
		defineField({
			title: 'Poster',
			description: 'A preview image for the video',
			name: 'poster',
			type: 'image',
		}),
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

export default defaultVideo
