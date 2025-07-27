import ApiValidationService from "api/base/ApiValidationService";
import POPUP_TYPES from "constants/PopupTypes";
import Store from "redux-store";
import { addPopup } from "redux-store/features/popupsSlice";

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

function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function buildUrl(url: string): string {
  return isAbsoluteUrl(url) ? url : `${ApiValidationService.getUrl()}/${url}`;
}

function buildFormData(data: Record<string, any> = {}): FormData {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value as any);
  });
  return formData;
}

function genericOnFailure(response: string) {
  Store.dispatch(
    addPopup({
      type: POPUP_TYPES.API_ERROR,
      payload: { text: response },
    }),
  );
}

export { addParamsToURL, buildUrl, buildFormData, genericOnFailure };
