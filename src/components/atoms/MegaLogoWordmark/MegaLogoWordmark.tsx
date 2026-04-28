import Link from "next/link";
import styles from "./MegaLogoWordmark.module.css";

export function MegaLogoWordmark() {
  return (
    <Link href="/" className={styles.logo} aria-label="MEGA home">
      MEGA
    </Link>
  );
}
