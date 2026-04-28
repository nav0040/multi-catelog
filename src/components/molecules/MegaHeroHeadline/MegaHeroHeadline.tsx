import styles from "./MegaHeroHeadline.module.css";

type Props = {
  line1: string;
  line2: string;
};

export function MegaHeroHeadline({ line1, line2 }: Props) {
  return (
    <div className={styles.wrap}>
      <p className={styles.line1}>{line1}</p>
      <h1 className={styles.line2}>{line2}</h1>
    </div>
  );
}
