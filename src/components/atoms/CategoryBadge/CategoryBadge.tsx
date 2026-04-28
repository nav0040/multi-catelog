import styles from "./CategoryBadge.module.css";

type Props = { label: string; className?: string };

export function CategoryBadge({ label, className = "" }: Props) {
  return (
    <span className={`${styles.badge} ${className}`.trim()} title={label}>
      {label}
    </span>
  );
}
