import AppWrapper from "components/AppWrapper/AppWrapper";

import { NextIntlClientProvider } from "next-intl";
import ISR from "utils/ISR";
import { routing } from "i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ValidationResponseType } from "utils/types/vaildation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const apiValidationData: ValidationResponseType =
    await ISR.serverValidation();

  const body = await ISR.init(locale);

  return (
    <AppWrapper
      color="site"
      data={body}
      className="rtl"
      apiValidationData={apiValidationData}
    >
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </AppWrapper>
  );
}
