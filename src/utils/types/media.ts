export enum MediaTypes {
  INTERNAL = "internal",
  EXTERNAL = "external",
}

export enum MimeTypes {
  VIDEO = "video",
  IMAGE = "image",
}

export type Mime = string | MimeTypes.IMAGE | MimeTypes.VIDEO;
export type MediaType = string | MediaTypes.INTERNAL | MediaTypes.EXTERNAL;

export type Src = {
  type: MediaType;
  url: string;
  name: string;
  mime: Mime;
};
export type Media = {
  name: string;
  _id: string;
  src: Src;
  alt: string;
};

export const emptyMedia: Media = {
  name: "",
  _id: "",
  alt: "",
  src: { mime: "", name: "", type: "", url: "" },
};
