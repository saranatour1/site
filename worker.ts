import { trackAgents } from "@databuddy/sdk/agents";

// ponytail: inline types instead of adding @cloudflare/workers-types for one file
interface Env {
	ASSETS: { fetch(request: Request): Promise<Response> };
	DATABUDDY_WEBSITE_ID: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: { waitUntil(p: Promise<unknown>): void }) {
		const websiteId = env.DATABUDDY_WEBSITE_ID;
		ctx.waitUntil(trackAgents(request, { websiteId }));
		// Assets-only site: no origin to fetch(request) from, serve dist/ instead.
		return env.ASSETS.fetch(request);
	},
};
