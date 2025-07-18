import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { copy } from "utils/functions";
import { DynamicPageData, DynamicPageSection } from "utils/types/dynamicPages";

const initialState: DynamicPageData = {
  sections: [],
  _id: "",
  name: "",
  route: "",
};

export const dynamicPageSlice = createSlice({
  name: "dynamicPage",
  initialState: initialState,
  reducers: {
    setPageData: (state, action: PayloadAction<DynamicPageData>) => {
      return action.payload;
    },
    addSectionPageData: (state, action: PayloadAction<DynamicPageSection>) => {
      return { ...state, sections: [...state.sections, action.payload] };
    },

    setSectionPageData: (state, action: PayloadAction<DynamicPageSection>) => {
      const sections: Array<DynamicPageSection> = copy(state.sections);

      const index = sections.findIndex((s) => s._id === action.payload._id);
      if (index > -1) {
        sections[index] = action.payload;
      }
      return { ...state, sections };
    },
    deleteSectionPageData: (
      state,
      action: PayloadAction<DynamicPageSection>,
    ) => {
      const sections: Array<DynamicPageSection> = copy(state.sections);

      const index = sections.findIndex((s) => s._id === action.payload._id);

      if (index !== -1) {
        sections.splice(index, 1);
      }
      return { ...state, sections };
    },

    resetPageData: () => initialState,
  },
});

export const {
  resetPageData,
  setPageData,
  addSectionPageData,
  setSectionPageData,
  deleteSectionPageData,
} = dynamicPageSlice.actions;

export default dynamicPageSlice.reducer;
