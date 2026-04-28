import { SectionTitle } from "@/components/molecules/SectionTitle/SectionTitle";
import { ItemCardPreview } from "@/components/molecules/ItemCardPreview/ItemCardPreview";
import type { CategoryGroup } from "@/lib/catalog";
import styles from "./CategorySection.module.css";

type Props = { group: CategoryGroup };

export function CategorySection({ group }: Props) {
  const sectionId = `section-${group.category.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <section
      className={styles.section}
      aria-labelledby={sectionId}
    >
      <div className={styles.inner}>
        <SectionTitle
          title={group.category}
          itemCount={group.items.length}
          headingId={sectionId}
        />
        <div className={styles.grid}>
          {group.items.map((item) => (
            <ItemCardPreview key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
