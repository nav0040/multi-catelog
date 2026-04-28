"use client";

import { useState } from "react";
import styles from "./AspectImage.module.css";

type Ratio = "16x9" | "4x3" | "1x1";

const ratioClass: Record<Ratio, string> = {
  "16x9": styles.ratio16x9,
  "4x3": styles.ratio4x3,
  "1x1": styles.ratio1x1,
};

type Props = {
  src: string;
  alt: string;
  ratio?: Ratio;
  className?: string;
  priority?: boolean;
};

const PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"><rect fill="%23232d3b" width="400" height="225"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239aacbc" font-family="Poppins, sans-serif" font-size="14">Image unavailable</text></svg>`,
  );

export function AspectImage({
  src,
  alt,
  ratio = "16x9",
  className = "",
  priority = false,
}: Props) {
  const [current, setCurrent] = useState(src);

  return (
    <div
      className={`${styles.wrap} ${ratioClass[ratio]} ${className}`.trim()}
    >
      <div className={styles.inner}>
        <img
          className={styles.img}
          src={current}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setCurrent(PLACEHOLDER)}
        />
      </div>
    </div>
  );
}
