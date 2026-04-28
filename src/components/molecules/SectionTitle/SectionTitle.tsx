import { Text } from "@/components/atoms/Text/Text";
import styles from "./SectionTitle.module.css";

type Props = {
  title: string;
  itemCount: number;
  headingId: string;
};

export function SectionTitle({ title, itemCount, headingId }: Props) {
  return (
    <div className={styles.root}>
      <Text variant="heading" as="h2" id={headingId}>
        {title}
      </Text>
      <Text variant="muted" as="p" className={styles.count}>
        {itemCount} {itemCount === 1 ? "item" : "items"}
      </Text>
    </div>
  );
}
