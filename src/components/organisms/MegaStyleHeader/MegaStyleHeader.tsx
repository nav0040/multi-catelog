import { MegaLogoWordmark } from "@/components/atoms/MegaLogoWordmark/MegaLogoWordmark";
import { MegaPrimaryNav } from "@/components/molecules/MegaPrimaryNav/MegaPrimaryNav";
import styles from "./MegaStyleHeader.module.css";

export function MegaStyleHeader() {
  return (
    <header className={styles.bar}>
      <div className={styles.shell}>
        <div className={styles.flexRow}>
          <div className={styles.left}>
            <MegaPrimaryNav />
          </div>
          <div className={styles.center}>
            <h1 className={styles.titleHeader}>
              <MegaLogoWordmark />
              <span className={styles.titleSub}>Multi-category catalog</span>
            </h1>
          </div>
          <div className={styles.right} aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
