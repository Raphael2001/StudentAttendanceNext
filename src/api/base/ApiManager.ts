import axios, { AxiosRequestConfig } from "axios";
import API_METHODS from "constants/ApiMethods";
import {
  ApiHeaders,
  ApiMethodType,
  ApiResponse,
  ClientConfig,
  ClientPayload,
  ExtraApiData,
} from "utils/types/api";
import { buildFormData, buildUrl, genericOnFailure } from "../utils";

const ApiManager = (function () {
  async function request(
    method: ApiMethodType,
    url: string,
    data: ClientPayload = {},
    config: ClientConfig = {},
    extra: ExtraApiData = {},
  ): Promise<ApiResponse | undefined> {
    const fullUrl = buildUrl(url);

    const headers: ApiHeaders = {
      ...config.headers,
      Accept: "application/json",
    };

    let requestData: any = data;

    const isGetMethod = method === API_METHODS.GET;

    if (config.isFormData && !isGetMethod) {
      requestData = buildFormData(data);
    } else {
      headers["Content-Type"] = "application/json";
    }

    const payloadKey = isGetMethod ? "params" : "data";

    const axiosConfig: AxiosRequestConfig = {
      method,
      url: fullUrl,
      headers,
      withCredentials: true,
      [payloadKey]: requestData,
    };

    try {
      const response = await axios(axiosConfig);
      if (config.onSuccess) {
        config.onSuccess(response.data);
      }
      if (extra.onSuccess) {
        extra.onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      console.log("error", error);

      const textMessage = error?.response?.data?.message ?? error.message;
      if (config.onFailure) {
        config.onFailure(error);
      }
      if (extra.onFailure) {
        extra.onFailure(error);
      }

      genericOnFailure(textMessage);
    }
  }

  return {
    request,
  };
})();

export default ApiManager;
