import { AxiosRequestConfig } from "axios";

export type serverSettings = {
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
  url?: string;
};
export type serverProps = {
  settings?: serverSettings | undefined;
  payload?: any;
};

export type clientSettings = {
  method: string;
  url: string;
  headers: any;
  withCredentials: boolean;
  data?: any;
  params?: any;
};

export type onSuccessFunction = (a: any) => void;
export type onFailureFunction = (a: any) => void;

export type ApiProps = {
  config?: apiConfig;
  headers?: Object;
  payload?: any;
  callback?: (response: any) => void;
  onSuccess?: onSuccessFunction;
  onFailure?: onFailureFunction;
};

export type apiConfig = {
  showLoader?: boolean;
  url?: string;
  isFormData?: boolean;
};

export type ApiCallData = {
  settings: AxiosRequestConfig;
  config: apiConfig;
  onSuccess?: onSuccessFunction;
  onFailure?: onFailureFunction;
  status: string;
  _id: string;
  callback?: (response: any) => void;
};

export type updateStatusPayload = {
  _id: string;
  status: string;
};

export type ApiResponse = {
  body: any;
};
