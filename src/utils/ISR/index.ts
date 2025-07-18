import Api from "api";
import ApiValidationService from "api/base/ApiValidationService";

const ISR = (function () {
  async function parseBody(res: Response) {
    const json = await res.json();

    return json.body;
  }
  async function init(lang = "he") {
    const payload = { lang };
    const res = await Api.server.init({ payload });

    return await parseBody(res);
  }

  async function serverValidation() {
    const payload = { project: process.env.NEXT_PUBLIC_PROJECT_NAME };
    const res = await Api.server.serverValidation({ payload });

    const body = await parseBody(res);

    ApiValidationService.setApiData(body);

    return body;
  }

  async function getMetaTags(payload) {
    const res = await Api.server.metaTags({ payload });

    return await parseBody(res);
  }
  async function getDynamicPage(payload) {
    await serverValidation();
    const res = await Api.server.dynamicPage({ payload });

    return await parseBody(res);
  }
  async function getDynamicPagesRoutes() {
    await serverValidation();
    const res = await Api.server.dynamicPageRoutes({});

    return await parseBody(res);
  }

  return {
    init,
    serverValidation,
    getMetaTags,
    getDynamicPage,
    getDynamicPagesRoutes,
  };
})();

export default ISR;
