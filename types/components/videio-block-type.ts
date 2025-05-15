import { SimpleTextType } from "../objects/simple-text-type";
import { DefaultVideoType } from "../objects/default-video-type";

export type VideoBlockType = {
  active?: boolean;
  componentIndex?: number;
  anchor?: string;
  video?: DefaultVideoType;
  fullScreen?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  hideControls?: boolean;
  content?: SimpleTextType;
};