import type { APIRoute, GetStaticPaths } from "astro";
import { getArticles, type Article } from "../../../lib/articles";
import { articleOgImage } from "../../../lib/og";

export const getStaticPaths = (async () =>
  (await getArticles()).map((article) => ({ params: { slug: article.id }, props: { article } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(await articleOgImage((props as { article: Article }).article), { headers: { "Content-Type": "image/png" } });
