export default function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-rd-mono text-sm uppercase tracking-widest text-rd-purple">
      {`// ${children}`}
    </p>
  );
}
