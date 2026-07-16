import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Life Commons Template",
  description: "Reusable encyclopedia template pattern from Blue Life Commons → Dino Life Commons.",
}

export default function TemplatePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">General template</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">Life Commons Template</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        The same operating system that powers{" "}
        <a className="text-primary underline-offset-2 hover:underline" href="https://github.com/frankxai/blue-life-commons">
          Blue Life Commons
        </a>{" "}
        (ocean) and this repo (dinosaurs) can instantiate any domain encyclopedia.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="font-serif text-2xl font-semibold">One-prompt shape (Grok Build style)</h2>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-stratum p-4 text-sm leading-relaxed text-stratum-foreground">
{`Build a <domain> encyclopedia site.
Every species page has:
- cinematic hero image (+ optional image-to-video)
- scientific name + common name
- stat chips: period/range, size, mass, diet
- sourced body markdown
- provenance rail (review status, media generator, license)
- concept-art labels on generated media
Use a dark immersive hero + warm editorial reading surface.
Content is schema-valid markdown with frontmatter.`}
        </pre>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-serif text-2xl font-semibold">Folder contract</h2>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted p-4 text-sm">
{`content/species/<clade>/<slug>.md   # SSOT artifacts
public/media/species/*              # hero image/video
app/species/[clade]/[slug]         # detail route
components/species-detail.tsx       # cinematic card UI
lib/content.ts                      # gray-matter loader
template/                           # copy-paste domain pack`}
        </pre>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-serif text-2xl font-semibold">Hard rules (never bend)</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Every factual claim needs a source tier.</li>
          <li>Generated media is concept reconstruction — never identification evidence.</li>
          <li>Science-sensitive pages ship as <code>needs-expert-review</code> until reviewed.</li>
          <li>Media job JSON captures prompt, model, path, and rights note.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-serif text-2xl font-semibold">Media generation paths</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong>Grok Build CLI (best quality match to the viral demo)</strong> — native Imagine +
            Imagine Video inside the coding agent. See{" "}
            <Link href="/docs/media-pipeline" className="text-primary underline-offset-2 hover:underline">
              media pipeline
            </Link>
            .
          </li>
          <li>
            <strong>Hermes subagents</strong> — can orchestrate Grok CLI headless; Hermes{" "}
            <code>image_generate</code> needs FAL_KEY / Nous portal; Hermes{" "}
            <code>video_generate</code> needs a configured video backend.
          </li>
          <li>
            <strong>xAI API</strong> — <code>grok-imagine-image-quality</code> +{" "}
            <code>grok-imagine-video-1.5-preview</code> when <code>XAI_API_KEY</code> is set.
          </li>
        </ol>
      </section>

      <p className="mt-10 text-sm text-muted-foreground">
        Full copy pack lives in <code>template/LIFE_COMMONS_TEMPLATE.md</code> and species frontmatter
        template under <code>content/species/_templates/</code>.
      </p>
    </main>
  )
}
