# Dino Life Commons

**Open deep-time intelligence** — a dinosaur encyclopedia built as a domain sibling of [Blue Life Commons](https://github.com/frankxai/blue-life-commons), with cinematic Grok Imagine heroes and a reusable life-commons template.

[![License: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-0891b2)](https://creativecommons.org/licenses/by/4.0/)

## Why this exists

Someone built a full dinosaur encyclopedia in **Grok Build** with every image/video from Imagine. This repo captures that *product shape* (cinematic species pages + stat chips + video heroes) while keeping the *commons discipline* from Blue Life Commons: sources, review state, provenance, and a reusable template for any domain.

## Quick start

```bash
pnpm install   # or npm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's inside

```
dino-life-commons
├── content/species/          # sourced markdown artifacts
├── public/media/species/     # Grok Imagine PNG + MP4 heroes
├── app/species/[clade]/[slug]
├── components/species-detail.tsx   # cinematic encyclopedia UI
├── template/                 # general life-commons template pack
└── docs via /template + /docs/media-pipeline
```

### Seed species

| Species | Clade | Media |
|---|---|---|
| *Ankylosaurus magniventris* | Ornithischia | PNG + MP4 |
| *Triceratops horridus* | Ornithischia | PNG |
| *Tyrannosaurus rex* | Theropoda | PNG |
| *Brachiosaurus altithorax* | Sauropodomorpha | PNG |

## Media generation (Grok quality)

Hermes FAL image gen may be unconfigured. **Working path** used here:

```bash
export HOME=$USERPROFILE
grok -p "Use native Imagine image_gen / image_to_video ... save to public/media/species" \
  --no-alt-screen --always-approve --max-turns 25 --output-format plain
```

Details: site route `/docs/media-pipeline` and `template/LIFE_COMMONS_TEMPLATE.md`.

## Hard rules

- Factual claims need sources.
- Generated art is **concept reconstruction**, never identification proof.
- Science pages stay `needs-expert-review` until reviewed.

## Pattern lineage

| Layer | Repo |
|---|---|
| Ocean commons | `frankxai/blue-life-commons` |
| Dino instance | `frankxai/dino-life-commons` (this) |
| Template pack | `template/LIFE_COMMONS_TEMPLATE.md` |

## License

Content: CC-BY-4.0 unless an artifact says otherwise. Code: open source with the repository.
