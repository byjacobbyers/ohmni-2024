import { defineType, defineField } from "sanity";
import {TextIcon} from '@sanity/icons'

const normalText = defineType({
  title: "Text",
  name: "normalText",
  type: "object",
  icon: TextIcon,
  fields: [
    defineField({
      title: "Text",
      name: "text",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
  ],
});

export default normalText;