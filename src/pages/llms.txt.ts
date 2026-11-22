import type { APIRoute } from "astro";
import intro from "../llms.txt?raw";
import { getArticles } from "../lib/articles";

// src/llms.txt is hand-written; the Articles section is generated so every article is listed.
// Links point at each article's Markdown twin, which is what language models read best.
export const GET: APIRoute = async ({ site }) => {
  const articles = (await getArticles()).filter(({ data }) => !data.draft);
  const list = articles
    .map(({ id, data }) => {
      const date = data.pubDate.toISOString().slice(0, 10);
      return `- [${data.title}](${new URL(`/articles/${id}.md`, site)}): ${data.description} (${date})`;
    })
    .join("\n");
  const section = `## Articles\n${list || "- None yet."}\n\n`;
  const body = intro.includes("## Experience") ? intro.replace("## Experience", `${section}## Experience`) : `${intro}\n${section}`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
