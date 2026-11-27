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

Images go in `src/assets/articles/` and are linked with a relative path, so the build optimizes them. For a centered photo with a caption, wrap it like this (the blank lines matter):

```md
<figure>

![What the photo shows](../../assets/articles/my-photo.png)

<figcaption>The caption under it</figcaption>
</figure>
```

`draft: true` keeps it off the live site. Drafts still show in `pnpm dev`, at `localhost:4321/articles/my-post`.

## 3. Open the PR

1. Change `draft: true` to `draft: false`.
2. Commit the article.
3. Push and open a PR titled `Article: My post title`.

Before merging, check:

- [ ] `pnpm build` passes.
- [ ] `draft: false`, and `pubDate` is the day you publish.
- [ ] `description` reads well on its own: it is what link previews and search results show.

## 4. Merge

Merge to `main`. After the deploy finishes, open the live article.

## Fixing a published article

Edit the `.md` in a new PR.

## Removing an article

Delete the `.md` in a PR.
