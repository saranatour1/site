// Builds an article's 1200x630 Open Graph card at build time, in the style of public/og/*.png:
// black, thin frame lines, Inter. satori lays it out as SVG, sharp turns it into PNG.
import { readFile } from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";
import { readingMinutes, type Article } from "./articles";

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 600; style: "normal" }[]> | undefined;
const loadFonts = () =>
  (fonts ??= Promise.all(
    ([[400, "Regular"], [600, "SemiBold"]] as const).map(async ([weight, file]) => ({
      name: "Inter",
      data: await readFile(`src/assets/fonts/Inter-${file}.ttf`),
      weight,
      style: "normal" as const,
    })),
  ));

const clip = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

export async function articleOgImage(article: Article): Promise<ArrayBuffer> {
  const { title, description, pubDate, narrated } = article.data;
  const line = "#3a3a3a";
  const date = pubDate.toLocaleDateString("en", { dateStyle: "medium" });

  const card = el(
    "div",
    {
      width: 1200,
      height: 630,
      display: "flex",
      position: "relative",
      background: "#000",
      fontFamily: "Inter",
      color: "#fff",
    },
    [
      el("div", { position: "absolute", top: 64, left: 0, width: 1200, height: 1, background: line }),
      el("div", { position: "absolute", bottom: 64, left: 0, width: 1200, height: 1, background: line }),
      el("div", { position: "absolute", left: 64, top: 0, width: 1, height: 630, background: line }),
      el("div", { position: "absolute", right: 64, top: 0, width: 1, height: 630, background: line }),
      el(
        "div",
        { position: "absolute", top: 112, left: 130, right: 130, bottom: 104, display: "flex", flexDirection: "column" },
        [
          el("div", { fontSize: 26, color: "#8a8a8a" }, "saranatour.dev / articles"),
          el(
            "div",
            { marginTop: 24, fontSize: title.length > 48 ? 56 : 68, fontWeight: 600, lineHeight: 1.1, letterSpacing: -1 },
            clip(title, 90),
          ),
          el("div", { marginTop: 22, fontSize: 28, lineHeight: 1.4, color: "#9a9a9a" }, clip(description, 120)),
          el("div", { flexGrow: 1 }),
          el("div", { width: 560, borderTop: "2px dashed #444", marginBottom: 26 }),
          el("div", { display: "flex", alignItems: "center", gap: 18, fontSize: 26 }, [
            el("div", { color: "#fff" }, "Sara Natour"),
            el("div", { color: "#8a8a8a" }, `${date} · ${readingMinutes(article)} min read`),
            ...(narrated ? [el("div", { color: "#2a9d8f" }, "· With audio")] : []),
          ]),
        ],
      ),
    ],
  );

  const svg = await satori(card as never, { width: 1200, height: 630, fonts: await loadFonts() });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return png.buffer.slice(png.byteOffset, png.byteOffset + png.byteLength) as ArrayBuffer;
}
