import AppWrapper from "components/AppWrapper/AppWrapper";

import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { LOACLES } from "constants/GlobalParams";
import { ValidationResponseType } from "utils/types/vaildation";
import ISR from "utils/ISR";

export function generateStaticParams() {
  return LOACLES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const apiValidationData: ValidationResponseType =
    await ISR.serverValidation();

  return (
    <AppWrapper
      color="site"
      className="rtl"
      apiValidationData={apiValidationData}
    >
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </AppWrapper>
  );
}
