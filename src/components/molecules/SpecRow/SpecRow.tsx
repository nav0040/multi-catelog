import { Text } from "@/components/atoms/Text/Text";
import type { ItemProp } from "@/lib/catalog";
import styles from "./SpecRow.module.css";

type Props = { prop: ItemProp };

export function SpecRow({ prop: row }: Props) {
  return (
    <div className={styles.row}>
      <Text variant="muted" as="span">
        {row.label}
      </Text>
      <Text variant="body" as="span" style={{ margin: 0, wordBreak: "break-word" }}>
        {row.value}
      </Text>
    </div>
  );
}
