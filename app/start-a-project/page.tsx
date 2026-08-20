import type { Metadata } from "next";
import Header from "@/components/redesign/sections/Header";
import Footer from "@/components/redesign/sections/Footer";
import StepWizard from "@/components/form/StepWizard";

export const metadata: Metadata = {
  title: "Start a Project — Brave Alchemy Studio",
  description:
    "Tell me about your project and get a scope + pricing confirmation.",
};

export default async function StartAProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ build?: string }>;
}) {
  const { build } = await searchParams;
  const initialBranch =
    build === "website" || build === "digitalOps" ? build : undefined;

  return (
    <div className="redesign-theme flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex-1 pb-24">
        <section className="mx-auto max-w-3xl px-6 pt-10 text-center">
          <h1 className="font-display text-3xl text-rd-text-primary sm:text-4xl">
            Start a Project
          </h1>
          <p className="mt-3 text-rd-text-muted">
            A few quick steps to tell me what you need. No payment info —
            I&apos;ll follow up with scope and a PayPal invoice.
          </p>
        </section>

        <div className="mx-auto max-w-3xl px-6 pt-8">
          <StepWizard initialBranch={initialBranch} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
