import type { MetadataRoute } from "next"
import { getAllSpecies } from "@/lib/content"

const siteUrl = "https://dino-life-commons.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const species = getAllSpecies()

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/species`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/template`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/docs/media-pipeline`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    ...species.map((s) => ({
      url: `${siteUrl}${s.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
