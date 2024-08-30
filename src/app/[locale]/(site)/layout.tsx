import Footer from "components/Footer/Footer";
import { unstable_setRequestLocale } from "next-intl/server";

export default function RootLayout({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);
  return (
    <div>
      {children}

      <Footer />
    </div>
  );
}
