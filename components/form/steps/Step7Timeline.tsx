import { useFormContext, useWatch } from "react-hook-form";
import RadioTiles from "@/components/form/fields/RadioTiles";
import TextField from "@/components/form/fields/TextField";
import type { OrderFormValues } from "@/data/order-form-schema";
import { timelineOptions } from "@/data/order-form-schema";

export default function Step7Timeline() {
  const { control } = useFormContext<OrderFormValues>();
  const preferredLaunch = useWatch({ control, name: "preferredLaunch" });

  return (
    <div className="space-y-6">
      <RadioTiles
        name="preferredLaunch"
        label="Preferred launch"
        options={timelineOptions}
        required
      />
      {preferredLaunch === "SPECIFIC_DATE" && (
        <TextField
          name="specificDate"
          label="Requested launch date"
          type="date"
          required
        />
      )}
      <p className="text-xs text-rd-text-muted">
        This is a requested target, not a guarantee — the timeline begins
        once I have your content/assets and the initial payment.
      </p>
    </div>
  );
}
