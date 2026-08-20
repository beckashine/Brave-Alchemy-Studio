import type { SocialLabel } from "@/data/nav";

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/#services" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/#contact" },
];

/** ⚠️ Placeholder — real handles unconfirmed (same open question as the main site). */
export const socialLinks: { label: SocialLabel; href: string }[] = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X", href: "#" },
];
