import Link from "next/link";
import { getItemBreadcrumbLabels, getItemGalleryImages, type CatalogItem } from "@/lib/catalog";
import { ItemDetailGallery } from "@/components/organisms/ItemDetailGallery/ItemDetailGallery";
import styles from "./ItemDetailHeader.module.css";

type Props = { item: CatalogItem };

function StarIcon() {
  return (
    <svg className={styles.star} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 7.3L22 10l-6 4.6L17.8 22 12 18.2 6.2 22 8 14.6 2 10l7.1-.7L12 2z" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ItemDetailHeader({ item }: Props) {
  const crumbs = getItemBreadcrumbLabels(item);
  const gallery = getItemGalleryImages(item);
  const hasRating = item.rating != null && Number.isFinite(item.rating);

  return (
    <header className={styles.root}>
      <div className={styles.preGallery}>
        <div className={styles.toolbar}>
          <Link href="/" className={styles.back} aria-label="Back to catalog">
            <BackIcon />
          </Link>
        </div>

        <div className={styles.headRow}>
          <div className={styles.lead}>
            <p className={styles.breadcrumbs}>
              {crumbs.map((label, i) => (
                <span key={`${label}-${i}`} className={styles.crumb}>
                  {i > 0 && <span className={styles.sep}>•</span>}
                  <span className={styles.crumbText}>{label}</span>
                </span>
              ))}
            </p>
            <h1 className={styles.title}>
              <span className={styles.titleName}>{item.itemname}</span>
              {item.year ? <span className={styles.year}>{item.year}</span> : null}
            </h1>
          </div>

          {hasRating ? (
            <div className={styles.actions}>
              <div className={styles.rating} aria-label={`Rating ${item.rating} out of 5`}>
                <StarIcon />
                <span className={styles.ratingValue}>{item.rating!.toFixed(1)}</span>
                {item.reviewCount != null ? (
                  <span className={styles.reviews}>({item.reviewCount} reviews)</span>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <ItemDetailGallery images={gallery} alt={item.itemname} />
    </header>
  );
}
