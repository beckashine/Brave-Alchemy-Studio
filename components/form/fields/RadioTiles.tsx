import { Controller, useFormContext } from "react-hook-form";
import type { OrderFormValues } from "@/data/order-form-schema";

export default function RadioTiles({
  name,
  label,
  options,
  required = false,
}: {
  name: keyof OrderFormValues;
  label: string;
  options: readonly { value: string; label: string }[];
  required?: boolean;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext<OrderFormValues>();
  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <p className="text-sm text-rd-text-primary">
        {label}
        {required && <span className="text-rd-purple"> *</span>}
      </p>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="mt-3 flex flex-wrap gap-2">
            {options.map((option) => {
              const active = field.value === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => field.onChange(option.value)}
                  aria-pressed={active}
                  className={`border px-4 py-2 text-xs uppercase tracking-wide transition-colors ${
                    active
                      ? "border-rd-purple bg-rd-purple text-rd-purple-fg"
                      : "border-rd-border text-rd-text-muted hover:border-rd-purple hover:text-rd-text-primary"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      />
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
