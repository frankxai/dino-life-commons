export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export const SITE = {
  name: "Dino Life Commons",
  tagline: "Open deep-time intelligence — sourced pages, cinematic reconstructions, reusable template.",
  github: "https://github.com/frankxai/dino-life-commons",
  parentPattern: "https://github.com/frankxai/blue-life-commons",
}
