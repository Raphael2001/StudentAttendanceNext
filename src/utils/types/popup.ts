export interface SlidePopupRef {
  animateOut: (callback?: () => void) => void;
}
export type Popup = {
  type: string;
  payload: any;
  priority: number;
  key: string;
};

export type PopupProps = {
  type: string;
  payload: any;
  popupIndex: number;
  key: string;
};
