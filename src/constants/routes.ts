const BaseRoutes = {
	root: "/",
	cms: "/cms/content",
	cmsLogin: "/cms/login",
	addNew: "/new",
};

const Routes = {
	home: BaseRoutes.root + "home",
	cmsLogin: BaseRoutes.cmsLogin,

	cmsHome: BaseRoutes.cms + "/main",
	cmsNoPermission: BaseRoutes.cms + "/noPermission",
	cmsDynamicPage: BaseRoutes.cms + "/dynamicPages",
	cmsMetaTags: BaseRoutes.cms + "/metaTags",
	cmsCourse: BaseRoutes.cms + "/courses",
};

export { BaseRoutes, Routes };
