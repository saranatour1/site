import assert from "node:assert/strict";
import { test } from "node:test";
import { prefersMarkdown } from "./accept.ts";

test("prefersMarkdown", () => {
	assert.equal(prefersMarkdown("text/markdown"), true);
	assert.equal(prefersMarkdown("text/markdown, text/html"), true);
	assert.equal(prefersMarkdown("text/html;q=0.9, TEXT/Markdown"), true);
	assert.equal(prefersMarkdown(""), false);
	assert.equal(prefersMarkdown("*/*"), false);
	assert.equal(prefersMarkdown("text/html,application/xhtml+xml,*/*;q=0.8"), false);
	assert.equal(prefersMarkdown("text/markdown;q=0"), false);
	assert.equal(prefersMarkdown("text/html, text/markdown;q=0.5"), false);
	assert.equal(prefersMarkdown("text/markdown;q=junk"), false);
});
