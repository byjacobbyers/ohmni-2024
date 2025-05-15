import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons";

const videoBlock = defineType({
  title: "Video Block",
  name: "videoBlock",
  type: "object",
  icon: PlayIcon,
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
      title: "Video",
      name: "video",
      type: "mux.video",
      description: "Upload or select a video from Mux.",
    }),
    defineField({
      title: "Full Screen",
      name: "fullScreen",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      title: "Auto Play",
      name: "autoPlay",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      title: "Loop",
      name: "loop",
      type: "boolean",
      description: "Should the video loop after it ends?",
      initialValue: false,
    }),
    defineField({
      title: "Hide Controls",
      name: "hideControls",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      title: "Content",
      name: "content",
      type: "simpleText",
    }),
  ],
  preview: {
    select: {
      title: "content",
      active: "active",
    },
    prepare({ title, active }) {
      return {
        title: "Video Block",
        subtitle: `${active ? "Active" : "Not Active"} - ${
          title ? title[0]?.children[0]?.text || "No Content" : "No Content"
        }`,
      };
    },
  },
});

export default videoBlock;