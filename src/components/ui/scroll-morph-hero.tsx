"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  motion,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  HERO_PRODUCT_TILE_COUNT,
  PRODUCT_FALLBACK_IMAGES,
} from "@/lib/heroProductImages";
import styles from "./scroll-morph-hero.module.css";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

export type ScrollMorphHeroProps = {
  className?: string;
  introTitle?: string;
  introHint?: string;
  /** Small caps line above the headline (arc phase), e.g. “Curated catalog”. */
  overline?: string;
  /** Main title when the arc forms; use `\n` for a deliberate second line. */
  headline?: string;
  description?: string;
  /** Product image URLs, e.g. from `buildHeroProductImages(catalogItems.map((i) => i.image))`. */
  images?: string[];
};

interface ProductTileProps {
  src: string;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function ProductTile({ src, target }: ProductTileProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
      }}
      className={styles.productTile}
    >
      <img
        src={src}
        alt=""
        className={styles.productImg}
        width={IMG_WIDTH}
        height={IMG_HEIGHT}
        draggable={false}
        decoding="async"
      />
    </motion.div>
  );
}

const MAX_SCROLL = 3000;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export function ScrollMorphHero({
  className,
  introTitle = "Cars, bikes, phones, workstations—one place to browse them all.",
  introHint = "Scroll to skim real listings from the catalog",
  overline = "Curated catalog",
  headline = "Cars, bikes, phones & workstations\ncomposed on one shelf.",
  description =
    "Keep scrolling to pull scattered listing photos into this arc—a calm beat before you open categories, filters, and every spec below.",
  images = PRODUCT_FALLBACK_IMAGES,
}: ScrollMorphHeroProps) {
  const reduceMotion = useReducedMotion();
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const imageList = useMemo(
    () => images.slice(0, HERO_PRODUCT_TILE_COUNT),
    [images],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    if (reduceMotion) {
      scrollRef.current = 600;
      virtualScroll.set(600);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const dy = e.deltaY;
      const cur = scrollRef.current;

      if (dy > 0 && cur >= MAX_SCROLL) return;
      if (dy < 0 && cur <= 0) return;

      e.preventDefault();
      const newScroll = Math.min(Math.max(cur + dy, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;
      const cur = scrollRef.current;

      if (deltaY > 0 && cur >= MAX_SCROLL) return;
      if (deltaY < 0 && cur <= 0) return;

      e.preventDefault();
      const newScroll = Math.min(Math.max(cur + deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll, reduceMotion]);

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    if (reduceMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      setIntroPhase("circle");
      return;
    }
    const timer1 = setTimeout(() => setIntroPhase("line"), 500);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [reduceMotion]);

  const scatterPositions = useMemo(() => {
    return imageList.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, [imageList]);

  const [morphValue, setMorphValue] = useState(reduceMotion ? 1 : 0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setMorphValue(1);
      return;
    }
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX, reduceMotion]);

  const contentOpacity = useTransform(smoothMorph, [0.82, 1], [0, 1]);

  const rootClass = [styles.root, reduceMotion ? styles.rootReduced : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={rootClass}
      role="region"
      aria-label="Product preview: scroll inside this region to move the shelf animation. When you reach the end, keep scrolling to browse the full catalog."
    >
      <div className={styles.inner}>
        <div className={styles.introBlock}>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              reduceMotion
                ? { opacity: 0, filter: "blur(8px)" }
                : introPhase === "circle" && morphValue < 0.5
                  ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            className={styles.introTitle}
          >
            {introTitle}
          </motion.p>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={
              reduceMotion
                ? { opacity: 0 }
                : introPhase === "circle" && morphValue < 0.5
                  ? { opacity: 0.5 - morphValue }
                  : { opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.2 }}
            className={styles.introHint}
          >
            {introHint}
          </motion.p>
        </div>

        <motion.div
          style={reduceMotion ? { opacity: 1 } : { opacity: contentOpacity }}
          className={styles.arcContent}
        >
          <p className={styles.arcOverline}>{overline}</p>
          <h2 className={styles.arcHeadline}>
            {headline.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 ? <br /> : null}
                {line.trim()}
              </React.Fragment>
            ))}
          </h2>
          <p className={styles.arcBody}>{description}</p>
        </motion.div>

        <div className={styles.cardsStage}>
          {imageList.map((src, i) => {
            let target: ProductTileProps["target"] = {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
            };

            if (introPhase === "scatter") {
              target = scatterPositions[i] ?? target;
            } else if (introPhase === "line") {
              const lineSpacing = 70;
              const lineTotalWidth = imageList.length * lineSpacing;
              const lineX = i * lineSpacing - lineTotalWidth / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              if (containerSize.width < 1 || containerSize.height < 1) {
                target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };
              } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);

              /* Slightly larger ring on desktop so tiles sit farther from center copy */
              const circleRadius = Math.min(
                minDimension * (isMobile ? 0.33 : 0.39),
                isMobile ? 248 : 336,
              );
              const circleAngle = (i / imageList.length) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: 0,
              };

              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
              /* Slightly higher arc on narrow screens so tiles clear the bottom caption */
              const arcApexY = containerSize.height * (isMobile ? 0.3 : 0.25);
              const arcCenterY = arcApexY + arcRadius;
              const spreadAngle = isMobile ? 100 : 130;
              const startAngle = -90 - spreadAngle / 2;
              const denom = Math.max(1, imageList.length - 1);
              const step = spreadAngle / denom;

              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const maxRotation = spreadAngle * 0.8;
              const boundedRotation = -scrollProgress * maxRotation;
              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: 0,
                scale: isMobile ? 1.4 : 1.8,
              };

              const m = reduceMotion ? 1 : morphValue;
              target = {
                x: lerp(circlePos.x, arcPos.x, m),
                y: lerp(circlePos.y, arcPos.y, m),
                rotation: lerp(circlePos.rotation, arcPos.rotation, m),
                scale: lerp(1, arcPos.scale, m),
                opacity: 1,
              };
              }
            }

            return <ProductTile key={`${src}-${i}`} src={src} target={target} />;
          })}
        </div>
      </div>

      <div className={styles.bottomFade} aria-hidden />
      {!reduceMotion && (
        <p className={styles.scrollCue} aria-hidden>
          Skim here — then scroll the page for categories & filters
        </p>
      )}
    </div>
  );
}

export default ScrollMorphHero;
