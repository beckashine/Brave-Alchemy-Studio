"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Button from "@/components/redesign/ui/Button";
import { navLinks } from "@/data/redesign/nav";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rd-border bg-rd-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-4">
          <span
            className="font-rd-mono text-4xl font-bold leading-none text-rd-purple"
            aria-hidden="true"
          >
            &gt;_
          </span>
          <span className="hidden h-11 w-px bg-rd-border sm:block" aria-hidden="true" />
          <span className="font-rd-mono leading-tight">
            <span className="block text-sm font-bold uppercase tracking-[0.2em] text-rd-text-primary">
              Brave Alchemy
            </span>
            <span className="block text-sm font-bold uppercase tracking-[0.2em] text-rd-purple">
              Studio<span className="animate-cursor-blink">_</span>
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-xs font-medium tracking-wide text-rd-text-muted lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-rd-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button href="/start-a-project" variant="solid" className="hidden lg:inline-flex">
          START YOUR PROJECT
        </Button>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="text-rd-text-primary lg:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-rd-border px-6 py-6 text-sm tracking-wide text-rd-text-muted lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="transition-colors hover:text-rd-text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/start-a-project" variant="solid" className="mt-2 justify-center">
            START YOUR PROJECT
          </Button>
        </nav>
      )}
    </header>
  );
}
