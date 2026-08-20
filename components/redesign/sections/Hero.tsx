import Image from "next/image";
import Button from "@/components/redesign/ui/Button";
import Eyebrow from "@/components/redesign/ui/Eyebrow";
import { orbitNodes } from "@/data/redesign/services";

function OrbitDiagram() {
  const radius = 40;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl">
      <div
        className="absolute inset-[8%] rounded-full border border-rd-border"
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_60px_-10px_var(--rd-purple)]">
        <Image
          src="/logo.png"
          alt="Brave Alchemy Studio"
          fill
          className="rounded-full object-cover"
        />
      </div>

      {orbitNodes.map((node, i) => {
        const angle = (i / orbitNodes.length) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        return (
          <div
            key={node.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-rd-gold/60 bg-rd-bg text-rd-gold">
              <node.icon size={22} strokeWidth={1.5} />
            </span>
            <span className="text-sm uppercase tracking-widest text-rd-text-muted">
              {node.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow className="whitespace-nowrap">Websites • Workflows • Automation</Eyebrow>
          <h1 className="mt-6 font-display text-5xl leading-[1.1] text-rd-text-primary sm:text-6xl">
            Turn your business chaos into something that{" "}
            <span className="italic text-rd-purple underline decoration-rd-purple/50 underline-offset-4">
              works.
            </span>
          </h1>
          <p className="mt-6 max-w-md text-rd-text-muted">
            Web design, business operations, and automation for small
            businesses who are ready to stop juggling everything alone.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/start-a-project?build=website" variant="solid">
              BUILD MY WEBSITE
            </Button>
            <Button href="/start-a-project?build=digitalOps">
              FIX MY WORKFLOW
            </Button>
          </div>
        </div>

        <OrbitDiagram />
      </div>
    </section>
  );
}
