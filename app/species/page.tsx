import type { Metadata } from "next"
import { getAllSpecies, CLADE_META } from "@/lib/content"
import { SpeciesCard } from "@/components/species-card"

export const metadata: Metadata = {
  title: "Species",
  description: "Dinosaur encyclopedia index — sourced pages with cinematic reconstructions.",
}

export default function SpeciesIndexPage() {
  const all = getAllSpecies()
  const byClade = Object.keys(CLADE_META).map((id) => ({
    meta: CLADE_META[id],
    items: all.filter((s) => s.clade === id),
  }))

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Catalog</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">Species encyclopedia</h1>
        <p className="mt-3 text-muted-foreground">
          {all.length} published artifacts across {byClade.filter((c) => c.items.length).length} clades.
          Media is labeled concept reconstruction.
        </p>
      </header>

      <div className="mt-12 space-y-14">
        {byClade.map(({ meta, items }) =>
          items.length === 0 ? null : (
            <section key={meta.id} id={meta.id}>
              <h2 className="font-serif text-2xl font-semibold">{meta.label}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{meta.blurb}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <SpeciesCard key={s.id} species={s} />
                ))}
              </div>
            </section>
          ),
        )}
      </div>
    </main>
  )
}
