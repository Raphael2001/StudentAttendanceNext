export type RotatingTextItemOption = {
  _id: string;
  color: string;
  text: string;
};

export type RotatingTextItem = {
  text: string;
  options: Array<RotatingTextItemOption>;
};
