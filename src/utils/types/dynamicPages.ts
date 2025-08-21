import { Media } from "./media";

export type DynamicPage = {
  _id: string;
  name: string;
  route: string;
};

export interface DynamicPageData extends DynamicPage {
  sections: Array<DynamicPageSection>;
}

export interface DynamicPageSection {
  _id: string;
  name: string;
  components: Array<DynamicPageComponent>;
}

export interface DynamicPageComponent {
  _id: string;
  type: string;
  value: string | Array<string>;
}

export type DynamicPageComponentType = {
  _id: string;
  text: string;
};

export type DynamicPageComponentTypes = {
  [key: string]: DynamicPageComponentType;
};

export type DynamicPageSectionData = {
  _id: string;
  name: string;
  components: Array<DynamicPageComponentData>;
};

export type DynamicPageComponentData = {
  _id: string;
  type: string;
  value: string | Array<Media> | Media | number;
};
