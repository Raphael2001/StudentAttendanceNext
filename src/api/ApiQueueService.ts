import API_QUEUE_STATUS from "constants/ApiQueueStatus";
import Store from "redux-store";
import {
  addCallToQueue,
  removeCallFromQueue,
  updateCallStatus,
} from "redux-store/features/apiQueueSlice";
import { ApiCallData } from "utils/types/api";

const ApiQueueService = (function () {
  function addToQueue(data: ApiCallData) {
    Store.dispatch(addCallToQueue(data));
  }

  function getCurrent() {
    const queue: Array<ApiCallData> = Store.getState().apiQueue;
    const isRunning = queue.find((i) => i.status === API_QUEUE_STATUS.RUNNING);
    if (!isRunning) {
      const call = queue[0];
      return call;
    }
    return undefined;
  }

  function updateCallStatusHandler(_id: string, status: string) {
    Store.dispatch(updateCallStatus({ _id, status }));
  }

  function removeCallFromQueueHandler(_id: string) {
    Store.dispatch(removeCallFromQueue(_id));
  }
  return {
    addToQueue,
    execute: getCurrent,
    updateCallStatus: updateCallStatusHandler,
    removeCallFromQueue: removeCallFromQueueHandler,
  };
})();

export default ApiQueueService;
