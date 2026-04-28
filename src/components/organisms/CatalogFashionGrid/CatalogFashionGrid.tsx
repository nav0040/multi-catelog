import Link from "next/link";
import type { CategoryGroup } from "@/lib/catalog";
import styles from "./CatalogFashionGrid.module.css";

type Props = {
  groups: CategoryGroup[];
};

function categorySlug(category: string): string {
  return category.replace(/\s+/g, "-").toLowerCase();
}

export function CatalogFashionGrid({ groups }: Props) {
  return (
    <section id="catalog" className={styles.section} aria-label="Product catalog">
      <div className={styles.inner}>
        <header>
          <div className={styles.topRow}>
            <Link className={styles.topLink} href="#catalog">
              All Brand
            </Link>
            <Link className={styles.topLink} href="#catalog">
              New Arrival
            </Link>
          </div>
          <h2 className={styles.headline}>
            Look Sharp, Train Hard, All Year Long
          </h2>
          <div className={styles.subRow}>
            <p className={styles.subTitle}>Shop by category</p>
            <span className={styles.subArrow} aria-hidden>
              →
            </span>
          </div>
        </header>

        {groups.map((group) => {
          const slug = categorySlug(group.category);
          const headingId = `category-heading-${slug}`;
          return (
            <section
              key={group.category}
              id={`category-${slug}`}
              className={styles.categoryBlock}
              aria-labelledby={headingId}
            >
              <div className={styles.categoryHead}>
                <h3 id={headingId} className={styles.categoryTitle}>
                  {group.category}
                </h3>
                <span className={styles.categoryCount}>
                  {group.items.length}{" "}
                  {group.items.length === 1 ? "item" : "items"}
                </span>
              </div>
              <div className={styles.grid}>
                {group.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/item/${item.id}`}
                    className={styles.card}
                    aria-label={`${item.itemname}, ${item.category}`}
                  >
                    <div className={styles.cardMedia}>
                      <img
                        className={styles.image}
                        src={item.image}
                        alt=""
                        width={400}
                        height={600}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className={styles.cardGradient} aria-hidden />
                      <div className={styles.cardCopy}>
                        <p className={styles.cardLabel}>{item.category}</p>
                        <p className={styles.cardTitle}>{item.itemname}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
