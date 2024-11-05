import Footer from "components/Footer/Footer";
import { setRequestLocale } from "next-intl/server";

export default function RootLayout({ children, params: { locale } }) {
  setRequestLocale(locale);
  return (
    <div>
      {children}

      <Footer />
    </div>
  );
}
