import { ValidationApiResponse } from "utils/types/apiResponse";

const ApiValidationService = (function () {
  const validationURL = "https://api-validation.aboohi.net/api/v1";

  let data: ValidationApiResponse = {
    creditName: "",
    creditUrl: "",
    project: {
      _id: "",
      apiVersion: "",
      cdn: "",
      name: "",
      platform: "",
      url: "",
    },
  };

  function setApiData(response: ValidationApiResponse) {
    data = response;
  }

  function getUrl() {
    if (data.project.name) {
      return (
        data.project.url +
        "/" +
        data.project.platform +
        "/" +
        data.project.apiVersion
      );
    } else {
      return validationURL;
    }
  }

  return {
    getUrl,
    setApiData,
    validationURL,
    data,
  };
})();

export default ApiValidationService;
