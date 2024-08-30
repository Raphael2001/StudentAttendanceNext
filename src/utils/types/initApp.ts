import { TextTagsKeys } from "./init";
import { Media } from "./media";

export type InitApp = {
  texts: Texts;
  menus: Array<Menu>;
  ingredientsMenus: IngredientsMenus;
};
export type Texts = {
  [key: string]: TextType;
};

export type TextType = {
  tag: TextTagsKeys;
  text: string;
};

export type Menu = {
  _id: string;
  items: Array<Item>;
  menu_id: string;
  title: string;
};
export type Item = {
  _id: string;
  description: string;
  inStock: boolean;
  ingredientsMenus: Array<string>;
  media: Media;
  name: string;
  price: string;
  title: string;
};
export type IngredientsMenus = {
  [key: string]: IngredientsMenu;
};

export type IngredientsMenu = {
  _id: string;
  ingredients: Array<Ingredient>;
  isFree: boolean;
  isRadio: boolean;
  maxOptions: number;
  minOptions: number;
  name: string;
  subtitle: string;
  title: string;
};

export type Ingredient = {
  _id: string;
  description: string;
  inStock: boolean;
  name: string;
  price: string;
  title: string;
};
