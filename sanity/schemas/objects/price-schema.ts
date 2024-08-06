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
      name: 'price',
      type: 'number',
    }),
    defineField({
      name: 'offer',
      type: 'string',
    }),
    defineField({
      name: 'perks',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      title: "Payment Link",
      name: 'payment',
      type: 'string',
    }),
    defineField({
      title: "Book a Call Link",
      name: 'book',
      type: 'string',
    }),
  ],
});

export default price;