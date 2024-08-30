export type ValidationResponseType = {
  creditName: string;
  creditUrl: string;
  project: ApiDataValidationType;
};

export type ApiDataValidationType = {
  _id: string;
  apiVersion: string;
  cdn: string;
  name: string;
  platform: string;
  url: string;
};
