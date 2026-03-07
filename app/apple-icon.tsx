import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const contentType = 'image/png'

export const dynamic = 'force-static'
export const revalidate = 60 * 60 * 24 * 30

type IconSize = { width: number; height: number }

const APPLE_SIZES: IconSize[] = [
  { width: 180, height: 180 }, // iPhone
  { width: 167, height: 167 }, // iPad Pro
  { width: 152, height: 152 }, // iPad / iPad mini
]

export function generateImageMetadata() {
  return APPLE_SIZES.map((s) => ({ id: String(s.width), size: s }))
}

function getAppleIconStyles(size: IconSize) {
  const w = size.width
  const radius = Math.round(w * 0.22)
  const fontSize = Math.round(w * 0.58)
  const letterSpacing = Math.round(w * -0.035)

  return {
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #111827 0%, #030712 100%)',
      color: '#ffffff',
      borderRadius: radius,
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow:
        '0 2px 16px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)',
    } satisfies React.CSSProperties,
    glyph: {
      fontSize,
      fontWeight: 900,
      letterSpacing,
      lineHeight: 1,
    } satisfies React.CSSProperties,
  }
}

export default async function AppleIcon({ id }: { id: Promise<string> }) {
  const requested = Number.parseInt(await id, 10)
  const size = APPLE_SIZES.find((s) => s.width === requested) ?? APPLE_SIZES[0]
  const styles = getAppleIconStyles(size)

  return new ImageResponse(
    (
      <div style={styles.container}>
        <div style={styles.glyph}>S</div>
      </div>
    ),
    size
  )
}
