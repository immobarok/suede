import type { MetadataRoute } from 'next'

import { getSiteOrigin } from '@/lib/site-url'

export const revalidate = 60 * 60 * 24

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin()

  return {
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/login',
          '/register',
          '/forgot-password',
          '/callback',
          '/profile/',
          '/settings/',
          '/users/',
          '/my-listings/',
          '/marketplace/sell',
          '/*?*',
          '/*&*',
        ],
      },
    ],
  }
}
