# Life Commons Template — domain encyclopedia pack

Use this pack to spin a **Blue Life Commons–class** encyclopedia for any domain (dinosaurs, forests, fungi, exoplanets, museums).

## Instantiation map

| Blue Life Commons | Dino Life Commons | Your domain |
|---|---|---|
| `content/species/<guild>/` | `content/species/<clade>/` | `content/species/<group>/` |
| Ocean teal / abyss | Amber resin / stratum | Your tokens |
| IUCN + welfare | Period + mass + diet | Domain metrics |
| Wikimedia primary media | Grok Imagine concept art (labeled) | Tier A proof when available |
| marine-mcp | (future) paleo-mcp | domain-mcp |

## Minimum viable encyclopedia

1. Copy this repo or `blue-life-commons` skeleton.
2. Replace brand tokens in `app/globals.css`.
3. Author 3–10 species markdown files with sources.
4. Generate heroes:

```bash
export HOME=$USERPROFILE
grok -p "Use native Imagine to generate 16:9 photoreal heroes for each species... save under public/media/species" \
  --no-alt-screen --always-approve --max-turns 25 --output-format plain
```

5. Optional video for the flagship species via `image_to_video`.
6. Wire `imageUrl` / `videoUrl` in frontmatter.
7. `pnpm install && pnpm dev`.

## One-prompt Grok Build (viral path)

```
Build a <domain> encyclopedia site. Every image and video clip generated
by Imagine / Imagine Video. Species pages: scientific name, stat chips,
sourced body, provenance. Dark cinematic hero + warm reading surface.
```

## Non-negotiables

- Sources required for factual claims.
- Generated media labeled concept / reconstruction.
- Review status visible in UI.
- Media job JSON for every batch.

## Hermes orchestration

Hermes can **orchestrate** Grok CLI for media (subagent or terminal). Hermes native `image_generate` requires FAL/Nous image backend; `video_generate` needs a configured video provider. For Grok-quality match to the tweet demo, prefer Grok Build CLI Imagine tools.

See `/docs/media-pipeline` in the running site.
