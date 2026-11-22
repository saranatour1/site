# Publishing an article

One article per pull request. Merging the PR to `main` publishes it: Cloudflare Workers Builds rebuilds the site, and the article shows up on `/articles`, in `/rss.xml` and in the sitemap.

This file lives outside `public/` and `src/pages/`, so it is not part of the website.

## 1. Branch

```bash
git switch main && git pull
git switch -c article/my-post
```

## 2. Write

Create `src/content/articles/my-post.md`. The file name is the URL: `saranatour.dev/articles/my-post`.

```md
---
title: My post title
description: One sentence for search results and link previews.
pubDate: 2026-11-25
draft: true
---

Write the article here in Markdown.
```

Optional: where you posted it. Each entry shows as a logo next to the date, linking to the post (supported: `linkedin`, `x`):

```md
shared:
  - platform: linkedin
    url: https://www.linkedin.com/posts/...
  - platform: x
    url: https://x.com/.../status/...
```

`draft: true` keeps it off the live site. Drafts still show in `pnpm dev`, at `localhost:4321/articles/my-post`.

## 3. Narration (optional)

Skip this section for a text-only article.

1. **Record** yourself reading the article. Read the text as written: a sentence you change while reading won't be highlighted. Don't read the title; it isn't part of the timed text.
2. **Export** a mono MP3, about 64 kbps, and save it as `public/audio/my-post.mp3`. That folder is gitignored, so the MP3 never goes into the repo.
3. **Add** `narrated: true` to the frontmatter.

   To also offer the unprocessed recording, save it as `public/audio/my-post.original.mp3` (the cleaned-up Krisp version stays `my-post.mp3`) and add `originalAudio: true`. The player then shows a Krisp / Original switch. Both files share one timings file, so they must have the same pauses: export both from the same take, and don't let Krisp trim silences.
4. **Mark the timings.** In `pnpm dev`, open the article and click **Record timings (dev only)**. The audio plays from the start; press **Space** each time you begin a new sentence, **Backspace** to undo a mistap. Click the button again to save.
5. **Move** the downloaded `my-post.vtt` into `public/narration/` and reload. Press play and check the highlight follows you. To fix one sentence, edit its time in the `.vtt` by hand; to redo the lot, record the timings again.
6. **Upload** the audio:

   ```bash
   pnpm wrangler r2 object put site-audio/my-post.mp3 --file public/audio/my-post.mp3 --remote
   ```

   With `originalAudio: true`, upload `my-post.original.mp3` the same way.

If highlights consistently feel late or early, adjust `TAP_LAG` in `src/pages/articles/[slug].astro`.

## 4. Open the PR

1. Change `draft: true` to `draft: false`.
2. Commit the article, plus `public/narration/my-post.vtt` if it has audio.
3. Push and open a PR titled `Article: My post title`.

Before merging, check:

- [ ] `pnpm build` passes.
- [ ] `draft: false`, and `pubDate` is the day you publish.
- [ ] `description` reads well on its own: it is what link previews and search results show.
- [ ] Narrated: the MP3 is uploaded, and `https://audio.saranatour.dev/my-post.mp3` plays in the browser.

## 5. Merge

Merge to `main`. After the deploy finishes, open the live article and press play.

## Fixing a published article

Edit the `.md` in a new PR. If it is narrated and you changed a sentence, the highlight skips that sentence until you re-record it and redo the timings. To replace the audio, upload the new MP3 under the same name; browsers and the CDN may keep serving the old one for a while.

## Removing an article

Delete the `.md` (and its `.vtt`) in a PR. Optionally delete the audio:

```bash
pnpm wrangler r2 object delete site-audio/my-post.mp3 --remote
```
