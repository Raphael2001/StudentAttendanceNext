import TEXT_TAGS from "constants/TextTags";
import { Link } from "./links";
import { RotatingTextItem } from "./rotatingText";

import { Media } from "./media";
import { UserType } from "./user";
import { MetaTags } from "./metaTags";
import { DynamicPage, DynamicPageComponentTypes } from "./dynamicPages";
import { Student } from "./student";
import { Teacher } from "./teacher";
import { Instructor } from "./instructor";
import { Course } from "./course";

export type Init = {
	texts: Array<CmsText>;
	media: Array<Media>;
	languages: Array<Language>;
	generalInfo: Array<GeneralInfo>;
	links: Array<Link>;
	metaTags: Array<MetaTags>;
	iamRoles: Array<IAMRole>;
	modules: Array<CMSModule>;
	files: Array<Media>;
	users: Array<UserType>;
	syncOptions: Array<SyncOption>;
	dynamicPages: Array<DynamicPage>;
	dynamicPagesComponentsTypes: DynamicPageComponentTypes;

	students: Array<Student>;
	teachers: Array<Teacher>;
	instructors: Array<Instructor>;
	courses: Array<Course>;
};

export type GeneralInfoValue = Array<GeneralInfoItem> | RotatingTextItem | GeneralInfoItem;

export type GeneralInfoItem = {
	_id: string;
	data: string;
};

export type GeneralInfo = {
	cmsTitle: string;
	inputType: string;
	name: string;
	value: GeneralInfoValue;
	_id: string;
};

export type Language = {
	_id: string;
	lang: string;
	langId: string;
};

export type CmsText = {
	key: string;
	tag: TextTagsKeys;
	value: TextValue;
};

type TextValue = {
	[key: string]: string;
};

export type TextTagsKeys = keyof typeof TEXT_TAGS;

export type IAMRole = {
	_id: string;
	title: string;
	permissionBitwise: number;
};

export type CMSModule = {
	bitwise: number;
	_id: string;
	route?: CMSModuleRoute;
	routes: Array<CMSModuleRoute>;
	title?: string;
};

export type CMSModuleRoute = {
	href: string;
	title: string;
};

export type SyncOption = {
	id: string;
	title: string;
};
