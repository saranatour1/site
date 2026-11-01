import { readFile, writeFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import TurndownService from 'turndown';

// Writes a .md twin next to each built page; worker.ts serves it for Accept: text/markdown.
const markdownPages = {
  name: 'markdown-pages',
  hooks: {
    'astro:build:done': async ({ dir, pages }) => {
      const turndown = new TurndownService({ headingStyle: 'atx' }).remove(['svg', 'style', 'script']);
      // Every img is a decorative icon. A rule, because remove() loses to turndown's built-in img rule.
      turndown.addRule('noImages', { filter: 'img', replacement: () => '' });
      // Project cards wrap a whole heading in <a>; [### x](url) isn't valid markdown, ### [x](url) is.
      turndown.addRule('cardLink', {
        filter: (node) => node.nodeName === 'A' && node.querySelector('h1,h2,h3,h4,h5,h6'),
        replacement: (content, node) => `\n\n${content.trim().replace(/^(#+ )(.*)$/m, `$1[$2](${node.getAttribute('href')})`)}\n\n`,
      });
      for (const { pathname } of pages) {
        const html = await readFile(new URL(`${pathname}index.html`, dir), 'utf8');
        const main = html.match(/<main[\s\S]*<\/main>/)?.[0];
        if (!main) throw new Error(`markdown-pages: no <main> in /${pathname}`);
        // Through turndown to decode entities like &#39;.
        const title = turndown.turndown(html.match(/<title>(.*?)<\/title>/)?.[1] ?? '');
        const description = turndown.turndown(html.match(/<meta name="description" content="(.*?)"/)?.[1] ?? '');
        // JSON strings are valid YAML, so titles with colons or quotes stay safe.
        const frontmatter = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---`;
        const file = `${pathname.replace(/\/$/, '') || 'index'}.md`;
        // Flexbox spaces the contact links in HTML; in text they'd run together.
        const body = turndown.turndown(main).replaceAll(')[', ') [');
        await writeFile(new URL(file, dir), `${frontmatter}\n\n${body}\n`);
      }
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://saranatour.dev/',
  integrations: [sitemap(), markdownPages],

  vite: {
    plugins: [tailwindcss()]
  }
});
