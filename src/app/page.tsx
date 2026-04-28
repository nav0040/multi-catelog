import { getCategoryGroups } from "@/lib/catalog";
import { CatalogHomeTemplate } from "@/components/templates/CatalogHomeTemplate/CatalogHomeTemplate";

export default function HomePage() {
  const groups = getCategoryGroups();
  return <CatalogHomeTemplate groups={groups} />;
}
