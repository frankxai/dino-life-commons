import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllSpecies, getRelatedSpecies, getSpeciesByHref } from "@/lib/content"
import { SpeciesDetail } from "@/components/species-detail"

export function generateStaticParams() {
  return getAllSpecies().map((s) => ({ clade: s.clade, slug: s.slug }))
}

async function resolve(params: Promise<{ clade: string; slug: string }>) {
  const { clade, slug } = await params
  return getSpeciesByHref(`/species/${clade}/${slug}`)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ clade: string; slug: string }>
}): Promise<Metadata> {
  const species = await resolve(params)
  if (!species) return {}
  return {
    title: species.title,
    description: species.excerpt,
    openGraph: {
      images: species.media?.imageUrl ? [{ url: species.media.imageUrl, alt: species.media.altText }] : [],
    },
  }
}

export default async function SpeciesPage({
  params,
}: {
  params: Promise<{ clade: string; slug: string }>
}) {
  const species = await resolve(params)
  if (!species) notFound()
  return (
    <main>
      <SpeciesDetail species={species} related={getRelatedSpecies(species)} />
    </main>
  )
}
