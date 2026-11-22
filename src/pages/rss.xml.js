import { getCollection } from "astro:content";

// Hand-written feed: a handful of fields isn't worth the @astrojs/rss dependency.
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET({ site }) {
  const articles = (await getCollection("articles", ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const items = articles.map(({ id, data }) => {
    const link = new URL(`/articles/${id}/`, site);
    return `<item><title>${esc(data.title)}</title><link>${link}</link><guid>${link}</guid><description>${esc(data.description)}</description><pubDate>${data.pubDate.toUTCString()}</pubDate></item>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Sara Natour</title><link>${site}</link><description>Articles by Sara Natour.</description>${items.join("")}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
