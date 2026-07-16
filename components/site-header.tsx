import Link from "next/link"
import { SITE } from "@/lib/utils"

const NAV = [
  { href: "/species", label: "Species" },
  { href: "/template", label: "Template" },
  { href: "/docs/media-pipeline", label: "Media pipeline" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stratum text-sm font-semibold text-accent shadow-elevated"
          >
            Ð
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-foreground group-hover:text-primary">
            {SITE.name}
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary sm:inline-flex"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
