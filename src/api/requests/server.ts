import ServerApiManager from "api/ServerApiManager";
import ApiValidationService from "services/ApiValidationService";
import { serverProps } from "utils/types/api";

const ApiServer = (function () {
  function init(props: serverProps) {
    return ServerApiManager.execute(props, "init");
  }

  function metaTags(props: serverProps) {
    return ServerApiManager.execute(props, "metaTags");
  }

  function serverValidation(props: serverProps = {}) {
    props.settings = props.settings || {};

    props.settings.url = ApiValidationService.vaildationURL || "";

    return ServerApiManager.execute(props, "init");
  }

  return { init, metaTags, serverValidation };
})();

export default ApiServer;
