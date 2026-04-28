import { ScrollMorphHero } from "@/components/ui/scroll-morph-hero";
import styles from "./LandingHeroSection.module.css";

type Props = {
  productPreviewSrcs: string[];
};

export function LandingHeroSection({ productPreviewSrcs }: Props) {
  return (
    <div className={styles.landingWrap}>
      <div className={styles.shell}>
        <div className={styles.heroMorph}>
          <ScrollMorphHero images={productPreviewSrcs} />
        </div>
      </div>
    </div>
  );
}
