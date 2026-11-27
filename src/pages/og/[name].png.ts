import type { APIRoute, GetStaticPaths } from "astro";
import { siteOgImage } from "../../lib/og";

// The default share cards (BaseHead.astro). Each platform crops to its own ratio, so each gets its own height.
const heights = { "og-linkedin": 627, "og-twitter": 675, "og-discord": 630 };

export const getStaticPaths = (() =>
  Object.entries(heights).map(([name, height]) => ({ params: { name }, props: { height } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(await siteOgImage((props as { height: number }).height), { headers: { "Content-Type": "image/png" } });
