import { trackAgents } from "@databuddy/sdk/agents";
import { prefersMarkdown } from "./src/lib/accept";
import { DATABUDDY_WEBSITE_ID } from "./src/lib/databuddy";

// ponytail: inline types instead of adding @cloudflare/workers-types for one file
interface Env {
	ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
	async fetch(request: Request, env: Env, ctx: { waitUntil(p: Promise<unknown>): void }) {
		ctx.waitUntil(trackAgents(request, { websiteId: DATABUDDY_WEBSITE_ID }));
		if (["GET", "HEAD"].includes(request.method) && prefersMarkdown(request.headers.get("accept") ?? "")) {
			const url = new URL(request.url);
			const path = url.pathname.replace(/\/$/, "") || "/index";
			const asset = await env.ASSETS.fetch(new Request(new URL(`${path}.md`, url)));
			// No .md twin (images, llms.txt, 404s): fall through to the normal response.
			if (asset.ok) {
				const markdown = await asset.text();
				const headers = new Headers(asset.headers);
				headers.set("Content-Type", "text/markdown; charset=utf-8");
				headers.set("Vary", "Accept");
				// ponytail: ~4 chars per token estimate, a real tokenizer isn't worth the bundle size
				headers.set("x-markdown-tokens", String(Math.ceil(markdown.length / 4)));
				// Same policy as robots.txt.
				headers.set("Content-Signal", "ai-train=no, search=yes, ai-input=yes");
				return new Response(markdown, { headers });
			}
		}
		// Assets-only site: no origin to fetch(request) from, serve dist/ instead.
		return env.ASSETS.fetch(request);
	},
};
