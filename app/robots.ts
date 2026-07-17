import type { MetadataRoute } from "next"

const siteUrl = "https://dino-life-commons.vercel.app"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
