import Link from "next/link"
import type { Species } from "@/lib/types"
import { CLADE_META } from "@/lib/content"
import { SITE, cn } from "@/lib/utils"

export function SpeciesDetail({ species, related }: { species: Species; related: Species[] }) {
  const m = species.media
  const s = species.stats

  return (
    <article>
      {/* Cinematic hero — Grok Build encyclopedia style */}
      <section className="relative min-h-[72vh] overflow-hidden bg-stratum-deep text-stratum-foreground">
        <div className="absolute inset-0">
          {m?.videoUrl ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={m.imageUrl}
              aria-label={m.altText ?? species.title}
            >
              <source src={m.videoUrl} type="video/mp4" />
            </video>
          ) : m?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={m.imageUrl} alt={m.altText ?? species.title} className="h-full w-full object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-stratum-deep via-stratum-deep/55 to-black/20" />
        </div>

        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6 sm:pb-14">
          <nav className="mb-6 text-sm text-white/70" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/species" className="hover:text-white">
                  Species
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/species#${species.clade}`} className="hover:text-white">
                  {CLADE_META[species.clade]?.label ?? species.clade}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white">{species.commonName}</li>
            </ol>
          </nav>

          <div className="glass-panel max-w-2xl rounded-2xl p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                Encyclopedia
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80">
                {species.status.replace(/-/g, " ")}
              </span>
              {m?.conceptArtOnly && (
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80">
                  Concept reconstruction
                </span>
              )}
            </div>
            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {species.scientificName}
            </h1>
            <p className="mt-2 text-lg text-white/85">{species.commonName}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {s.period && <Stat label="Period" value={s.period} />}
              {s.length && <Stat label="Length" value={s.length} />}
              {s.mass && <Stat label="Mass" value={s.mass} />}
              {s.diet && <Stat label="Diet" value={s.diet} />}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-white/80">{species.excerpt}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="prose-paleo" dangerouslySetInnerHTML={{ __html: species.bodyHtml }} />
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start" aria-label="Provenance">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-elevated">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Provenance</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Row label="Reading time" value={`${species.readingMinutes} min`} />
              <Row label="Last verified" value={species.lastVerified} />
              <Row label="Media engine" value={m?.generator} />
              <Row label="Discovery" value={s.discovery} />
              <Row label="Locomotion" value={s.locomotion} />
            </dl>
            {m?.rightsNote && (
              <p className="mt-4 rounded-xl bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
                {m.rightsNote}
              </p>
            )}
            <a
              href={`${SITE.github}/blob/main/${species.githubPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
            >
              View source on GitHub
            </a>
          </div>
        </aside>
      </div>

      {species.sources.length > 0 && (
        <section className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold">Sources</h2>
          <ul className="mt-4 space-y-2">
            {species.sources.map((src) => (
              <li key={src.url} className="text-sm">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  {src.title}
                </a>
                {src.tier ? <span className="ml-2 text-muted-foreground">· Tier {src.tier}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold">Related in clade</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  href={r.href}
                  className={cn(
                    "block rounded-xl border border-border bg-card p-4 transition hover:border-primary/30",
                  )}
                >
                  <p className="font-semibold">{r.commonName}</p>
                  <p className="text-sm italic text-muted-foreground">{r.scientificName}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-chip">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  )
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  )
}
