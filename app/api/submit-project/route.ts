import { NextResponse } from "next/server";
import { orderFormSchema } from "@/data/order-form-schema";
import { sendClientConfirmation, sendStudioNotification } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = orderFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: real visitors never fill this field. Report success so bots
  // don't learn the submission was rejected, but skip sending any email.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await Promise.all([
      sendStudioNotification(data),
      sendClientConfirmation(data),
    ]);
  } catch (error) {
    console.error("Failed to send order form emails:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your request. Please try again or email hello@bravealchemystudio.com directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
