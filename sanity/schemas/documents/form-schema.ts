import { defineType, defineField } from "sanity";

const form = defineType({
  name: "form",
  title: "Form",
  type: "document",
  fields: [
    defineField({
      title: "Active",
      name: "active",
      type: "boolean",
      description: "Set to false to deactivate the form without deleting it.",
      initialValue: true,
    }),
    defineField({
      title: "Form Label",
      name: "formLabel",
      type: "string",
      description: "A label to identify the form.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Basin Form Endpoint ID",
      name: "useBasinFormId",
      type: "string",
      description: "The Basin Form ID for form submissions that can made on usebasin.com.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "formLabel",
      active: "active",
    },
    prepare(selection) {
      const { title, active } = selection;
      return {
        title: `${title}`,
        subtitle: active ? "Active" : "Inactive",
      };
    },
  },
});

export default form;