import { defineType, defineField } from "sanity";
import {PlayIcon} from '@sanity/icons'

// Define the schema for the video block
const videoBlock = defineType({
  title: "Video Block",
  name: "videoBlock",
  type: "object",
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
    defineField({
      title: "Video",
      name: "video",
      type: "defaultVideo",
    }),
  ],
  preview: {
    select: {
      title: "video.alt",
      media: "video",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        media: PlayIcon,
      };
    }
  },
});

export default videoBlock;