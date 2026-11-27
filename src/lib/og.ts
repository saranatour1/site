// Builds the Open Graph cards at build time, in the homepage's look: cream ground, a teal rounded frame,
// Recoleta. satori lays them out as SVG, sharp turns it into PNG.
import { readFile } from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";
import { readingMinutes, type Article } from "./articles";

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  // The Recoleta demo font swaps fi/fl for a placeholder ligature; a zero-width non-joiner keeps the letters apart.
  props: { style, children: typeof children === "string" ? children.replace(/f(?=[il])/g, "f‌") : children },
});

const ink = "#1a1a1a";
const body = "#4a4843";
const muted = "#6b6860";
const teal = "#2a9d8f"; // the card border

// Handles in two columns. Icon paths from Simple Icons; LinkedIn's from src/components/Icons/LinkedIn.astro.
const SOCIALS: { handle: string; d: string; viewBox?: string }[][] = [
  [
    { handle: "sarant", d: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" },
    { handle: "_sarant", d: "M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z" },
    { handle: "_sarant", d: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z" },
  ],
  [
    { handle: "saranatour", d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" },
    { handle: "saranatour", viewBox: "4 4 24 24", d: "M4 5.719C4 4.7695 4.789 4 5.7625 4H26.2375C27.211 4 28 4.7695 28 5.719V26.281C28 27.2305 27.211 28 26.2375 28H5.7625C4.789 28 4 27.2305 4 26.281V5.719ZM11.4145 24.091V13.2535H7.813V24.091H11.4145ZM9.6145 11.773C10.87 11.773 11.6515 10.942 11.6515 9.901C11.629 8.8375 10.8715 8.029 9.6385 8.029C8.4055 8.029 7.6 8.839 7.6 9.901C7.6 10.942 8.3815 11.773 9.5905 11.773H9.6145ZM16.9765 24.091V18.0385C16.9765 17.7145 17.0005 17.3905 17.0965 17.1595C17.356 16.513 17.9485 15.8425 18.9445 15.8425C20.248 15.8425 20.7685 16.8355 20.7685 18.2935V24.091H24.37V17.875C24.37 14.545 22.594 12.997 20.224 12.997C18.313 12.997 17.4565 14.047 16.9765 14.7865V14.824H16.9525C16.9605 14.8115 16.9685 14.799 16.9765 14.7865V13.2535H13.3765C13.4215 14.2705 13.3765 24.091 13.3765 24.091H16.9765Z" },
  ],
];
const icon = (d: string, viewBox = "0 0 24 24"): Node => ({
  type: "img",
  props: {
    src: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="${ink}"><path d="${d}"/></svg>`)}`,
    width: 28,
    height: 28,
  },
});

// The homepage card: cream page, 2px teal border, rounded corners.
const card = (height: number, style: Record<string, unknown>, children: Node[]) =>
  // satori sizes boxes content-box by default, so padding and border would push the frame off the image
  el("div", { width: 1200, height, boxSizing: "border-box", display: "flex", padding: 40, background: "#fcf8ef", color: ink, fontFamily: "Recoleta" }, [
    el("div", { flexGrow: 1, boxSizing: "border-box", display: "flex", border: `2px solid ${teal}`, borderRadius: 28, ...style }, children),
  ]);

let font: Promise<Buffer> | undefined;
async function png(node: Node, height: number): Promise<ArrayBuffer> {
  const data = await (font ??= readFile("src/assets/fonts/Recoleta-RegularDEMO.otf"));
  const svg = await satori(node as never, { width: 1200, height, fonts: [{ name: "Recoleta", data, weight: 400, style: "normal" }] });
  const out = await sharp(Buffer.from(svg)).png().toBuffer();
  return out.buffer.slice(out.byteOffset, out.byteOffset + out.byteLength) as ArrayBuffer;
}

const clip = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

/** The card for every page that isn't an article. Platforms crop to different ratios, so the height varies. */
export const siteOgImage = (height: number) =>
  png(
    card(height, { flexDirection: "column", justifyContent: "center", padding: "56px 88px" }, [
      el("div", { fontSize: 26, color: muted }, "saranatour.dev"),
      el("div", { marginTop: 20, fontSize: 96, lineHeight: 1, letterSpacing: -1 }, "Sara Natour"),
      el("div", { marginTop: 40, width: 640, height: 1, background: "rgba(42, 157, 143, 0.4)" }),
      el(
        "div",
        { marginTop: 36, display: "flex", gap: 80, fontSize: 26 },
        SOCIALS.map((column) =>
          el(
            "div",
            { display: "flex", flexDirection: "column", gap: 20, width: 260 },
            column.map(({ handle, d, viewBox }) => el("div", { display: "flex", alignItems: "center", gap: 14 }, [icon(d, viewBox), handle])),
          ),
        ),
      ),
    ]),
    height,
  );

/** An article's 1200x630 card. */
export async function articleOgImage(article: Article): Promise<ArrayBuffer> {
  const { title, description, pubDate } = article.data;
  const date = pubDate.toLocaleDateString("en", { dateStyle: "medium" });

  return png(
    card(630, { flexDirection: "column", padding: "60px 80px 56px" }, [
      el("div", { fontSize: 26, color: muted }, clip(`saranatour.dev/articles/${article.id}`, 64)),
      el(
        "div",
        { marginTop: 28, maxWidth: 880, fontSize: title.length > 40 ? 56 : 76, lineHeight: 1.05, letterSpacing: -0.8 },
        clip(title, 80),
      ),
      el("div", { marginTop: 24, maxWidth: 820, fontSize: 28, lineHeight: 1.4, color: body }, clip(description, 110)),
      el("div", { flexGrow: 1 }),
      el("div", { display: "flex", gap: 16, fontSize: 26 }, [
        el("div", {}, "Sara Natour"),
        el("div", { color: muted }, `${date} · ${readingMinutes(article)} min read`),
      ]),
    ]),
    630,
  );
}
