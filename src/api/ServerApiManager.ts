import API_METHODS from "constants/ApiMethods";
import BaseApiManager from "./BaseApiManager";
import { serverProps, serverSettings } from "utils/types/api";

const ServerApiManager = (function () {
  function addParamsToURL(url: string, payload: any) {
    let newURL = url;
    const searchParams = new URLSearchParams();

    // Loop through the object and append query parameters
    for (const key in payload) {
      searchParams.append(key, payload[key]);
    }

    const params = searchParams.toString();

    if (payload && params) {
      newURL += "?" + params;
    }
    return newURL;
  }

  function generateRequest(
    payload: any,
    settings: serverSettings | undefined,
    methodName: string
  ) {
    const url = BaseApiManager.buildUrl(methodName, settings?.url);
    const fullUrl = addParamsToURL(url, payload);
    const defaultHeaders = BaseApiManager.getHeaders();

    const data = {
      url: fullUrl,
      headers: defaultHeaders,
      nextSettings: settings?.next ?? {},
      cache: settings?.cache || "default",
    };

    return data;
  }
  function execute(props: serverProps, methodName: string) {
    const settings = generateRequest(props.payload, props.settings, methodName);

    return fetch(settings.url, {
      method: API_METHODS.GET,
      headers: settings.headers,
      next: settings.nextSettings,
      cache: settings.cache,
    });
  }
  return { execute };
})();

export default ServerApiManager;
