import { defineType, defineField } from "sanity";
import {TextIcon} from '@sanity/icons'

const simpleText = defineType({
  title: "Text",
  name: "simpleText",
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

export default simpleText;