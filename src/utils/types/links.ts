import { MediaType } from "./media";

export interface LinkType {
  _id: string;
  link: string;
  linkType: string;
  media: string;
  name: string;
  titles?: LinkTitles;
}

export interface LinkTypeInit {
  _id: string;
  link: string;
  linkType: string;
  media: MediaType;
  name: string;
  titles?: LinkTitles;
}

type LinkTitles = {
  [key: string]: string;
};
