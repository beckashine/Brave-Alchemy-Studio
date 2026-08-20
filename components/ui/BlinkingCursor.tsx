export default function BlinkingCursor({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span className={`animate-cursor-blink text-rd-purple ${className}`}>_</span>
  );
}
