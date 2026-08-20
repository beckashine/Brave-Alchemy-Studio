import { X, Check } from "lucide-react";
import { before, after } from "@/data/redesign/before-after";

export default function BeforeAfter() {
  return (
    <section className="mt-8 border-y border-rd-border bg-rd-surface-alt py-8">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-rd-mono text-[1.6rem] font-semibold uppercase tracking-[0.2em] text-rd-text-muted">
            → Before
          </p>
          <h3 className="mt-2 text-[2.15rem] leading-tight text-rd-text-primary underline decoration-rd-border underline-offset-4">
            {before.label}
          </h3>
          <ul className="mt-4 space-y-2 text-[1.8rem] leading-tight text-rd-text-muted">
            {before.items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <X size={14} className="shrink-0 text-rd-text-muted" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-right font-rd-mono text-[1.6rem] font-semibold uppercase tracking-[0.2em] text-rd-text-muted">
            After ←
          </p>
          <h3 className="mt-2 text-right text-[2.15rem] leading-tight text-rd-text-primary underline decoration-rd-purple/50 underline-offset-4">
            {after.label}
          </h3>
          <ul className="mt-4 space-y-2 text-right text-[1.8rem] leading-tight text-rd-text-muted">
            {after.items.map((item) => (
              <li key={item} className="flex items-center justify-end gap-2">
                {item}
                <Check size={14} className="shrink-0 text-rd-purple" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
