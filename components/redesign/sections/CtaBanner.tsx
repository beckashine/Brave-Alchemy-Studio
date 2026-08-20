import { Mail } from "lucide-react";
import Button from "@/components/redesign/ui/Button";

export default function CtaBanner() {
  return (
    <section id="contact" className="relative mt-32 overflow-hidden py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--rd-purple) 0%, var(--rd-gold) 55%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-rd-gold bg-rd-bg text-rd-gold">
          <Mail size={24} strokeWidth={1.5} />
        </span>
        <h2 className="mt-6 font-display text-4xl text-rd-text-primary">
          Ready to create something amazing?
        </h2>
        <p className="mt-3 text-lg text-rd-text-muted">
          Let&apos;s turn your vision into a system that works.
        </p>
        <div className="mt-8">
          <Button
            href="/start-a-project"
            variant="solid"
            size="lg"
            className="shadow-[0_0_50px_-10px_var(--rd-purple)] transition-shadow hover:shadow-[0_0_70px_-8px_var(--rd-purple)]"
          >
            START YOUR PROJECT
          </Button>
        </div>
      </div>
    </section>
  );
}
