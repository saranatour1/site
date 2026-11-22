import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const collections = {
  articles: defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/articles" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      // shows the audio player; needs the mp3 (public/audio/ in dev, R2 in production)
      // and public/narration/<slug>.vtt, recorded with the dev-only "Record timings" button
      narrated: z.boolean().default(false),
      // also serve public/audio/<slug>.original.mp3 (the unprocessed recording) behind a
      // Krisp / Original switch; both files must share the same timings
      originalAudio: z.boolean().default(false),
      // where the article was posted, shown as logos next to the date
      shared: z.array(z.object({ platform: z.enum(["linkedin", "x"]), url: z.url() })).default([]),
      // drafts show in `astro dev` only
      draft: z.boolean().default(false),
    }),
  }),
};
