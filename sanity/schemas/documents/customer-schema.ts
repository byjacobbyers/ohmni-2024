import { defineType, defineField } from 'sanity'

const customer = defineType({
	name: 'customer',
	title: 'Customer',
	type: 'document',
  fields: [
    defineField({
      name: 'image',
      type: 'defaultImage',
    }),
    defineField({
      name: 'title',
      title: 'Company Title',
      type: 'string',      
    }),
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

export default customer