import CheckboxGroup from "@/components/form/fields/CheckboxGroup";
import TextAreaField from "@/components/form/fields/TextAreaField";
import { assetOptions } from "@/data/order-form-schema";

export default function Step4ExistingAssets() {
  return (
    <div className="space-y-6">
      <CheckboxGroup
        name="assets"
        label="What do you already have?"
        options={assetOptions}
        required
      />
      <TextAreaField
        name="assetsNotes"
        label="Anything else I should know about your assets?"
        rows={3}
      />
    </div>
  );
}
