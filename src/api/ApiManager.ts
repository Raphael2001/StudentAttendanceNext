import BaseApiManager from "./BaseApiManager";
import API_METHODS from "constants/ApiMethods";
import SERVER_RESPONSES from "constants/ServerResponses";
import axios from "axios";
import {
  ApiCallData,
  apiConfig,
  ApiProps,
  clientSettings,
  onFailureFunction,
  onSuccessFunction,
} from "utils/types/api";
import { generateUniqueId } from "utils/functions";
import ApiQueueService from "./ApiQueueService";
import API_QUEUE_STATUS from "constants/ApiQueueStatus";
import { setLoader } from "redux-store/features/loaderSlice";
import Store from "redux-store";

const ApiManager = (function () {
  function generateRequest(
    payload: any,
    headers = {},
    method = API_METHODS.POST,
    methodName: string,
    config?: apiConfig
  ) {
    const url = BaseApiManager.buildUrl(methodName, config?.url);
    const defaultHeaders = BaseApiManager.getHeaders();
    const allHeaders = { ...headers, ...defaultHeaders };

    const settings: clientSettings = {
      method,
      url,
      headers: allHeaders,
      withCredentials: true,
    };
    if (method !== API_METHODS.GET) {
      settings.data = payload;
    } else {
      settings.params = payload;
    }

    return settings;
  }

  function addCall(
    props: ApiProps,
    methodType: string,
    methodName: string,
    onSuccess?: onSuccessFunction,
    onFailure?: onFailureFunction
  ) {
    const settings = generateRequest(
      props.payload,
      props.headers,
      methodType,
      methodName,
      props.config
    );

    const apiCallData = {
      settings,
      config: props.config ?? {},
      onSuccess,
      onFailure,
      _id: generateUniqueId(16),
      status: API_QUEUE_STATUS.PENDING,
      callback: props.callback,
    };
    ApiQueueService.addToQueue(apiCallData);
    return run();
  }

  function run() {
    const call = ApiQueueService.execute();
    if (call) {
      return execute(call);
    }
  }

  function execute(callData: ApiCallData) {
    if (callData?.config?.showLoader ?? true) {
      Store.dispatch(setLoader(true));
    }

    ApiQueueService.updateCallStatus(callData._id, API_QUEUE_STATUS.RUNNING);
    return axios(callData.settings)
      .then((response) => {
        typeof callData.callback === "function" && callData.callback(response);
        if (
          response.status === 200 &&
          response.data.status === SERVER_RESPONSES.SUCCESS
        ) {
          callData.onSuccess
            ? callData.onSuccess(response.data)
            : BaseApiManager.onSuccess();
        }

        Store.dispatch(setLoader(false));
        return response.data;
      })
      .catch((error) => {
        typeof callData.callback === "function" && callData.callback(error);

        BaseApiManager.onFailure(
          error?.response?.data?.message ?? error.message
        );
        typeof callData.onFailure === "function" &&
          callData.onFailure(error.data.message);
        Store.dispatch(setLoader(false));
      })
      .finally(() => {
        ApiQueueService.removeCallFromQueue(callData._id);
        return run();
      });
  }
  return {
    addCall,
  };
})();

export default ApiManager;
