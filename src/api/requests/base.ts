import ApiManager from "api/base/ApiManager";
import API_METHODS from "constants/ApiMethods";
import Store from "redux-store";
import {
  addNewKey,
  deleteKeyById,
  updateKey,
} from "redux-store/features/initSlice";

import {
  APIMethodDefinition,
  APIMethodsData,
  ApiProps,
  ApiResponse,
  CMSApiMethodData,
} from "utils/types/api";
import { headers } from "./auth";
import AUTH_TYPES from "constants/AuthType";

function createApiMethods(
  entity: string,
  methodsData: APIMethodsData,
): APIMethodDefinition {
  const apiMethods = {} as APIMethodDefinition;

  methodsData.forEach((methodData) => {
    const method = methodData.method;

    apiMethods[method] = async function (props: ApiProps = {}) {
      const { config = { headers: {} } } = props;
      function onSuccess(res: ApiResponse) {
        if (typeof methodData.onSuccess === "function")
          methodData.onSuccess(res);
      }

      switch (methodData.authHeader) {
        case AUTH_TYPES.REFRESH_TOKEN:
          config.headers = headers.refreshToken();
          break;
        case AUTH_TYPES.ACCESS_TOKEN:
          config.headers = await headers.accessToken();
          break;
        default:
          break;
      }

      return ApiManager.request(method, entity, props.payload, config, {
        onSuccess,
      });
    };
  });

  return apiMethods;
}

function createCMSApiMethods(
  entity: string,
  methodsData: CMSApiMethodData[],
  name?: string,
): APIMethodDefinition {
  const data: APIMethodsData = methodsData.map((methodData) => {
    const method = methodData.method;

    const useBasicCMSOnSuccess = methodData.useBasicCMSOnSuccess ?? true;
    const onSuccess = (res: ApiResponse) => {
      if (useBasicCMSOnSuccess) {
        if (method === API_METHODS.POST) {
          Store.dispatch(addNewKey({ value: res.body, name: name }));
        }
        if (method === API_METHODS.PUT) {
          Store.dispatch(updateKey({ value: res.body, name: name }));
        }
        if (method === API_METHODS.DELETE) {
          Store.dispatch(deleteKeyById({ value: res.body, name: name }));
        }
      }
      if (typeof methodData.onSuccess === "function") methodData.onSuccess(res);
    };
    return {
      ...methodData,
      onSuccess,
      authHeader: AUTH_TYPES.ACCESS_TOKEN,
    };
  });

  return createApiMethods(entity, data);
}

export { createApiMethods, createCMSApiMethods };
