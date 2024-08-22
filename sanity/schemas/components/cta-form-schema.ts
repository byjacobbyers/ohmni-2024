import { defineType, defineField } from "sanity";
import {PresentationIcon} from '@sanity/icons'

const ctaForm = defineType({
  title: "CTA Form",
  name: "ctaForm",
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
    defineField(
      {
        name: 'formContent',
        type: 'array',
        of: [
          {
            type: 'block',
          },
        ],
      }
    ),
    defineField(
      {
        title: "Button Text",
        name: "buttonText",
        type: "string",
      }
    ),
    defineField(
      {
        title: "File",
        name: "file",
        type: "file",
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
        title: 'CTA Form',
        subtitle: active ? 'Active' : 'Inactive',
      }
    }
  }
});

export default ctaForm;