import styles from "./home.module.scss";
import { unstable_setRequestLocale } from "next-intl/server";
import Menus from "components/Menus/Menus";

export default function Home({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <main className={styles.main}>
      <Menus />
    </main>
  );
}
