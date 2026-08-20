import TextAreaField from "@/components/form/fields/TextAreaField";

export default function Step5DesignDirection() {
  return (
    <div className="space-y-6">
      <TextAreaField
        name="designStyle"
        label="Describe the style, colors, or vibe you're going for"
      />
      <TextAreaField
        name="inspirationLinks"
        label="Websites you love / inspiration links"
        rows={3}
      />
    </div>
  );
}
