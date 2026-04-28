import { MegaStyleHeader } from "@/components/organisms/MegaStyleHeader/MegaStyleHeader";
import { ScrollMorphHero } from "@/components/ui/scroll-morph-hero";
import styles from "./LandingHeroSection.module.css";

type Props = {
  productPreviewSrcs: string[];
};

export function LandingHeroSection({ productPreviewSrcs }: Props) {
  return (
    <div className={styles.shell}>
      <MegaStyleHeader />
      <div className={styles.heroMorph}>
        <ScrollMorphHero images={productPreviewSrcs} />
      </div>
    </div>
  );
}
