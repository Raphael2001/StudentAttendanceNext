import Footer from "components/App/Footer/Footer";
import { setRequestLocale } from "next-intl/server";
import { LocaleLayoutProps, LocalePageParams } from "utils/types/general";

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <div>
      {children}

      <Footer />
    </div>
  );
}
