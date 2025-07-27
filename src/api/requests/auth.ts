import API_METHODS from "constants/ApiMethods";
import Store from "redux-store";
import {
  setAccessToken,
  setRefreshToken,
} from "redux-store/features/tokensSlice";
import { updateUserData } from "redux-store/features/userDataSlice";
import { ApiResponse } from "utils/types/api";

import { createApiMethods } from "./base";
import { checkForJWTexp } from "utils/functions";
import AUTH_TYPES from "constants/AuthType";
import LOCAL_STORAGE_KEYS from "constants/LocalStorage";
import LocalStorageService from "services/LocalStorageService";
import SERVER_STATUS_RESPONSE from "constants/ServerStatusResponse";

const headers = {
  refreshToken: () => {
    const token = Store.getState()?.tokens.refreshToken;
    return { Authorization: `Bearer ${token}` };
  },

  accessToken: async () => {
    let token = Store.getState()?.tokens.accessToken;
    const isExpired = checkForJWTexp(token);

    if (isExpired) {
      const tokenResponse: ApiResponse = await auth.refreshToken.GET({});
      if (tokenResponse.status == SERVER_STATUS_RESPONSE.SUCCESS) {
        token = tokenResponse.body.access_token;
      }
    }

    return { Authorization: `Bearer ${token}` };
  },
};

export { headers };

const auth = {
  login: createApiMethods("login", [
    {
      method: API_METHODS.POST,
      onSuccess: (res: ApiResponse) => {
        Store.dispatch(setAccessToken(res.body.access_token));
        Store.dispatch(setRefreshToken(res.body.refresh_token));
        LocalStorageService.setItem(
          LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
          res.body.refresh_token,
        );

        Store.dispatch(updateUserData({ permission: res.body.permission }));
      },
    },
  ]),
  refreshToken: createApiMethods("refresh", [
    {
      method: API_METHODS.GET,
      onSuccess: (res: ApiResponse) => {
        Store.dispatch(setAccessToken(res.body.access_token));
        if (res.body?.refresh_token) {
          Store.dispatch(setRefreshToken(res.body.refresh_token));
          LocalStorageService.setItem(
            LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
            res.body.refresh_token,
          );
        }
        Store.dispatch(updateUserData({ permission: res.body.permission }));
      },
      authHeader: AUTH_TYPES.REFRESH_TOKEN,
    },
  ]),
};

export default auth;
