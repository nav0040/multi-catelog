import Link from "next/link";
import { Text } from "@/components/atoms/Text/Text";
import { SiteHeader } from "@/components/organisms/SiteHeader/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
      style={{
        maxWidth: "var(--max-width)",
        margin: "0 auto",
        padding: "var(--space-xl) var(--space-md)",
        textAlign: "center",
      }}
    >
      <Text variant="title" as="h1">
        Not found
      </Text>
      <Text variant="muted" as="p">
        This catalog item does not exist.
      </Text>
      <p style={{ marginTop: "var(--space-lg)" }}>
        <Link
          href="/"
          style={{
            color: "var(--color-accent)",
            textDecoration: "underline",
          }}
        >
          Back to catalog
        </Link>
      </p>
    </main>
    </>
  );
}
