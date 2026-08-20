import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "outline" | "solid";
  withArrow?: boolean;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "outline",
  withArrow = false,
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-5 py-3 font-rd-mono text-sm uppercase tracking-wide transition-colors";
  const styles =
    variant === "solid"
      ? "bg-rd-purple text-rd-purple-fg hover:bg-rd-purple-dim"
      : "border border-rd-purple text-rd-text-primary hover:bg-rd-purple hover:text-rd-purple-fg";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      {withArrow && (
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}
