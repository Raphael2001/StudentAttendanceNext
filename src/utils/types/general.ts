export type GeneralServerItem = {
  _id: string;
};

export type FormPayload = Record<string, any>; // A general type for any kind of payload

export type LocalePageParams = Promise<{ locale: string }>;

export type LocaleLayoutProps = {
  params: LocalePageParams;
  children: React.ReactNode;
};
