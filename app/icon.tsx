import { ImageResponse } from "next/og";

export const contentType = "image/png";

export const dynamic = "force-static";
export const revalidate = 2592000;

type IconSize = { width: number; height: number };

const ICON_SIZES: IconSize[] = [
  { width: 32, height: 32 },
  { width: 48, height: 48 },
  { width: 96, height: 96 },
  { width: 192, height: 192 },
  { width: 512, height: 512 },
];

export function generateImageMetadata() {
  return ICON_SIZES.map((s) => ({ id: String(s.width), size: s }));
}

function getIconStyles(size: IconSize) {
  const w = size.width;
  const radius = Math.round(w * 0.22);
  const fontSize = Math.round(w * 0.62);
  const letterSpacing = Math.round(w * -0.04);
  const border = w >= 64 ? "1px solid rgba(255,255,255,0.08)" : "none";
  const boxShadow =
    w >= 64
      ? "0 2px 12px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)"
      : "none";

  return {
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #111827 0%, #030712 100%)",
      color: "#ffffff",
      borderRadius: radius,
      border,
      boxShadow,
    } satisfies React.CSSProperties,
    glyph: {
      fontSize,
      fontWeight: 900,
      letterSpacing,
      lineHeight: 1,
    } satisfies React.CSSProperties,
  };
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const requested = Number.parseInt(await id, 10);
  const size = ICON_SIZES.find((s) => s.width === requested) ?? ICON_SIZES[0];
  const styles = getIconStyles(size);

  return new ImageResponse(
    <div style={styles.container}>
      <div style={styles.glyph}>S</div>
    </div>,
    size,
  );
}
