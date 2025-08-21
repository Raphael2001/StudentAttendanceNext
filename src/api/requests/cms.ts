import API_METHODS from "constants/ApiMethods";
import { createCMSApiMethods } from "./base";

import Store from "redux-store";
import { insertManyByKey, setInit } from "redux-store/features/initSlice";
import { ApiResponse } from "utils/types/api";
import { addSectionPageData, deleteSectionPageData, setPageData, setSectionPageData } from "redux-store/features/dynamicPage";
import CMS_MODULES from "constants/CMSModules";
const cms = {
	links: createCMSApiMethods("links", [{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }], "links"),
	metaTags: createCMSApiMethods(
		"metaTags",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"metaTags",
	),
	iamRoles: createCMSApiMethods("iamRole", [{ method: API_METHODS.POST }, { method: API_METHODS.PUT }], "iamRoles"),
	cmsUsers: createCMSApiMethods("cmsUsers", [{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }], "users"),
	texts: createCMSApiMethods("texts", [{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }], "texts"),
	media: createCMSApiMethods("media", [{ method: API_METHODS.POST }, { method: API_METHODS.DELETE }], "media"),
	file: createCMSApiMethods("file", [{ method: API_METHODS.POST }, { method: API_METHODS.DELETE }], "files"),
	languages: createCMSApiMethods(
		"languages",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"languages",
	),
	student: createCMSApiMethods("student", [{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }], "students"),
	teacher: createCMSApiMethods("teacher", [{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }], "teachers"),
	course: createCMSApiMethods("course", [{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }], "courses"),
	instructor: createCMSApiMethods(
		"instructor",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"instructors",
	),
	sort: createCMSApiMethods("sort", [{ method: API_METHODS.POST, useBasicCMSOnSuccess: false }]),
	generalInfo: createCMSApiMethods(
		"generalInfo",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"generalInfo",
	),

	initCms: createCMSApiMethods("initCms", [
		{
			method: API_METHODS.GET,
			onSuccess: (res: ApiResponse) => {
				Store.dispatch(setInit(res.body));
			},
			useBasicCMSOnSuccess: false,
		},
	]),

	syncDB: createCMSApiMethods("syncDataBase", [
		{
			method: API_METHODS.POST,
			useBasicCMSOnSuccess: false,
		},
	]),

	dynamicPages: createCMSApiMethods(
		"dynamicPages",
		[
			{ method: API_METHODS.POST },
			{ method: API_METHODS.PUT },
			{ method: API_METHODS.DELETE },
			{
				method: API_METHODS.GET,
				onSuccess: (res: ApiResponse) => {
					Store.dispatch(setPageData(res.body));
				},
			},
		],
		"dynamicPages",
	),
	dynamicPagesSections: createCMSApiMethods("dynamicPagesSections", [
		{
			method: API_METHODS.POST,
			useBasicCMSOnSuccess: false,
			onSuccess: (res: ApiResponse) => {
				Store.dispatch(addSectionPageData(res.body));
			},
		},
		{
			method: API_METHODS.PUT,
			useBasicCMSOnSuccess: false,
			onSuccess: (res: ApiResponse) => {
				Store.dispatch(setSectionPageData(res.body));
			},
		},
		{
			method: API_METHODS.DELETE,
			useBasicCMSOnSuccess: false,
			onSuccess: (res: ApiResponse) => {
				Store.dispatch(deleteSectionPageData(res.body));
			},
		},
	]),
	excelFile: createCMSApiMethods("excelFile", [
		{
			method: API_METHODS.POST,
			useBasicCMSOnSuccess: false,
			onSuccess: (res: ApiResponse) => {
				switch (res.body.payload.moduleName) {
					case CMS_MODULES.STUDENTS:
						Store.dispatch(insertManyByKey({ value: res.body, name: "students" }));
					case CMS_MODULES.TEACHERS:
						Store.dispatch(insertManyByKey({ value: res.body, name: "teachers" }));
					case CMS_MODULES.INSTRUCTORS:
						Store.dispatch(insertManyByKey({ value: res.body, name: "instructors" }));
					case CMS_MODULES.COURSES:
						Store.dispatch(insertManyByKey({ value: res.body, name: "courses" }));
				}
			},
		},
	]),
	attendanceByCourse: createCMSApiMethods("attendanceByCourse", [
		{
			method: API_METHODS.GET,
			useBasicCMSOnSuccess: false,
		},
	]),
	attendanceByTeacher: createCMSApiMethods("attendanceByTeacher", [
		{
			method: API_METHODS.GET,
			useBasicCMSOnSuccess: false,
		},
	]),
	lessonsByCourse: createCMSApiMethods("lessonsByCourse", [
		{
			method: API_METHODS.GET,
			useBasicCMSOnSuccess: false,
		},
	]),
	cmsLessonAttendance: createCMSApiMethods("cmsLessonAttendance", [
		{
			method: API_METHODS.GET,
			useBasicCMSOnSuccess: false,
		},
	]),
	cmsAttendance: createCMSApiMethods("cmsAttendance", [
		{
			method: API_METHODS.POST,
			useBasicCMSOnSuccess: false,
		},
	]),
};

export default cms;
