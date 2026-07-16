import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { marked } from "marked"
import type { CladeMeta, Species, SpeciesMedia, SpeciesStats, Source } from "./types"

const CONTENT_ROOT = path.join(process.cwd(), "content", "species")

export const CLADE_META: Record<string, CladeMeta> = {
  ornithischia: {
    id: "ornithischia",
    label: "Ornithischia",
    blurb: "Bird-hipped dinosaurs — armored tanks, horned browsers, and duck-bills.",
  },
  theropoda: {
    id: "theropoda",
    label: "Theropoda",
    blurb: "Mostly bipedal predators and their feathered descendants.",
  },
  sauropodomorpha: {
    id: "sauropodomorpha",
    label: "Sauropodomorpha",
    blurb: "Long-necked high browsers and the largest land animals ever.",
  },
}

function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

function toHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string
}

function walkMd(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name.startsWith("_")) continue
      walkMd(full, out)
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      out.push(full)
    }
  }
  return out
}

export function getAllSpecies(): Species[] {
  return walkMd(CONTENT_ROOT)
    .map(loadSpeciesFile)
    .filter((s): s is Species => Boolean(s))
    .sort((a, b) => a.scientificName.localeCompare(b.scientificName))
}

export function getSpeciesByHref(href: string): Species | undefined {
  return getAllSpecies().find((s) => s.href === href)
}

export function getSpeciesByClade(clade: string): Species[] {
  return getAllSpecies().filter((s) => s.clade === clade)
}

export function getRelatedSpecies(species: Species, limit = 3): Species[] {
  return getAllSpecies()
    .filter((s) => s.id !== species.id && s.clade === species.clade)
    .slice(0, limit)
}

export function getCommonsStats() {
  const all = getAllSpecies()
  const withMedia = all.filter((s) => s.media?.imageUrl).length
  const withVideo = all.filter((s) => s.media?.videoUrl).length
  return {
    species: all.length,
    clades: new Set(all.map((s) => s.clade)).size,
    withMedia,
    withVideo,
    sources: all.reduce((n, s) => n + s.sources.length, 0),
  }
}

function loadSpeciesFile(filePath: string): Species | null {
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  const clade = String(data.clade ?? path.basename(path.dirname(filePath)))
  const slug = String(data.slug ?? path.basename(filePath, ".md"))
  const scientificName = String(data.scientific_name ?? data.title ?? slug)
  const commonName = String(data.common_name ?? scientificName)
  const title = String(data.title ?? `${commonName} (${scientificName})`)
  const bodyHtml = toHtml(content)
  const rel = path.relative(process.cwd(), filePath).replaceAll("\\", "/")

  const stats = (data.stats ?? {}) as SpeciesStats
  const media = (data.media ?? {}) as SpeciesMedia
  const sources = (Array.isArray(data.sources) ? data.sources : []) as Source[]

  return {
    id: String(data.id ?? `species-${slug}`),
    slug,
    clade,
    title,
    commonName,
    scientificName,
    excerpt: String(data.excerpt ?? content.split("\n").find((l) => l.trim() && !l.startsWith("#")) ?? ""),
    status: (data.status as Species["status"]) ?? "draft",
    stats,
    media: {
      conceptArtOnly: true,
      rightsNote:
        media.rightsNote ??
        "Generated reconstruction — concept art, not photographic evidence or identification proof.",
      generator: media.generator ?? "grok-imagine-image-quality",
      ...media,
    },
    sources,
    lastVerified: data.last_verified ? String(data.last_verified) : undefined,
    bodyHtml,
    githubPath: rel,
    href: `/species/${clade}/${slug}`,
    readingMinutes: readingMinutes(content),
  }
}
