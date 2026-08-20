import { Controller, useFormContext } from "react-hook-form";
import type { OrderFormValues } from "@/data/order-form-schema";

type ArrayFieldName = "goals" | "assets" | "functionalFeatures";

export default function CheckboxGroup({
  name,
  label,
  options,
  required = false,
}: {
  name: ArrayFieldName;
  label: string;
  options: readonly string[];
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
        render={({ field }) => {
          const selected = (
            Array.isArray(field.value) ? field.value : []
          ) as string[];
          const toggle = (option: string) => {
            field.onChange(
              selected.includes(option)
                ? selected.filter((v: string) => v !== option)
                : [...selected, option],
            );
          };
          return (
            <div className="mt-3 flex flex-wrap gap-2">
              {options.map((option) => {
                const active = selected.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggle(option)}
                    aria-pressed={active}
                    className={`border px-4 py-2 text-xs uppercase tracking-wide transition-colors ${
                      active
                        ? "border-rd-purple bg-rd-purple text-rd-purple-fg"
                        : "border-rd-border text-rd-text-muted hover:border-rd-purple hover:text-rd-text-primary"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          );
        }}
      />
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
