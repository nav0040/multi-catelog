import { useMemo } from "react";
import { MegaStyleHeader } from "@/components/organisms/MegaStyleHeader/MegaStyleHeader";
import { LandingHeroSection } from "@/components/organisms/LandingHeroSection/LandingHeroSection";
import { CatalogFashionGrid } from "@/components/organisms/CatalogFashionGrid/CatalogFashionGrid";
import { buildHeroProductImages } from "@/lib/heroProductImages";
import { catalogItems, type CategoryGroup } from "@/lib/catalog";
import styles from "./CatalogHomeTemplate.module.css";

type Props = { groups: CategoryGroup[] };

export function CatalogHomeTemplate({ groups }: Props) {
  const heroProductImages = useMemo(
    () => buildHeroProductImages(catalogItems.map((item) => item.image)),
    [],
  );

  return (
    <main className={styles.main}>
      <MegaStyleHeader />
      <LandingHeroSection productPreviewSrcs={heroProductImages} />
      <CatalogFashionGrid groups={groups} />
    </main>
  );
}
