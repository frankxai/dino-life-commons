import { SITE } from "@/lib/utils"

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-medium text-foreground">{SITE.name}</p>
          <p className="mt-1 max-w-xl">
            Pattern sibling of{" "}
            <a className="text-primary underline-offset-2 hover:underline" href={SITE.parentPattern}>
              Blue Life Commons
            </a>
            . Generated media is concept reconstruction, not fossil evidence.
          </p>
        </div>
        <p className="font-mono text-xs">CC-BY-4.0 content · open source code</p>
      </div>
    </footer>
  )
}
