export type notificationPayload = {
  id?: string;
  title?: string;
  text?: string;
  timer?: number;
};

export type notification = {
  type: string;
  payload: notificationPayload;
};
