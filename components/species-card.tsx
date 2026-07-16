import Link from "next/link"
import type { Species } from "@/lib/types"
import { cn } from "@/lib/utils"

export function SpeciesCard({ species, featured = false }: { species: Species; featured?: boolean }) {
  const img = species.media?.imageUrl
  return (
    <Link
      href={species.href}
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-card shadow-elevated transition hover:-translate-y-0.5 hover:border-primary/30",
        featured && "sm:col-span-2 lg:col-span-2",
      )}
    >
      <div className={cn("relative overflow-hidden bg-stratum", featured ? "aspect-[16/9]" : "aspect-[4/3]")}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={species.media?.altText ?? species.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading={featured ? "eager" : "lazy"}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stratum-muted">No media</div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{species.clade}</p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-white sm:text-2xl">{species.commonName}</h3>
          <p className="mt-0.5 text-sm italic text-white/80">{species.scientificName}</p>
        </div>
        {species.media?.videoUrl && (
          <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
            Video
          </span>
        )}
      </div>
      <div className="space-y-3 p-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{species.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {species.stats.period && <Chip>{species.stats.period}</Chip>}
          {species.stats.diet && <Chip>{species.stats.diet}</Chip>}
          {species.stats.length && <Chip>{species.stats.length}</Chip>}
        </div>
      </div>
    </Link>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{children}</span>
  )
}
