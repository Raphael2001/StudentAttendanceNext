export interface SlidePopupRef {
  animateOut: () => void;
}
export type Popup = {
  type: string;
  payload: any;
  priority: number;
};
