const BaseRoutes = {
  root: "/",
  cms: "/cms/content",
  cmsLogin: "/cms/login",
};

const Routes = {
  home: BaseRoutes.root + "home",
  cmsLogin: BaseRoutes.cmsLogin,
  cmsTexts: BaseRoutes.cms + "/texts",
  cmsMedia: BaseRoutes.cms + "/media",
  cmsGeneral: BaseRoutes.cms + "/general",
  cmsHome: BaseRoutes.cms + "/main",
  cmsLink: BaseRoutes.cms + "/links",
  cmsMetaTags: BaseRoutes.cms + "/metaTags",
  cmsIAMRole: BaseRoutes.cms + "/iamRole",
  cmsUsers: BaseRoutes.cms + "/users",
  cmsNoPermission: BaseRoutes.cms + "/noPermission",
  cmsIngredientsMenuForm: BaseRoutes.cms + "/ingredientsMenu/menu",
  cmsIngredientsMenu: BaseRoutes.cms + "/ingredientsMenu",
};

export { BaseRoutes, Routes };
