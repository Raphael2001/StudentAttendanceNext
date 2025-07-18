import Link from "next/link";
import styles from "./not-found/notFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles["body"]}>
      <h1 title="404" className={styles["title"]}>
        404
      </h1>
      <Link href="/" className={styles["back"]}>
        Go Back Home
      </Link>
    </div>
  );
}
