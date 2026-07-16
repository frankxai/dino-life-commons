import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Media pipeline",
  description: "How to trigger Grok Imagine + image-to-video for encyclopedia heroes from Hermes or Grok Build.",
}

export default function MediaPipelinePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Ops</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">Media pipeline</h1>
      <p className="mt-4 text-muted-foreground">
        Answer: you can trigger high-quality Grok Imagine stills and image-to-video{" "}
        <strong>directly from Hermes</strong> by shelling to Grok Build CLI — you do not need the full
        interactive Grok Build chat for every asset. Full app builds still shine in Grok Build; asset
        batches work headless.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="font-serif text-2xl font-semibold">What worked in this repo (2026-07-16)</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Hermes <code>image_generate</code> (FAL) was <strong>blocked</strong> — no FAL_KEY / Nous
            managed image backend in this session.
          </li>
          <li>
            Hermes <code>video_generate</code> reports no video backend configured by default.
          </li>
          <li>
            <strong>Grok Build CLI</strong> <code>~/.grok/bin/grok</code> with native{" "}
            <code>image_gen</code> + <code>image_to_video</code> produced 4 heroes + Ankylosaurus MP4.
          </li>
          <li>
            Provenance written to <code>public/media/species/media-job.json</code>.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-serif text-2xl font-semibold">Headless stills (Hermes → Grok)</h2>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-stratum p-4 text-xs leading-relaxed text-stratum-foreground sm:text-sm">
{`export HOME=$USERPROFILE
OUT="C:/Users/frank/starlight/repos/dino-life-commons/public/media/species"
grok -p "Use native Imagine image_gen. Generate N photoreal 16:9 heroes...
Save PNG to $OUT with exact filenames. Write media-job.json. Approve all tools." \\
  --no-alt-screen --always-approve --max-turns 25 --output-format plain`}
        </pre>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-serif text-2xl font-semibold">Headless image → video</h2>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-stratum p-4 text-xs leading-relaxed text-stratum-foreground sm:text-sm">
{`grok -p "Use native Imagine image_to_video on $SRC.
Animate 6s cinematic documentary motion. Save $OUT/species.mp4. Approve all tools." \\
  --no-alt-screen --always-approve --max-turns 15 --output-format plain`}
        </pre>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-serif text-2xl font-semibold">Full site like the viral tweet</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          The @akokoi1 demo used <strong>Grok Build</strong> end-to-end: one prompt built the app{" "}
          <em>and</em> generated every image/video via Imagine inside the same agent loop. That is still
          the fastest path for a greenfield &quot;wow&quot; prototype.
        </p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted p-4 text-xs sm:text-sm">
{`cd your-empty-folder
grok "Build a dinosaur encyclopedia site — every image and video
clip generated with Imagine / Imagine Video. Cinematic species pages
with period, length, mass, diet chips. Sourced markdown body."`}
        </pre>
        <p className="text-sm leading-relaxed text-muted-foreground">
          For production commons quality (ethics, sources, review gates), prefer this repo&apos;s hybrid:
          Grok for media, curated markdown + Next.js shell for the long-lived product.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-serif text-2xl font-semibold">Hermes subagent recipe</h2>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted p-4 text-xs sm:text-sm">
{`delegate_task goal="Generate encyclopedia hero media via Grok CLI"
context="workdir=dino-life-commons; use ~/.grok/bin/grok -p with
--always-approve; write to public/media/species; verify PNG/MP4
with file; no broad home search; Phone Link ban."`}
        </pre>
      </section>
    </main>
  )
}
