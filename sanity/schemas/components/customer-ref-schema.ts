import { defineType, defineField } from "sanity";
import { ColorWheelIcon } from '@sanity/icons'


const customerRef = defineType({
  title: "Customer Ref",
  name: "customerRef",
  type: "object",
  icon: ColorWheelIcon,
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
        name: 'title',
        type: 'string',
      }
    ),
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
    },
    prepare({title, active}) {
      return {
        title: 'Customer Ref',
        subtitle: active ? 'Active' : 'Inactive',
      }
    }
  }
});

export default customerRef;