import API_METHODS from "constants/ApiMethods";

import { ServerProps, ServerSettings } from "utils/types/api";
import { addParamsToURL, buildUrl } from "../utils";

const ServerApiManager = (function () {
  function generateRequest(
    payload: any,
    settings: ServerSettings = {},
    methodName: string,
  ) {
    const url = buildUrl(methodName);
    const fullUrl = addParamsToURL(url, payload);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const data = {
      url: fullUrl,
      headers,
      nextSettings: settings?.next ?? {},
      cache: settings?.cache || "default",
    };

    return data;
  }
  function execute(props: ServerProps, methodName: string) {
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
