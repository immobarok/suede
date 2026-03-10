import type { MetadataRoute } from "next";

import { getSiteOrigin } from "@/lib/site-url";

export const revalidate = 86400;

type SitemapEntry = MetadataRoute.Sitemap[number];

function url(origin: string, path: string): string {
  return new URL(path, origin).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteOrigin();
  const lastModified = new Date();

  const staticRoutes: SitemapEntry[] = [
    {
      url: url(origin, "/"),
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: url(origin, "/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: url(origin, "/brands"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: url(origin, "/collections"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: url(origin, "/reviews"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: url(origin, "/search"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: url(origin, "/marketplace"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: url(origin, "/listings"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];

  return staticRoutes;
}
