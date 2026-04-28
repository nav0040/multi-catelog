import Link from "next/link";
import { AspectImage } from "@/components/atoms/AspectImage/AspectImage";
import { Text } from "@/components/atoms/Text/Text";
import { CategoryBadge } from "@/components/atoms/CategoryBadge/CategoryBadge";
import type { CatalogItem } from "@/lib/catalog";
import styles from "./ItemCardPreview.module.css";

type Props = { item: CatalogItem };

export function ItemCardPreview({ item }: Props) {
  return (
    <Link href={`/item/${item.id}`} className={styles.card}>
      <AspectImage
        src={item.image}
        alt={item.itemname}
        ratio="16x9"
        priority={false}
      />
      <div className={styles.body}>
        <CategoryBadge label={item.category} />
        <Text variant="heading" as="h3" className={styles.title}>
          {item.itemname}
        </Text>
      </div>
    </Link>
  );
}
