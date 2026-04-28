import Link from "next/link";
import styles from "./MegaNavLink.module.css";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function MegaNavLink({ href, children, className = "" }: Props) {
  return (
    <Link href={href} className={`${styles.link} ${className}`.trim()}>
      {children}
    </Link>
  );
}
