import { MegaHeroHeadline } from "@/components/molecules/MegaHeroHeadline/MegaHeroHeadline";
import { MegaHeroCtas } from "@/components/molecules/MegaHeroCtas/MegaHeroCtas";
import { MegaSocialProof } from "@/components/molecules/MegaSocialProof/MegaSocialProof";
import { MegaVideoCard } from "@/components/molecules/MegaVideoCard/MegaVideoCard";
import styles from "./MegaFashionHero.module.css";

const PORTRAIT_SRC =
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80&auto=format&fit=crop";

export function MegaFashionHero() {
  return (
    <section className={styles.root} aria-label="Featured">
      <div className={styles.grid}>
        <div className={styles.social}>
          <MegaSocialProof />
        </div>
        <div className={styles.copyStack}>
          <MegaHeroHeadline
            line1="Stay ready for any season,"
            line2="Every session"
          />
          <MegaHeroCtas />
        </div>
        <div className={styles.video}>
          <MegaVideoCard />
        </div>
        <div className={styles.figure}>
          <div className={styles.mask}>
            <img
              className={styles.portrait}
              src={PORTRAIT_SRC}
              alt="Stylish model in coat and hat"
              width={720}
              height={900}
              sizes="(max-width: 768px) 92vw, 520px"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
