import { MegaNavLink } from "@/components/atoms/MegaNavLink/MegaNavLink";
import { categorySectionHref } from "@/lib/catalog";
import styles from "./MegaPrimaryNav.module.css";

const LINKS = [
  { href: categorySectionHref("Cars"), label: "Cars" },
  { href: categorySectionHref("Bikes"), label: "Bikes" },
  { href: categorySectionHref("Computers"), label: "Computers" },
  { href: categorySectionHref("Phones"), label: "Phones" },
] as const;

export function MegaPrimaryNav() {
  return (
    <nav className={styles.nav} aria-label="Primary">
      {LINKS.map((l) => (
        <MegaNavLink key={l.label} href={l.href}>
          {l.label}
        </MegaNavLink>
      ))}
    </nav>
  );
}
