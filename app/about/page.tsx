import type { Metadata } from "next";
import Header from "@/components/redesign/sections/Header";
import Footer from "@/components/redesign/sections/Footer";
import CtaBanner from "@/components/redesign/sections/CtaBanner";
import { Moon } from "lucide-react";
import { about, philosophy } from "@/data/redesign/about";

export const metadata: Metadata = {
  title: "About — Brave Alchemy Studio",
  description: "The person behind Brave Alchemy Studio.",
};

export default function AboutPage() {
  return (
    <div className="redesign-theme flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex-1 pb-24">
        <section className="mx-auto max-w-3xl px-6 pt-16">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-rd-border bg-rd-surface text-xs text-rd-text-muted">
              Photo
            </div>
            <div>
              <p className="font-display text-lg text-rd-text-primary">
                {about.greeting}
              </p>
              <h1 className="mt-2 font-display text-3xl leading-snug text-rd-text-primary">
                I build websites, untangle workflows, and make technology{" "}
                <span className="italic text-rd-purple">
                  {about.headlineAccent}
                </span>
                .
              </h1>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {about.bio.map((paragraph) => (
              <p key={paragraph} className="text-lg text-rd-text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 border border-rd-border bg-rd-surface p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rd-gold">
              <Moon size={14} />
              {philosophy.title}
            </div>
            {philosophy.body.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-base text-rd-text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
