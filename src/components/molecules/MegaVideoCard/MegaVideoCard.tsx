import Link from "next/link";
import styles from "./MegaVideoCard.module.css";

const THUMB =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=640&q=80&auto=format&fit=crop";

function PlayIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
      <path d="M14 8L0 16V0l14 8Z" fill="#0a0a0a" />
    </svg>
  );
}

export function MegaVideoCard() {
  return (
    <Link href="#catalog" className={styles.card} aria-label="Watch lookbook video">
      <img className={styles.thumb} src={THUMB} alt="" width={220} height={138} />
      <span className={styles.overlay}>
        <span className={styles.play}>
          <PlayIcon />
        </span>
      </span>
    </Link>
  );
}
