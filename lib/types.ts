export type ArtifactStatus =
  | "draft"
  | "needs-expert-review"
  | "approved"
  | "published"

export type Source = {
  url: string
  title: string
  tier?: 1 | 2 | 3
  accessed?: string
}

export type SpeciesStats = {
  period?: string
  length?: string
  mass?: string
  diet?: string
  locomotion?: string
  discovery?: string
}

export type SpeciesMedia = {
  imageUrl?: string
  videoUrl?: string
  altText?: string
  generator?: string
  rightsNote?: string
  conceptArtOnly?: boolean
}

export type Species = {
  id: string
  slug: string
  clade: string
  title: string
  commonName: string
  scientificName: string
  excerpt: string
  status: ArtifactStatus
  stats: SpeciesStats
  media?: SpeciesMedia
  sources: Source[]
  lastVerified?: string
  bodyHtml: string
  githubPath: string
  href: string
  readingMinutes: number
}

export type CladeMeta = {
  id: string
  label: string
  blurb: string
}
