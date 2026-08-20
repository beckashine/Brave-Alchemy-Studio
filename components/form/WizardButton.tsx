import { ReactNode } from "react";

export default function WizardButton({
  children,
  onClick,
  type = "button",
  variant = "outline",
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "outline" | "solid";
  disabled?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-5 py-3 font-rd-mono text-sm uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50";
  const styles =
    variant === "solid"
      ? "bg-rd-purple text-rd-purple-fg hover:bg-rd-purple-dim"
      : "border border-rd-purple text-rd-text-primary hover:bg-rd-purple hover:text-rd-purple-fg";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
