export type CmsItem = {
  _id: string;
  media: string;
  name: string;
  price: string;
  titles: GeneralLangTexts;
  descriptions: GeneralLangTexts;
};

export type CmsItemsMenu = {
  _id: string;
  name: string;
  menuId: string;
  titles: GeneralLangTexts;
  items: Array<string>;
};

export type CmsIngredient = {
  _id: string;

  name: string;
  price: string;
  titles: GeneralLangTexts;
  inStock: boolean;
};

export type CmsIngredientMenu = {
  is_free: boolean;
  is_radio: boolean;
  max_options: number;
  min_options: number;
  name: string;
  subtitles: GeneralLangTexts;
  titles: GeneralLangTexts;
  ingredients: Array<string>;
  _id: string;
};

export type GeneralLangTexts = {
  [key: string]: string;
};
