import POPUP_TYPES from "constants/popup-types";
import Store from "redux-store";
import { addPopup } from "redux-store/features/popupsSlice";
import ApiValidationService from "services/ApiValidationService";

const BaseApiManager = (function () {
  function buildUrl(methodName: string, overrideUrl?: string) {
    if (overrideUrl) {
      return overrideUrl + "/" + methodName;
    }

    const api = ApiValidationService.getApiData();

    return (
      api.baseUrl + "/" + api.platform + "/" + api.version + "/" + methodName
    );
  }

  function getHeaders() {
    return { "Content-Type": "application/json; charset=UTF-8" };
  }

  function onFailure(response: string) {
    Store.dispatch(
      addPopup({
        type: POPUP_TYPES.API_ERROR,
        payload: { text: response },
      })
    );
  }

  function onSuccess() {}
  return {
    buildUrl,
    getHeaders,

    onFailure,
    onSuccess,
  };
})();

export default BaseApiManager;
