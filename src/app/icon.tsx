import { ImageResponse } from "next/og";
import { catalogItems } from "@/lib/catalog";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary);
}

export default async function Icon() {
  const url = catalogItems[0]?.image;
  if (!url) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f1419",
        }}
      />,
      { ...size },
    );
  }

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f1419",
        }}
      />,
      { ...size },
    );
  }

  const buf = await res.arrayBuffer();
  const mime = res.headers.get("content-type") ?? "image/jpeg";
  const dataUrl = `data:${mime};base64,${bytesToBase64(new Uint8Array(buf))}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f1419",
        }}
      >
        <img
          alt=""
          src={dataUrl}
          height={28}
          width={28}
          style={{
            borderRadius: 6,
            objectFit: "cover",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
