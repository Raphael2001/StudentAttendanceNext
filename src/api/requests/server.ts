import ApiValidationService from "api/base/ApiValidationService";
import ServerApiManager from "api/base/ServerApiManager";

import { ServerProps } from "utils/types/api";

const server = {
  init: (props: ServerProps) => {
    return ServerApiManager.execute(props, "init");
  },

  metaTags: (props: ServerProps) => {
    return ServerApiManager.execute(props, "metaTags");
  },

  serverValidation: (props: ServerProps = {}) => {
    const url = ApiValidationService.validationURL + "/" + "init";

    return ServerApiManager.execute(props, url);
  },
  dynamicPage: (props: ServerProps = {}) => {
    return ServerApiManager.execute(props, "dynamicPageData");
  },
  dynamicPageRoutes: (props: ServerProps = {}) => {
    return ServerApiManager.execute(props, "dynamicPageRoutes");
  },
};

export default server;
