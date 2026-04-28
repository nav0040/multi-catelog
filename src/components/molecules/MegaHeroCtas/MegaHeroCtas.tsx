import { MegaPillButton } from "@/components/atoms/MegaPillButton/MegaPillButton";
import styles from "./MegaHeroCtas.module.css";

export function MegaHeroCtas() {
  return (
    <div className={styles.row}>
      <MegaPillButton href="#catalog" variant="primary" fullWidthOnMobile>
        Shop now
      </MegaPillButton>
      <MegaPillButton href="#catalog" variant="secondary" fullWidthOnMobile>
        Explore all
      </MegaPillButton>
    </div>
  );
}
