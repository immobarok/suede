function normalizeOrigin(input: string): string {
  const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`
  const url = new URL(withProtocol)
  return `${url.protocol}//${url.host}`
}

export function getSiteOrigin(): string {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL

  if (explicit) return normalizeOrigin(explicit)

  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) return normalizeOrigin(vercelUrl)

  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Missing site URL. Set NEXT_PUBLIC_SITE_URL (or SITE_URL) so robots/sitemap can generate absolute URLs.'
    )
  }

  return 'http://localhost:3000'
}

