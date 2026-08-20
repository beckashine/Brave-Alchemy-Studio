export default function Eyebrow({
  children,
  align = "left",
  className = "",
}: {
  children: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 font-rd-mono text-sm font-semibold uppercase tracking-[0.2em] text-rd-purple ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      <span className="h-px w-6 bg-rd-purple" aria-hidden="true" />
      {children}
    </p>
  );
}
