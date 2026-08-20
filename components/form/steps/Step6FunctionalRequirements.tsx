import { useFormContext, useWatch } from "react-hook-form";
import TextAreaField from "@/components/form/fields/TextAreaField";
import CheckboxGroup from "@/components/form/fields/CheckboxGroup";
import type { OrderFormValues } from "@/data/order-form-schema";
import { functionalFeatureOptions } from "@/data/order-form-schema";

export default function Step6FunctionalRequirements() {
  const { control } = useFormContext<OrderFormValues>();
  const branch = useWatch({ control, name: "branch" });
  const functionalFeatures = useWatch({ control, name: "functionalFeatures" });

  if (branch === "digitalOps") {
    return (
      <div className="space-y-6">
        <TextAreaField
          name="digitalOpsCurrentTools"
          label="What tool(s)/data source(s) does this connect to today?"
          placeholder="Spreadsheets, CRM, POS, etc."
          required
        />
        <TextAreaField
          name="digitalOpsDesiredOutcome"
          label="What should it do, in your own words?"
          required
        />
        <TextAreaField
          name="digitalOpsExistingAccounts"
          label="Any existing accounts/APIs we'll need access to?"
          rows={3}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-xs text-rd-text-muted">
        Functional features may require a custom quote — final project
        pricing is confirmed before payment.
      </p>
      <CheckboxGroup
        name="functionalFeatures"
        label="What functionality do you need?"
        options={functionalFeatureOptions}
        required
      />
      {functionalFeatures?.includes("Other") && (
        <TextAreaField
          name="functionalFeaturesOther"
          label="Tell me more about that"
          rows={2}
        />
      )}
      <TextAreaField
        name="functionalDescription"
        label="Tell me what you need the website to do"
        required
      />
    </div>
  );
}
