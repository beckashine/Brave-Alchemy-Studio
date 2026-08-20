import { services } from "@/data/redesign/services";

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-24">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.title}
            className="border border-rd-border bg-rd-surface p-6"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-rd-gold/60 text-rd-gold">
              <service.icon size={22} strokeWidth={1.5} />
            </span>
            <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-rd-text-primary">
              {service.title}
            </h3>
            <p className="mt-2 text-sm text-rd-text-muted">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
