import { createSlice } from "@reduxjs/toolkit";
import { copy } from "utils/functions";
import { Init } from "utils/types/init";

const initialState: Init = {
	texts: [],
	media: [],
	languages: [],
	generalInfo: [],
	links: [],
	metaTags: [],
	iamRoles: [],
	modules: [],
	files: [],
	users: [],
	syncOptions: [],
	dynamicPages: [],
	dynamicPagesComponentsTypes: {},
	courses: [],
	teachers: [],
	instructors: [],
	students: [],
};

export const initSlice = createSlice({
	name: "init",
	initialState: initialState,
	reducers: {
		setInit: (state, action) => action.payload,
		updateInit: (state: Init, action) => {
			return { ...state, ...action.payload };
		},
		addNewKey: (state, action) => {
			const { name, value } = action.payload;

			state[name].push(value);
			return state;
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

		deleteKeyById: (state: Init, action) => {
			const { name, value } = action.payload;
			const { _id } = value;
			const field = copy(state[name]);

			const index = field.findIndex((l) => l._id === _id);

			if (index !== -1) {
				field.splice(index, 1);
			}

			state[name] = field;
		},
		insertManyByKey: (state, action) => {
			const { name, value } = action.payload;

			state[name] = [...state[name], ...value];
			return state;
		},
	},
});

export const { setInit, updateInit, addNewKey, updateKey, deleteKeyById, insertManyByKey } = initSlice.actions;

export default initSlice.reducer;
