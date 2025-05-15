import { SimpleTextType } from "../objects/simple-text-type";

export type FormBlockType = {
  active?: boolean;
  componentIndex?: number;
  anchor?: string;
  formId?: {
    _id: string;
    formLabel: string;
    useBasinFormId: string;
  };
  content?: SimpleTextType;
  subject?: string;
  fields?: {
    label: string;
    type: "string" | "textarea";
    width?: "full" | "half";
    required?: boolean;
  }[];
};