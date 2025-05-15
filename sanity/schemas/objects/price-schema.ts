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
      name: 'pricingType',
      title: 'Pricing Type',
      type: 'string',
      
      options: {
        list: [
          { title: 'Retainer', value: 'retainer' },
          { title: 'One-Time Project', value: 'oneTime' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
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
      name: "title",
      featured: "featured",
      pricingType: "pricingType",
    },
    prepare(selection) {
      const { name, featured, pricingType } = selection;
      return {
        title: `${name}`,
        subtitle: `${featured ? "Featured - " : ""} ${pricingType ? `${pricingType}` : ""}`.trim(),
      };
    },
  },
});

export default price;