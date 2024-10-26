import styles from "./home.module.scss";
import { setRequestLocale } from "next-intl/server";

export default function Home({ params: { locale } }) {
  setRequestLocale(locale);

  return <main className={styles.main}></main>;
}
