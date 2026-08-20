import { useFormContext } from "react-hook-form";
import type { OrderFormValues } from "@/data/order-form-schema";
import { digitalOpsTypeLabels, timelineOptions } from "@/data/order-form-schema";

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 border-b border-rd-border py-3 sm:flex-row sm:justify-between sm:gap-6">
      <span className="text-xs uppercase tracking-wide text-rd-text-muted">
        {label}
      </span>
      <span className="text-sm text-rd-text-primary sm:text-right">{value}</span>
    </div>
  );
}

export default function Step8Review() {
  const { watch, register } = useFormContext<OrderFormValues>();
  const values = watch();

  const buildSummary =
    values.branch === "website"
      ? [
          values.tier,
          values.wantsFunctionalAddOn ? "+ functional page add-on" : null,
          values.wantsStandardAddOn ? "+ standard page add-on" : null,
        ]
          .filter(Boolean)
          .join(" ")
      : values.digitalOpsType
        ? digitalOpsTypeLabels[values.digitalOpsType]
        : "";

  const timelineLabel = timelineOptions.find(
    (t) => t.value === values.preferredLaunch,
  )?.label;

  return (
    <div className="space-y-2">
      <Row label="Build" value={buildSummary} />
      <Row label="Name" value={values.name} />
      <Row label="Business" value={values.businessName} />
      <Row label="Email" value={values.email} />
      <Row label="Phone" value={values.phone ?? ""} />
      <Row label="Business website" value={values.businessWebsite ?? ""} />
      <Row label="Social links" value={values.socialLinks ?? ""} />
      <Row label="About the business" value={values.businessDescription} />
      <Row label="Goals" value={(values.goals ?? []).join(", ")} />
      <Row label="Existing assets" value={(values.assets ?? []).join(", ")} />
      <Row label="Design direction" value={values.designStyle ?? ""} />
      <Row label="Inspiration" value={values.inspirationLinks ?? ""} />
      {values.branch === "website" && (
        <>
          <Row
            label="Functional features"
            value={(values.functionalFeatures ?? []).join(", ")}
          />
          <Row
            label="What it should do"
            value={values.functionalDescription ?? ""}
          />
        </>
      )}
      {values.branch === "digitalOps" && (
        <>
          <Row
            label="Current tools/data"
            value={values.digitalOpsCurrentTools ?? ""}
          />
          <Row
            label="Desired outcome"
            value={values.digitalOpsDesiredOutcome ?? ""}
          />
          <Row
            label="Existing accounts/APIs"
            value={values.digitalOpsExistingAccounts ?? ""}
          />
        </>
      )}
      <Row label="Preferred launch" value={timelineLabel ?? ""} />
      <Row label="Requested date" value={values.specificDate ?? ""} />

      <input
        type="text"
        {...register("company_website")}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
}
