import { defineType, defineField } from 'sanity'

const page = defineType({
	name: 'review',
	title: 'Review',
	type: 'document',
  fields: [
    defineField({
      name: 'image',
      type: 'defaultImage',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Company Title',
      type: 'string',      
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    })
  ],
  preview: {
    select: {
      title: 'name',
      image: 'image',
    },
    prepare(selection) {
      const { title, image } = selection
      return {
        title: `${title}`,
        media: image,
      }
    },
  },
})

export default page