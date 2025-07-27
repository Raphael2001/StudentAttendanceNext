import LOCAL_STORAGE_KEYS from "constants/LocalStorage";
import LocalStorageService from "services/LocalStorageService";

const Tokens = (function () {
  let accessToken = "";
  let refreshToken = "";

  function set(tokens: { accessToken?: string; refreshToken?: string }) {
    if (tokens?.accessToken) {
      accessToken = tokens.accessToken;
    }
    if (tokens?.refreshToken) {
      refreshToken = tokens.refreshToken;

      LocalStorageService.setItem(
        LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
        refreshToken,
      );
    }
  }

  function get() {
    return {
      accessToken,
      refreshToken,
    };
  }

  return { set, get };
})();

export default Tokens;
