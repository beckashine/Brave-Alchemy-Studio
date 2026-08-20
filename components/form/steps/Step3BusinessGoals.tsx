import { useFormContext, useWatch } from "react-hook-form";
import TextAreaField from "@/components/form/fields/TextAreaField";
import CheckboxGroup from "@/components/form/fields/CheckboxGroup";
import type { OrderFormValues } from "@/data/order-form-schema";
import { goalOptions } from "@/data/order-form-schema";

export default function Step3BusinessGoals() {
  const { control } = useFormContext<OrderFormValues>();
  const goals = useWatch({ control, name: "goals" });

  return (
    <div className="space-y-6">
      <TextAreaField
        name="businessDescription"
        label="Tell me about your business — what you offer and who you serve"
        required
      />
      <CheckboxGroup
        name="goals"
        label="Website goals"
        options={goalOptions}
        required
      />
      {goals?.includes("Other") && (
        <TextAreaField
          name="goalsOther"
          label="Tell me more about that goal"
          rows={2}
        />
      )}
    </div>
  );
}
