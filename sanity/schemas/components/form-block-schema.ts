import { defineType, defineField } from "sanity";
import { ClipboardIcon, BlockContentIcon } from "@sanity/icons";

const formBlock = defineType({
  title: "Form Block",
  name: "formBlock",
  type: "object",
  icon: ClipboardIcon,
  fields: [
    defineField({
      title: "Active?",
      name: "active",
      type: "boolean",
      description: "Set to false if you need to remove from page but not delete",
      initialValue: true,
    }),
    defineField({
      title: "Anchor",
      name: "anchor",
      type: "string",
      description: "The anchor for the section. No hash symbols. Optional.",
    }),
    defineField({
      title: "Form ID",
      name: "formId",
      type: "reference",
      to: [{ type: "form" }],
    }),
    defineField({
      title: "Subject",
      name: "subject",
      type: "string",
      description: "The subject line for the form submission. Optional.",
    }),
    defineField({
      title: "Content",
      name: "content",
      type: "simpleText",
    }),
    defineField({
      title: "Fields",
      name: "fields",
      type: "array",
      of: [
        {
          type: "object",
          title: "Field",
          icon: BlockContentIcon,
          fields: [
            defineField({
              title: "Field Label",
              name: "label",
              type: "string",
              description: "The label for the form field.",
            }),
            defineField({
              title: "Field Type",
              name: "type",
              type: "string",
              options: {
                list: [
                  { title: "Text", value: "string" },
                  { title: "Textarea", value: "textarea" },
                ],
              },
              description: "The type of the form field.",
            }),
            {
              name: 'width',
              title: 'Field Width',
              type: 'string',
              options: {
                list: [
                  { title: 'Full Width', value: 'full' },
                  { title: 'Half Width', value: 'half' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'full',
              hidden: ({ parent }) => parent?.type === 'textarea',
            },
            defineField({
              title: "Required",
              name: "required",
              type: "boolean",
              description: "Is this field required?",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "label",
              type: "type",
              width: "width",
            },
            prepare({ title, type, width }) {
              return {
              title: title || "Untitled Field",
              subtitle: `${type || "Unknown Type"}${width ? ` - ${width}` : ""}`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "formId.formLabel",
      active: "active",
    },
    prepare({ title, active }) {
      return {
        title: `Form Block - ${title || "Untitled"}`,
        subtitle: active ? "Active" : "Not Active",
      };
    },
  },
});

export default formBlock;