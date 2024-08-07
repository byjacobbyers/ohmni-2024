import { defineType, defineField } from "sanity";
import {PresentationIcon} from '@sanity/icons'

const formBlock = defineType({
  title: "Form Block",
  name: "formBlock",
  type: "object",
  icon: PresentationIcon,
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
    defineField(
      {
        title: "Form ID",
        name: "formId",
        type: "string",
      }
    ),
    defineField(
      {
        name: 'content',
        type: 'array',
        of: [
          {
            type: 'block',
          },
        ],
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
        title: 'Form Block',
        subtitle: active ? 'Active' : 'Inactive',
      }
    }
  }
});

export default formBlock;