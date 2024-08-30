import Store from "redux-store";
import { ApiDataValidationType } from "utils/types/vaildation";

const ApiValidationService = (function () {
  const vaildationURL = "https://api-validation.aboohi.net/api/v1";

  const api = {
    baseUrl: "",
    version: "",
    platform: "",
  };

  function setApiData(data: ApiDataValidationType) {
    api.baseUrl = data.url;
    api.platform = data.platform;
    api.version = data.apiVersion;
  }

  function getApiData() {
    const project = Store.getState().apiValidation.project;

    if (!api.baseUrl) {
      api.baseUrl = project.url;
    }
    if (!api.version) {
      api.version = project.apiVersion;
    }
    if (!api.platform) {
      api.platform = project.platform;
    }

    return api;
  }

  function getCdn() {
    return Store.getState().apiValidation.project.cdn;
  }

  return {
    setApiData,
    getApiData,
    getCdn,
    vaildationURL,
  };
})();

export default ApiValidationService;
