import BorderedCard from "@/components/ui/BorderedCard";
import Button from "@/components/ui/Button";
import BlinkingCursor from "@/components/ui/BlinkingCursor";

export default function ConfirmationScreen() {
  return (
    <BorderedCard className="p-8 text-center sm:p-12">
      <p className="font-rd-mono text-sm uppercase tracking-widest text-rd-purple">
        request.sent
      </p>
      <h2 className="mt-4 font-display text-3xl text-rd-text-primary">
        Got it — request received.
        <BlinkingCursor />
      </h2>
      <p className="mx-auto mt-4 max-w-md text-rd-text-muted">
        I&apos;ll review your project request and follow up by email with
        pricing confirmation and a PayPal invoice for your deposit.
      </p>
      <Button href="/" className="mt-8">
        BACK TO HOME
        <BlinkingCursor />
      </Button>
    </BorderedCard>
  );
}
