import Link from "next/link";
import { Plus } from "lucide-react";
import { ReactNode } from "react";

export default function Button({
  href,
  children,
  variant = "outline",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "outline" | "solid";
  size?: "md" | "lg";
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-2 rounded-full font-rd-mono font-medium tracking-wide transition-colors";
  const sizes =
    size === "lg" ? "px-9 py-4 text-lg" : "px-6 py-3 text-sm";
  const styles =
    variant === "solid"
      ? "bg-rd-purple text-rd-text-primary hover:bg-rd-purple-dim"
      : "border border-rd-border text-rd-text-primary hover:border-rd-purple";
  const iconSize = size === "lg" ? 18 : 14;

  return (
    <Link href={href} className={`${base} ${sizes} ${styles} ${className}`}>
      {children}
      <Plus
        size={iconSize}
        className="transition-transform group-hover:rotate-90"
      />
    </Link>
  );
}
