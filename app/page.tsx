import Link from "next/link"
import { getAllSpecies, getCommonsStats } from "@/lib/content"
import { SpeciesCard } from "@/components/species-card"
import { SITE } from "@/lib/utils"

export default function HomePage() {
  const stats = getCommonsStats()
  const species = getAllSpecies()
  const featured = species.find((s) => s.slug === "ankylosaurus-magniventris") ?? species[0]
  const rest = species.filter((s) => s.id !== featured?.id)

  return (
    <main>
      <section className="relative overflow-hidden bg-stratum-deep text-stratum-foreground">
        <div className="absolute inset-0">
          {featured?.media?.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={featured.media.imageUrl}
              alt=""
              className="h-full w-full object-cover opacity-55"
              aria-hidden
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-stratum-deep via-stratum-deep/85 to-stratum-deep/40" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Deep-time commons</p>
            <h1 className="mt-3 max-w-xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {SITE.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-stratum-muted">{SITE.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/species"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-elevated transition hover:brightness-105"
              >
                Browse species
              </Link>
              <Link
                href="/template"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40"
              >
                Reusable template
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Metric label="Species" value={String(stats.species)} />
              <Metric label="Clades" value={String(stats.clades)} />
              <Metric label="Hero media" value={String(stats.withMedia)} />
              <Metric label="Video clips" value={String(stats.withVideo)} />
            </dl>
          </div>
          {featured && (
            <div className="glass-panel overflow-hidden rounded-2xl">
              {featured.media?.videoUrl ? (
                <video
                  className="aspect-video w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={featured.media.imageUrl}
                >
                  <source src={featured.media.videoUrl} type="video/mp4" />
                </video>
              ) : featured.media?.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.media.imageUrl}
                  alt={featured.media.altText ?? featured.title}
                  className="aspect-video w-full object-cover"
                />
              ) : null}
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Featured reconstruction</p>
                <h2 className="mt-1 font-serif text-2xl font-semibold text-white">{featured.scientificName}</h2>
                <p className="mt-2 text-sm text-white/75">{featured.excerpt}</p>
                <Link
                  href={featured.href}
                  className="mt-4 inline-flex text-sm font-semibold text-accent hover:underline"
                >
                  Open encyclopedia page →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-semibold">Species gallery</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Cinematic pages modeled on the Grok Build dinosaur encyclopedia demo — with Blue Life Commons
              discipline: sources, review status, and media provenance on every artifact.
            </p>
          </div>
          <Link href="/species" className="hidden text-sm font-semibold text-primary sm:inline">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured && <SpeciesCard species={featured} featured />}
          {rest.map((s) => (
            <SpeciesCard key={s.id} species={s} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/35">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
          <Principle
            title="Sourced or silent"
            body="Every factual claim traces to a tiered source. Generated art never pretends to be a fossil photo."
          />
          <Principle
            title="Cinematic + inspectable"
            body="Grok Build–style hero video and stat chips, with provenance rails, licenses, and review state."
          />
          <Principle
            title="Template for any domain"
            body="Clone the life-commons pattern for oceans, forests, space, or museums — schema first, media second."
          />
        </div>
      </section>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
      <dt className="text-[11px] uppercase tracking-[0.12em] text-white/55">{label}</dt>
      <dd className="mt-1 font-serif text-2xl font-semibold text-white">{value}</dd>
    </div>
  )
}

function Principle({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-serif text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  )
}
