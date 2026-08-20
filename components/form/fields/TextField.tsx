import { useFormContext } from "react-hook-form";
import type { OrderFormValues } from "@/data/order-form-schema";

export default function TextField({
  name,
  label,
  placeholder,
  required = false,
  type = "text",
}: {
  name: keyof OrderFormValues;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<OrderFormValues>();
  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="block text-sm text-rd-text-primary">
        {label}
        {required && <span className="text-rd-purple"> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="mt-2 w-full border border-rd-border bg-transparent px-4 py-3 text-sm text-rd-text-primary placeholder:text-rd-text-muted focus:border-rd-purple focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
