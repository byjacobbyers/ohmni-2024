import { defineType, defineField } from "sanity";
import {BlockElementIcon} from '@sanity/icons'

const heroBlock = defineType({
  title: "Hero Block",
  name: "heroBlock",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
			title: 'Active?',
			name: 'active',
			type: 'boolean',
			description:
				'Set to false if you need to remove from page but not delete',
			initialValue: true,
		}),
    defineField(
      {
        title: "Anchor",
        name: "anchor",
        type: "string",
        description: "The anchor for the section. No hash symbols. Optional.",
      }
    ),
    {
      name: 'video',
      type: 'mux.video',
    },
    defineField({
      name: 'image',
      type: 'defaultImage',
    }),
    defineField(
      {
        name: 'content',
        type: 'simpleText',
      }
    ),
    defineField(
      {
        title: "CTA",
        name: "cta",
        type: "cta",
      }
    ),
  ],
  preview: {
    select: {
      title: 'content',
      active: 'active',
    },
    prepare({title, active}) {
      return {
        title: 'Hero',
        subtitle: active ? 'Active' : 'Inactive',
      }
    }
  }
});

export default heroBlock;