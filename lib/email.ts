import { Resend } from "resend";
import type { OrderFormValues } from "@/data/order-form-schema";
import { digitalOpsTypeLabels, timelineOptions } from "@/data/order-form-schema";
import { contactEmail } from "@/data/nav";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const STUDIO_EMAIL = process.env.STUDIO_NOTIFICATION_EMAIL ?? contactEmail;

function buildSubmissionRows(data: OrderFormValues): [string, string][] {
  const buildSummary =
    data.branch === "website"
      ? [
          data.tier,
          data.wantsFunctionalAddOn ? "+ functional page add-on" : null,
          data.wantsStandardAddOn ? "+ standard page add-on" : null,
        ]
          .filter(Boolean)
          .join(" ")
      : data.digitalOpsType
        ? digitalOpsTypeLabels[data.digitalOpsType]
        : "";

  const timelineLabel =
    timelineOptions.find((t) => t.value === data.preferredLaunch)?.label ?? "";

  const rows: [string, string][] = [
    ["Build", buildSummary],
    ["Name", data.name],
    ["Business", data.businessName],
    ["Email", data.email],
    ["Phone", data.phone ?? ""],
    ["Business website", data.businessWebsite ?? ""],
    ["Social links", data.socialLinks ?? ""],
    ["About the business", data.businessDescription],
    ["Goals", (data.goals ?? []).join(", ")],
    ["Goals — other", data.goalsOther ?? ""],
    ["Existing assets", (data.assets ?? []).join(", ")],
    ["Assets — notes", data.assetsNotes ?? ""],
    ["Design direction", data.designStyle ?? ""],
    ["Inspiration", data.inspirationLinks ?? ""],
  ];

  if (data.branch === "website") {
    rows.push(
      ["Functional features", (data.functionalFeatures ?? []).join(", ")],
      ["Functional — other", data.functionalFeaturesOther ?? ""],
      ["What it should do", data.functionalDescription ?? ""],
    );
  } else {
    rows.push(
      ["Current tools/data", data.digitalOpsCurrentTools ?? ""],
      ["Desired outcome", data.digitalOpsDesiredOutcome ?? ""],
      ["Existing accounts/APIs", data.digitalOpsExistingAccounts ?? ""],
    );
  }

  rows.push(
    ["Preferred launch", timelineLabel],
    ["Requested date", data.specificDate ?? ""],
  );

  return rows.filter(([, value]) => value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function studioNotificationHtml(data: OrderFormValues) {
  const rows = buildSubmissionRows(data)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#9a9a95;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#eaeaea;font-size:14px;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="background:#0a0b0a;padding:32px;font-family:ui-monospace,Menlo,monospace;">
      <p style="color:#c8e619;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 16px;">// New Project Request</p>
      <table style="width:100%;border-collapse:collapse;background:#111;">${rows}</table>
    </div>`;
}

function clientConfirmationHtml(data: OrderFormValues) {
  return `
    <div style="background:#0a0b0a;padding:32px;font-family:ui-monospace,Menlo,monospace;color:#eaeaea;">
      <p style="color:#c8e619;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 16px;">BA:~$ Brave Alchemy Studio</p>
      <h1 style="font-size:20px;margin:0 0 16px;">Got it, ${escapeHtml(data.name.split(" ")[0] ?? data.name)} — request received.</h1>
      <p style="font-size:14px;line-height:1.6;color:#c9c9c5;">
        I'll review your project request and follow up with pricing confirmation
        and a PayPal invoice for your deposit. Here's what happens next:
      </p>
      <ol style="font-size:14px;line-height:1.8;color:#c9c9c5;padding-left:20px;">
        <li>I review your request</li>
        <li>I confirm scope and pricing with you</li>
        <li>You'll receive a PayPal invoice for your deposit</li>
        <li>Once the deposit is received, your project begins</li>
      </ol>
      <p style="font-size:14px;color:#9a9a95;margin-top:24px;">
        Questions in the meantime? Just reply to this email.
      </p>
    </div>`;
}

export async function sendStudioNotification(data: OrderFormValues) {
  if (!resend) throw new Error("Email service not configured");
  return resend.emails.send({
    from: `Brave Alchemy Studio <${FROM_EMAIL}>`,
    to: STUDIO_EMAIL,
    replyTo: data.email,
    subject: `New project request — ${data.businessName}`,
    html: studioNotificationHtml(data),
  });
}

export async function sendClientConfirmation(data: OrderFormValues) {
  if (!resend) throw new Error("Email service not configured");
  return resend.emails.send({
    from: `Brave Alchemy Studio <${FROM_EMAIL}>`,
    to: data.email,
    subject: "Got it — your project request",
    html: clientConfirmationHtml(data),
  });
}
