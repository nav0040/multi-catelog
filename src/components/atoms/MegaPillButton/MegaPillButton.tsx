import Link from "next/link";
import styles from "./MegaPillButton.module.css";

type Variant = "primary" | "secondary";

type Props = {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
  fullWidthOnMobile?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function MegaPillButton({
  variant = "primary",
  href,
  children,
  fullWidthOnMobile = false,
  type = "button",
  onClick,
}: Props) {
  const cls = [
    styles.btn,
    variant === "primary" ? styles.primary : styles.secondary,
    fullWidthOnMobile ? styles.fullMobile : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
