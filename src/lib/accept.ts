// q-value of an exact media type in an Accept header; 0 when it isn't listed.
const quality = (accept: string, type: string) => {
	for (const part of accept.toLowerCase().split(",")) {
		const [name, ...params] = part.split(";").map((s) => s.trim());
		if (name !== type) continue;
		const q = params.find((p) => p.startsWith("q="));
		return q ? Number(q.slice(2)) : 1;
	}
	return 0;
};

// Browsers never list text/markdown, so a tie with text/html means an agent asked for it.
export const prefersMarkdown = (accept: string) => {
	const markdown = quality(accept, "text/markdown");
	return markdown > 0 && markdown >= quality(accept, "text/html");
};
