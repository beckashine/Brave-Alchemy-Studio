import { ReactNode } from "react";

export default function BorderedCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-rd-border bg-rd-surface ${className}`}>
      {children}
    </div>
  );
}
