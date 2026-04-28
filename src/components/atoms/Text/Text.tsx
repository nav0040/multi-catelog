import type { ElementType, ReactNode } from "react";
import styles from "./Text.module.css";

const variantClass = {
  title: styles.title,
  heading: styles.heading,
  body: styles.body,
  muted: styles.muted,
  caption: styles.caption,
} as const;

export type TextVariant = keyof typeof variantClass;

type Props<T extends ElementType> = {
  as?: T;
  variant?: TextVariant;
  className?: string;
  children: ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Text<T extends ElementType = "p">({
  as,
  variant = "body",
  className = "",
  children,
  ...rest
}: Props<T>) {
  const Component = (as ?? "p") as ElementType;
  const cls = [variantClass[variant], className].filter(Boolean).join(" ");
  return (
    <Component className={cls} {...rest}>
      {children}
    </Component>
  );
}
