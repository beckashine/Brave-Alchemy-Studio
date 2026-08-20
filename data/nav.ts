export type NavLink = {
  label: string;
  href: string;
};

// "WORK" is intentionally omitted — no portfolio to show yet. Bring back
// once real client work exists (see components/sections/SelectedWork.tsx
// and data/work.ts, both left intact for that).
export const navLinks: NavLink[] = [
  { label: "SERVICES", href: "#services" },
  { label: "PROCESS", href: "#process" },
  { label: "ABOUT", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export type SocialLabel = "Instagram" | "X" | "LinkedIn" | "GitHub";

export const socialLinks: { label: SocialLabel; href: string }[] = [
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
];

export const contactEmail = "hello@bravealchemystudio.com";
export const socialHandle = "@bravealchemystudio";
