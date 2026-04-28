import Link from "next/link";
import styles from "./CatalogBackLink.module.css";

export function CatalogBackLink() {
  return (
    <Link href="/" className={styles.link}>
      ← Back to catalog
    </Link>
  );
}
