export type NotificationPayload = {
  id?: string;
  title?: string;
  text?: string;
  timer?: number;
};

export type Notification = {
  type: string;
  payload: NotificationPayload;
};
