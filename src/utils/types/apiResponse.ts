export type ValidationApiResponse = {
  creditName: string;
  creditUrl: string;
  project: {
    _id: string;
    apiVersion: string;
    cdn: string;
    name: string;
    platform: string;
    url: string;
  };
};
