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
      // set when an article is meaningfully revised; shown to search engines as dateModified
      updatedDate: z.coerce.date().optional(),
      // topics, used as article:tag and schema.org keywords
      tags: z.array(z.string()).default([]),
      // where the article was posted, shown as logos next to the date
      shared: z.array(z.object({ platform: z.enum(["linkedin", "x"]), url: z.url() })).default([]),
      // drafts show in `astro dev` only
      draft: z.boolean().default(false),
    }),
  }),
};
