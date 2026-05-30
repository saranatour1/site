import type { ComponentType } from "react";
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

export const socialLinks: SocialLink[] = [
  { url: import.meta.env.PUBLIC_EMAIL, icon: Email, label: "email" },
  { url: import.meta.env.PUBLIC_LINKEDIN, icon: LinkedIn, label: "linkedin" },
  { url: import.meta.env.PUBLIC_GITHUB, icon: Github, label: "github" },
];

export const skillSet = [
  {
    name: "TypeScript",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "JavaScript",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "React",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg",
    url: "https://reactjs.org/",
  },
  {
    name: "NextJS",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nextjs-colored.svg",
    url: "https://nextjs.org/",
  },
  {
    name: "convex",
    icon: "https://www.convex.dev/favicon.ico",
    url: "https://www.convex.dev/",
  },
  {
    name: "TailwindCSS",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/tailwindcss-colored.svg",
    url: "https://tailwindcss.com/",
  },
  {
    name: "shadcn UI",
    icon: "https://ui.shadcn.com/favicon.ico",
    url: "https://ui.shadcn.com/",
  },
  {
    name: "Python",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/python-colored.svg",
    url: "https://www.python.org/",
  },
  {
    name: "Git",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/git-colored.svg",
    url: "https://git-scm.com/",
  },
  {
    name: "NodeJS",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg",
    url: "https://nodejs.org/en/",
  },
  {
    name: "MySQL",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mysql-colored.svg",
    url: "https://www.mysql.com/",
  },
  {
    name: "Flask",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/flask-colored.svg",
    url: "https://flask.palletsprojects.com/en/2.0.x/",
  },
  {
    name: "Django",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/django-colored.svg",
    url: "https://www.djangoproject.com/",
  },
  {
    name: "Svelte",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/svelte-colored.svg",
    url: "https://svelte.dev/",
  },
  {
    name: "VueJS",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/vuejs-colored.svg",
    url: "https://vuejs.org/",
  },
  {
    name: "Figma",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/figma-colored.svg",
    url: "https://www.figma.com/",
  },
  {
    name: "PostgreSQL",
    icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/postgresql-colored.svg",
    url: "https://www.postgresql.org/",
  },
  {
    name: "TanStack Router/start",
    icon: "https://tanstack.com/favicon.ico",
    url: "https://tanstack.com/start",
  },
  {
    name: "Claude Code",
    icon: "https://claude.ai/favicon.ico",
    url: "https://www.anthropic.com/claude-code",
  },
  {
    name: "Codex",
    icon: "https://github.com/openai.png",
    url: "https://github.com/openai/codex",
  },
  {
    name: "Antigravity",
    icon: "https://antigravity.google/favicon.ico",
    url: "https://antigravity.google/",
  },
];

export const projectLinks = [
  {
    name: "Gemeni Chat app ",
    description: "A chat app built with NextJS and Convex",
    url: "https://gemeni-app-azure.vercel.app/",
    tools: ["NextJS", "Convex", "TailwindCSS", "shadcn UI"],
    upcoming: false,
  },
  {
    name: "Personal Job Application tracker (for the Applicant)",
    description: "No more excuses, This is an actual Personal job tracker that pays off, and is completely free, self-hosted.",
    url: null,
    tools: ["TanStack Start", "Convex", "Firecrawl", "Agent"],
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
    tools: ["TanStack Start", "Convex"],
    upcoming: true,
  },
];
