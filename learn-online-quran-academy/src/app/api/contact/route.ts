import { NextResponse } from "next/server";
import { sendContactMessage } from "@/lib/mail";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;
const MAX_BODY_LENGTH = 16_000;
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5_000;

function errorResponse(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_LENGTH) {
    return errorResponse("Your message is too large. Please shorten it and try again.", 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return errorResponse("Could not read your message. Please try again.", 400);
  }

  if (rawBody.length > MAX_BODY_LENGTH) {
    return errorResponse("Your message is too large. Please shorten it and try again.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return errorResponse("Please submit a valid contact form.", 400);
  }

  if (!isRecord(body)) {
    return errorResponse("Please submit a valid contact form.", 400);
  }

  // Quietly accept automated submissions caught by the visually hidden honeypot.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === "string" ? body.name.trim().replace(/\s+/g, " ") : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return errorResponse("Name, email, and message are required.", 400);
  }
  if (name.length > MAX_NAME_LENGTH) {
    return errorResponse(`Please keep your name under ${MAX_NAME_LENGTH} characters.`, 400);
  }
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return errorResponse("Please enter a valid email address.", 400);
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return errorResponse(`Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`, 400);
  }

  try {
    await sendContactMessage(name, email, message);
    return NextResponse.json({ success: true, message: "Your message has been sent." });
  } catch (error) {
    console.error("Contact form email could not be sent:", error);
    return errorResponse(
      "We couldn't send your message right now. Please try again later or email us directly.",
      503,
    );
  }
}
