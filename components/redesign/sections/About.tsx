import { Moon } from "lucide-react";
import { about, philosophy } from "@/data/redesign/about";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 pt-32">
      <div className="grid gap-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-rd-border bg-rd-surface text-xs text-rd-text-muted lg:mx-0">
          Photo
        </div>

        <div>
          <p className="font-display text-lg text-rd-text-primary">
            {about.greeting}
          </p>
          <h2 className="mt-2 font-display text-3xl leading-snug text-rd-text-primary">
            I build websites, untangle workflows, and make technology{" "}
            <span className="italic text-rd-purple">
              {about.headlineAccent}
            </span>
            .
          </h2>
          {about.teaser.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-sm text-rd-text-muted">
              {paragraph}
            </p>
          ))}
          <a
            href="/about"
            className="mt-4 inline-block text-xs font-medium uppercase tracking-wide text-rd-purple transition-colors hover:text-rd-text-primary"
          >
            Read my full story →
          </a>
        </div>

        <div className="border border-rd-border bg-rd-surface p-6 lg:w-72">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rd-gold">
            <Moon size={14} />
            {philosophy.title}
          </div>
          {philosophy.body.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-sm text-rd-text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
