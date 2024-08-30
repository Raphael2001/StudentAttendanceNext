import ApiServer from "api/requests/server";
import ApiValidationService from "services/ApiValidationService";

const ISR = (function () {
  async function init(lang = "he") {
    const payload = { lang };
    const res = await ApiServer.init({ payload });
    const json = await res.json();

    return json.body;
  }

  async function serverValidation() {
    const payload = { project: process.env.NEXT_PUBLIC_PROJECT_NAME };
    const res = await ApiServer.serverValidation({ payload });
    const json = await res.json();

    ApiValidationService.setApiData(json.body.project);

    return json.body;
  }

  async function getMetaTags(payload) {
    const res = await ApiServer.metaTags({ payload });
    const json = await res.json();
    const body = json.body;

    return body;
  }

  return {
    init,
    serverValidation,
  };
})();

export default ISR;
