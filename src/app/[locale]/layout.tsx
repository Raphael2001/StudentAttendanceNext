import AppWrapper from "components/AppWrapper/AppWrapper";

import { NextIntlClientProvider } from "next-intl";
import ISR from "utils/ISR";
import { routing } from "i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { LocaleLayoutProps } from "utils/types/general";
import { ValidationApiResponse } from "utils/types/apiResponse";
import { isRTLLocale } from "utils/functions/langFunctions";

import "swiper/css";
import "swiper/css/pagination";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const apiValidationData: ValidationApiResponse = await ISR.serverValidation();

  const body = await ISR.init(locale);

  const isRTL = isRTLLocale(locale);

  return (
    <AppWrapper
      color="site"
      data={body}
      className={isRTL ? "rtl" : "ltr"}
      apiValidationData={apiValidationData}
    >
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </AppWrapper>
  );
}
