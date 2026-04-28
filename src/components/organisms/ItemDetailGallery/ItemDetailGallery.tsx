"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./ItemDetailGallery.module.css";

type Props = {
  images: string[];
  alt: string;
};

const PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect fill="%23e8eaed" width="800" height="500"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236e6e73" font-family="Poppins, sans-serif" font-size="16">Image unavailable</text></svg>`,
  );

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg className={styles.chevron} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      {dir === "prev" ? (
        <polyline points="15 6 9 12 15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <polyline points="9 6 15 12 9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export function ItemDetailGallery({ images, alt }: Props) {
  const list = useMemo(() => (images.length > 0 ? images : [PLACEHOLDER]), [images]);
  const [index, setIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [index]);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => {
        const n = list.length;
        return (i + delta + n) % n;
      });
    },
    [list.length],
  );

  const raw = list[index] ?? PLACEHOLDER;
  const src = imgError ? PLACEHOLDER : raw;
  const showNav = list.length > 1;

  return (
    <div className={styles.stage} role="region" aria-roledescription="carousel" aria-label={`${alt} photos`}>
      <div className={styles.viewport}>
        <img
          className={styles.img}
          src={src}
          alt={`${alt} — photo ${index + 1} of ${list.length}`}
          loading="eager"
          decoding="async"
          onError={() => setImgError(true)}
        />
        <div className={styles.floor} aria-hidden />
      </div>
      {showNav && (
        <div className={styles.pill} role="group" aria-label="Photo navigation">
          <button type="button" className={styles.navBtn} onClick={() => go(-1)} aria-label="Previous photo">
            <Chevron dir="prev" />
          </button>
          <button type="button" className={styles.navBtn} onClick={() => go(1)} aria-label="Next photo">
            <Chevron dir="next" />
          </button>
        </div>
      )}
    </div>
  );
}
