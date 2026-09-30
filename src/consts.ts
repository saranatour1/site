import Email from "./components/Icons/Email.astro";
import Github from "./components/Icons/Github.astro";
import LinkedIn from "./components/Icons/LinkedIn.astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
export const SITE_TITLE = "Sara Natour's Personal website";
export const SITE_DESCRIPTION = "The personal Website of Sara Natour.";

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
    icon: "https://tanstack.com/favicon.ico",
    url: "https://tanstack.com/",
  },
  {
    name: "shadcn UI",
    icon: "https://ui.shadcn.com/favicon.ico",
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
      ["Convex", "convex.png"], ["Astro", "astro.svg"], ["Vite", "vite.svg"], ["TanStack", "tanstack.svg"],
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
      ["Databuddy", "databuddy.svg"],
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

export const projectLinks = [
  {
    name: "Gemini Chat app",
    description: "A chat app built with NextJS and Convex",
    url: "https://gemeni-app-azure.vercel.app/",
    tools: ["NextJS", "Convex", "TailwindCSS", "shadcn UI"],
    upcoming: false,
  },
  {
    name: "Personal Job Application tracker (for the Applicant)",
    description: "No more excuses, This is an actual Personal job tracker that pays off, and is completely free, self-hosted.",
    url: null,
    tools: ["Tanstack Start", "Convex", "Firecrawl", "Agent"],
    upcoming: true,
  },
  {
    name: "Sirdab (client work)",
    description: "An online Art website for viewing, reading articles, sharing your artworks.",
    url: null,
    tools: ["Astro", "Convex", "Resend"],
    upcoming: true,
  },
  {
    name: "link shortener app",
    description: "A link shortener app built with NextJS and Convex",
    url: null,
    tools: ["Tanstack start", "Convex"],
    upcoming: true,
  },
];
