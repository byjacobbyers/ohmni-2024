import { defineType, defineField } from "sanity";
import {SparkleIcon} from '@sanity/icons'


const price = defineType({
  title: "Price",
  name: "price",
  icon: SparkleIcon,
  type: "object",
  fields: [
    defineField({
      name: 'featured',
      type: 'boolean',
      description: 'Show this price as purple',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'plausibleEvent',
      type: 'string',
    }),
    defineField({
      name: 'price',
      type: 'number',
    }),
    defineField({
      name: 'offer',
      type: 'string',
    }),
    defineField(
      {
        title: "CTA",
        name: "cta",
        type: "cta",
      }
    ),
    defineField({
      name: 'perks',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    }),
  ],
  preview: {
		select: {
			name: 'title',
      featured: 'featured',
		},
		prepare(selection) {
			const { name, featured } = selection
			return {
				title: `${name}`,
        subtitle: featured ? 'Featured' : '',
			}
		},
	},
});

export default price;