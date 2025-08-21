import { setRequestLocale } from "next-intl/server";
import styles from "./home.module.scss";
import { LocalePageParams } from "utils/types/general";

type Props = {
  params: LocalePageParams;
};
export default async function Home({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <main className={styles.main}></main>;
}
