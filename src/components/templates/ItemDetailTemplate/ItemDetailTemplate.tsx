import { ItemDetailHeader } from "@/components/organisms/ItemDetailHeader/ItemDetailHeader";
import { ItemSpecifications } from "@/components/organisms/ItemSpecifications/ItemSpecifications";
import type { CatalogItem } from "@/lib/catalog";
import styles from "./ItemDetailTemplate.module.css";

type Props = { item: CatalogItem };

export function ItemDetailTemplate({ item }: Props) {
  return (
    <div className={styles.shell}>
      <main className={styles.main}>
        <ItemDetailHeader item={item} />
        <ItemSpecifications itemprops={item.itemprops} />
      </main>
    </div>
  );
}
