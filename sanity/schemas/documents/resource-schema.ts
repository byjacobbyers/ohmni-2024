import { defineType, defineField } from 'sanity'

const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleText',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'lock',
      title: 'Lock',
      type: 'boolean',
      description: 'Indicates if the resource is locked',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Quiz', value: 'quiz' },
          { title: 'Document', value: 'document' },
          { title: 'Video', value: 'video' },
          { title: 'Podcast', value: 'podcast' },
          { title: 'Webinar', value: 'webinar' },
          { title: 'App', value: 'app' },
          { title: 'Tool', value: 'tool' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'defaultImage',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'cta',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: `Category: ${subtitle}`,
        media,
      }
    },
  },
})

export default resource