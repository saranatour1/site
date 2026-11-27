import Email from "./components/Icons/Email.astro";
import Github from "./components/Icons/Github.astro";
import LinkedIn from "./components/Icons/LinkedIn.astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
export const SITE_TITLE = "Sara Natour's Personal website";
export const SITE_DESCRIPTION = "The personal Website of Sara Natour.";
// Article narration audio: public/audio/ (gitignored) in dev, the R2 bucket in production.
export const AUDIO_BASE = import.meta.env.DEV ? "/audio" : "https://audio.saranatour.dev";

type SocialLink = {
  url: string;
  icon: AstroComponentFactory;
  label: string;
}

// Links whose PUBLIC_* env var is unset are dropped, so no anchor renders without an href.
export const socialLinks: SocialLink[] = [
  { url: import.meta.env.PUBLIC_EMAIL, icon: Email, label: "email" },
  { url: import.meta.env.PUBLIC_LINKEDIN, icon: LinkedIn, label: "linkedin" },
  { url: import.meta.env.PUBLIC_GITHUB, icon: Github, label: "github" },
].filter((l) => l.url);

export const skillSet = [
  {
    name: "TypeScript",
    icon: "/icons/stack/typescript.svg",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "React",
    icon: "/icons/stack/react.svg",
    url: "https://reactjs.org/",
  },
  {
    name: "Convex",
    icon: "/icons/stack/convex.png",
    url: "https://www.convex.dev/",
  },
  {
    name: "Vite",
    icon: "/icons/stack/vite.svg",
    url: "https://vite.dev/",
  },
  {
    name: "TanStack",
    icon: "/icons/stack/tanstack.svg",
    url: "https://tanstack.com/",
  },
  {
    name: "shadcn UI",
    icon: "/icons/stack/shadcnui.svg",
    url: "https://ui.shadcn.com/",
  },
  {
    name: "VueJS",
    icon: "/icons/stack/vuejs.svg",
    url: "https://vuejs.org/",
  },
  {
    name: "Svelte",
    icon: "/icons/stack/svelte.svg",
    url: "https://svelte.dev/",
  },
];

// [name, icon file in public/icons/stack, optional note]
export const techStack: { title: string; items: [string, string, string?][] }[] = [
  {
    title: "Building with",
    items: [
      ["Convex", "convex.png"], ["Astro", "astro.svg"], ["Vite", "vite.svg"], ["Vite+", "viteplus.svg"], ["TanStack", "tanstack.svg"],
      ["TypeScript", "typescript.svg"], ["shadcn UI", "shadcnui.svg"],
      ["Cloudflare", "cloudflare.svg"], ["Go", "go.svg", "learning"],
    ],
  },
  {
    title: "AI & agents",
    items: [
      ["Claude Agent", "claude.svg"], ["Cursor", "cursor.svg"], ["Grok Bot", "grok.png"],
      ["Vapi", "vapi.svg"], ["Firecrawl", "firecrawl.png"], ["AgentMail", "agentmail.png"],
      ["Entire", "entire.svg"], ["OpenUsage", "openusage.svg"],
    ],
  },
  {
    title: "Workflow",
    items: [
      ["VS Code", "visualstudiocode.svg"], ["GitHub", "github.svg"], ["Linear", "linear.svg"],
      ["Notion", "notion.svg"], ["Raycast", "raycast.svg"], ["Superhuman", "superhuman.svg"],
      ["Databuddy", "databuddy.svg"], ["Capy", "capy.png"], ["Claude AI", "claude.svg"],
    ],
  },
  {
    title: "Everyday",
    items: [
      ["1Password", "1password.svg"], ["NordVPN", "nordvpn.svg"],
      ["Discord", "discord.svg"], ["Steam", "steam.svg"],
    ],
  },
];
