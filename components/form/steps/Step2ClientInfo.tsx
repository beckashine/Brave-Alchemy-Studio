import TextField from "@/components/form/fields/TextField";

export default function Step2ClientInfo() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="name" label="Your name" required />
        <TextField name="businessName" label="Business name" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="email" label="Email" type="email" required />
        <TextField name="phone" label="Phone" type="tel" />
      </div>
      <TextField
        name="businessWebsite"
        label="Current business website (if any)"
        placeholder="https://"
      />
      <TextField
        name="socialLinks"
        label="Social media links"
        placeholder="Instagram, Facebook, etc."
      />
    </div>
  );
}
