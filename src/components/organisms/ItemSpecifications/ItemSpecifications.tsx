import { Text } from "@/components/atoms/Text/Text";
import { SpecRow } from "@/components/molecules/SpecRow/SpecRow";
import type { ItemProp } from "@/lib/catalog";
import styles from "./ItemSpecifications.module.css";

type Props = { itemprops: ItemProp[] };

export function ItemSpecifications({ itemprops }: Props) {
  if (itemprops.length === 0) {
    return (
      <section className={styles.panel} aria-label="Specifications">
        <Text variant="muted" as="p" className={styles.empty}>
          No specifications listed.
        </Text>
      </section>
    );
  }

  return (
    <section className={styles.panel} aria-label="Specifications">
      <Text variant="heading" as="h2" style={{ marginBottom: "var(--space-md)" }}>
        Specifications
      </Text>
      <div className={styles.list} role="list">
        {itemprops.map((p) => (
          <div key={`${p.label}-${p.value}`} role="listitem">
            <SpecRow prop={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
