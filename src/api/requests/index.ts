import ApiManager from "api/ApiManager";
import API_METHODS from "constants/ApiMethods";
import CMS_MODULES from "constants/CMSModules";
import LOCAL_STORAGE_KEYS from "constants/LocalStorage";
import Store from "redux-store";
import {
  addFileAction,
  addMediaAction,
  addNewKey,
  deleteGeneralInfoAction,
  deleteKeyById,
  deleteTextAction,
  insertManyByKey,
  removeFileAction,
  removeMediaAction,
  setGeneralInfo,
  setInit,
  updateKey,
  upsertLang,
  upsertTextAction,
} from "redux-store/features/initSlice";
import {
  setAccessToken,
  setRefreshToken,
} from "redux-store/features/tokensSlice";
import { updateUserData } from "redux-store/features/userDataSlice";
import { checkForJWTexp } from "utils/functions";
import { ApiResponse, ApiProps } from "utils/types/api";

const Api = (function () {
  async function accessTokenHeaders() {
    let token = Store.getState()?.tokens.accessToken;
    const isExpired = checkForJWTexp(token);

    if (isExpired) {
      function onSuccess(data) {
        token = data.access_token;
      }

      const refershProps = {
        onSuccess,
        payload: {},
      };

      await refreshToken(refershProps);
    }

    return { Authorization: `Bearer ${token}` };
  }

  function refreshTokenHeaders() {
    const token = Store.getState()?.tokens.refreshToken;
    return { Authorization: `Bearer ${token}` };
  }

  async function initCms(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(setInit(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();

    return ApiManager.addCall(props, API_METHODS.GET, "initCms", onSuccess);
  }

  async function upsertText(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(upsertTextAction(res.body));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "texts", onSuccess);
  }

  async function deleteText(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteTextAction(res.body));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "texts", onSuccess);
  }

  async function login(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(setAccessToken(res.body.access_token));
      Store.dispatch(setRefreshToken(res.body.refresh_token));
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
        res.body.refresh_token
      );
      Store.dispatch(updateUserData({ permission: res.body.permission }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    return ApiManager.addCall(props, API_METHODS.POST, "login", onSuccess);
  }

  async function refreshToken(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(setAccessToken(res.body.access_token));
      if (res.body?.refresh_token) {
        Store.dispatch(setRefreshToken(res.body.refresh_token));
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
          res.body.refresh_token
        );
      }
      Store.dispatch(updateUserData({ permission: res.body.permission }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = refreshTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.GET, "refresh", onSuccess);
  }

  async function upsertLanguage(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(upsertLang(res.body.value));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "languages", onSuccess);
  }

  async function deleteLanguage(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(
        deleteKeyById({ value: res.body.value, name: "languages" })
      );
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.DELETE,
      "languages",
      onSuccess
    );
  }

  async function upsertGeneralInfo(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(setGeneralInfo(res.body));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "generalInfo", onSuccess);
  }

  async function deleteGeneralInfo(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteGeneralInfoAction(props.payload.name));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.DELETE,
      "generalInfo",
      onSuccess
    );
  }

  async function deleteGeneralInfoMultiValuesId(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(setGeneralInfo(res.body));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.DELETE,
      "generalInfoMultiValues",
      onSuccess
    );
  }

  async function addMedia(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addMediaAction(res.body));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "media", onSuccess);
  }

  async function removeMedia(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(removeMediaAction(props.payload.id));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "media", onSuccess);
  }

  async function upsertLink(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      if (props.payload?.id) {
        Store.dispatch(updateKey({ name: "links", value: res.body }));
      } else {
        Store.dispatch(addNewKey({ value: res.body, name: "links" }));
      }
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "links", onSuccess);
  }

  async function removeLink(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteKeyById({ name: "links", value: res.body }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "links", onSuccess);
  }

  async function createMetaTags(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ name: "metaTags", value: res.body }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "metaTags", onSuccess);
  }

  async function updateMetaTags(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ name: "metaTags", value: res.body }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "metaTags", onSuccess);
  }

  async function deleteMetaTags(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteKeyById({ value: res.body, name: "metaTags" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "metaTags", onSuccess);
  }

  async function createRole(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "iamRoles" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "iamRole", onSuccess);
  }

  async function updateRole(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ name: "iamRoles", value: res.body }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "iamRole", onSuccess);
  }

  async function createUser(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "users" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "cmsUsers", onSuccess);
  }

  async function updateUser(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ value: res.body, name: "users" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "cmsUsers", onSuccess);
  }

  async function deleteUser(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteKeyById({ value: res.body, name: "users" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "cmsUsers", onSuccess);
  }

  async function addItem(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "items" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "items", onSuccess);
  }

  async function updateItem(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ value: res.body, name: "items" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "items", onSuccess);
  }

  async function deleteItem(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteKeyById({ value: res.body, name: "items" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "items", onSuccess);
  }

  async function addItemsMenu(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "itemsMenu" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "itemsMenu", onSuccess);
  }

  async function updateItemsMenu(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ value: res.body, name: "itemsMenu" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "itemsMenu", onSuccess);
  }

  async function deleteItemsMenu(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteKeyById({ value: res.body, name: "itemsMenu" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.DELETE,
      "itemsMenu",
      onSuccess
    );
  }

  async function sort(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "sort", onSuccess);
  }

  async function addItemIngredient(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "itemIngredients" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.POST,
      "itemIngredients",
      onSuccess
    );
  }

  async function updateItemIngredient(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ value: res.body, name: "itemIngredients" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.PUT,
      "itemIngredients",
      onSuccess
    );
  }

  async function deleteItemIngredient(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(
        deleteKeyById({ value: res.body, name: "itemIngredients" })
      );
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.DELETE,
      "itemIngredients",
      onSuccess
    );
  }

  async function updateStock(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(
        updateKey({ value: res.body, name: props.payload.fieldName })
      );
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "stock", onSuccess);
  }

  async function addIngredientsMenu(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "ingredientsMenus" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.POST,
      "ingredientsMenu",
      onSuccess
    );
  }

  async function updateIngredientsMenu(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ value: res.body, name: "ingredientsMenus" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.PUT,
      "ingredientsMenu",
      onSuccess
    );
  }

  async function deleteIngredientsMenu(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(
        deleteKeyById({ value: res.body, name: "ingredientsMenus" })
      );
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.DELETE,
      "ingredientsMenu",
      onSuccess
    );
  }

  async function addFile(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addFileAction(res.body));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "file", onSuccess);
  }

  async function removeFile(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(removeFileAction(props.payload.id));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "file", onSuccess);
  }

  async function addStudent(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "students" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "student", onSuccess);
  }

  async function updateStudent(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ value: res.body, name: "students" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "student", onSuccess);
  }

  async function deleteStudent(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteKeyById({ value: res.body, name: "students" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "student", onSuccess);
  }

  async function addTeacher(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "teachers" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "teacher", onSuccess);
  }

  async function updateTeacher(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ value: res.body, name: "teachers" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "teacher", onSuccess);
  }

  async function deleteTeacher(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteKeyById({ value: res.body, name: "teachers" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "teacher", onSuccess);
  }

  async function addInstructor(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "instructors" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "instructor", onSuccess);
  }

  async function updateInstructor(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ value: res.body, name: "instructors" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "instructor", onSuccess);
  }

  async function deleteInstructor(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteKeyById({ value: res.body, name: "instructors" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.DELETE,
      "instructor",
      onSuccess
    );
  }

  async function uploadExcelFile(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      switch (props.payload.moduleName) {
        case CMS_MODULES.STUDENTS:
          Store.dispatch(
            insertManyByKey({ value: res.body, name: "students" })
          );
        case CMS_MODULES.TEACHERS:
          Store.dispatch(
            insertManyByKey({ value: res.body, name: "teachers" })
          );
        case CMS_MODULES.INSTRUCTORS:
          Store.dispatch(
            insertManyByKey({ value: res.body, name: "instructors" })
          );
      }

      // Store.dispatch(deleteKeyById({ value: res.body, name: "instructors" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    props.config = { ...props.config, isFormData: true };
    return ApiManager.addCall(props, API_METHODS.POST, "excelFile", onSuccess);
  }

  async function addCourse(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "courses" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "course", onSuccess);
  }

  async function updateCourse(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ value: res.body, name: "courses" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "course", onSuccess);
  }

  async function deleteCourse(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteKeyById({ value: res.body, name: "courses" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "course", onSuccess);
  }

  return {
    initCms,
    upsertText,
    deleteText,
    login,
    refreshToken,
    upsertLanguage,
    deleteLanguage,
    upsertGeneralInfo,
    deleteGeneralInfo,
    deleteGeneralInfoMultiValuesId,
    addMedia,
    removeMedia,
    upsertLink,
    removeLink,
    createMetaTags,
    updateMetaTags,
    deleteMetaTags,
    createRole,
    updateRole,
    createUser,
    updateUser,
    deleteUser,
    addItem,
    updateItem,
    deleteItem,
    addItemsMenu,
    updateItemsMenu,
    deleteItemsMenu,
    sort,
    addItemIngredient,
    updateItemIngredient,
    deleteItemIngredient,
    updateStock,
    addIngredientsMenu,
    updateIngredientsMenu,
    deleteIngredientsMenu,
    addFile,
    removeFile,
    addStudent,
    updateStudent,
    deleteStudent,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    addInstructor,
    updateInstructor,
    deleteInstructor,
    uploadExcelFile,
    addCourse,
    updateCourse,
    deleteCourse,
  };
})();

export default Api;
