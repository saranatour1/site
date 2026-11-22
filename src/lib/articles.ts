import { getCollection, type CollectionEntry } from "astro:content";

export type Article = CollectionEntry<"articles">;

/** Published articles, newest first. Drafts are included in `astro dev`. */
export async function getArticles(): Promise<Article[]> {
  const articles = await getCollection("articles", ({ data }) => import.meta.env.DEV || !data.draft);
  return articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// ponytail: 200 words a minute over the raw Markdown; code and link URLs count as words.
export const readingMinutes = (article: Article) =>
  Math.max(1, Math.round((article.body ?? "").split(/\s+/).filter(Boolean).length / 200));

export const longDate = (date: Date) => date.toLocaleDateString("en", { dateStyle: "long" });
