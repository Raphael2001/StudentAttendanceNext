export type MetaTagRow = {
  type: string;
  metaTagId: string;
  value: string;
};

export type MetaTags = {
  _id: string;
  route: string;
  language: string;
  fields: Array<MetaTagField>;
};

export type MetaTagField = {
  _id: string;
  type: string;
  value: string;
};

export interface GenerateMetadataProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
