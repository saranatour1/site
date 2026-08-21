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
    name: "Convex",
    icon: "https://www.convex.dev/favicon.ico",
    url: "https://www.convex.dev/",
  },
];
