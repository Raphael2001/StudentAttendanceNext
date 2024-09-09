import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { copy } from "utils/functions";
import { CmsText, GeneralInfo, init, language } from "utils/types/init";
import { CmsItemsMenu } from "utils/types/menus";

const initialState: init = {
  texts: [],
  media: {},
  languages: [],
  generalInfo: [],
  links: [],
  metaTags: [],
  iamRoles: [],
  itemsMenu: [],
  modules: [],
  items: [],
  itemIngredients: [],
  ingredientsMenus: [],
  files: {},
  users: [],
  instructors: [],
  students: [],
  teachers: [],
};

export const initSlice = createSlice({
  name: "init",
  initialState: initialState,
  reducers: {
    setInit: (state, action) => action.payload,
    updateInit: (state: init, action) => {
      return { ...state, ...action.payload };
    },

    upsertTextAction: (state: init, action: PayloadAction<CmsText>) => {
      const { key } = action.payload;
      const indexOfText = state.texts.findIndex((l: CmsText) => l.key === key);

      if (indexOfText > -1) {
        state.texts[indexOfText] = action.payload;
      } else {
        state.texts.push(action.payload);
      }
    },

    deleteTextAction: (state: init, action) => {
      const { key } = action.payload;

      const field = copy(state.texts);

      const index = field.findIndex((l) => l.key === key);

      if (index > -1) {
        field.splice(index);
      }

      state.texts = field;
    },

    addMediaAction: (state: init, action) => {
      const mediaId = action.payload._id;
      state.media = { ...state.media, [mediaId]: action.payload };
    },

    removeMediaAction: (state: init, action) => {
      const mediaId = action.payload;
      const media = { ...state.media };
      delete media[mediaId];
      state.media = media;
    },

    setGeneralInfo: (state: init, action: PayloadAction<GeneralInfo>) => {
      const { name } = action.payload;

      state.generalInfo[name] = action.payload;
    },
    deleteGeneralInfoAction: (state: init, action: PayloadAction<string>) => {
      const name = action.payload;

      delete state.generalInfo[name];
    },

    updateKey: (state, action) => {
      const { name, value } = action.payload;
      const { _id } = value;

      const field = copy(state[name]);

      const index = field.findIndex((m) => m._id === _id);

      if (index > -1) {
        state[name][index] = value;
      }
      return state;
    },
    addNewKey: (state, action) => {
      const { name, value } = action.payload;

      state[name].push(value);
      return state;
    },

    deleteKeyById: (state: init, action) => {
      const { name, value } = action.payload;
      const { _id } = value;
      const field = copy(state[name]);

      const index = field.findIndex((l) => l._id === _id);

      if (index !== -1) {
        field.splice(index, 1);
      }

      state[name] = field;
    },

    upsertLang: (state: init, action: PayloadAction<language>) => {
      const { _id } = action.payload;
      const indexOfLang = state.languages.findIndex(
        (l: language) => l._id === _id
      );

      if (indexOfLang > -1) {
        state.languages[indexOfLang] = action.payload;
      } else {
        state.languages.push(action.payload);
      }
    },
    setItemsMenu: (state: init, action: PayloadAction<Array<CmsItemsMenu>>) => {
      state.itemsMenu = action.payload;
    },

    addFileAction: (state: init, action) => {
      const fileId = action.payload._id;
      state.files = { ...state.files, [fileId]: action.payload };
    },

    removeFileAction: (state: init, action) => {
      const fileId = action.payload;
      const files = { ...state.files };
      delete files[fileId];
      state.files = files;
    },
    insertManyByKey: (state, action) => {
      const { name, value } = action.payload;

      state[name] = [...state[name], ...value];
      return state;
    },
  },
});

export const {
  addMediaAction,
  addNewKey,
  deleteGeneralInfoAction,
  deleteKeyById,
  deleteTextAction,
  removeMediaAction,
  setGeneralInfo,
  setInit,
  setItemsMenu,
  updateInit,
  updateKey,
  upsertLang,
  upsertTextAction,
  addFileAction,
  removeFileAction,
  insertManyByKey,
} = initSlice.actions;

export default initSlice.reducer;
