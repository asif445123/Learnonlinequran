import { NextResponse } from "next/server";
import { sendNotificationEmail, escapeHtml } from "@/lib/mail";
import { siteConfig } from "@/lib/site-config";

interface ContactBody {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();
    const fullName = body.fullName?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim() ?? "";
    const message = body.message?.trim();

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email and message are required." },
        { status: 400 }
      );
    }
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const subject = `Contact Us: ${fullName.replace(/[\r\n]+/g, " ").slice(0, 120)}`;
    const plainText = [`Name: ${fullName}`, `Email: ${email}`, phone ? `Phone: ${phone}` : null, "", message]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <h2 style="color: #047857;">New Contact Us message</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 0; color: #64748b; width: 110px;">Name</td><td><strong>${safeName}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Email</td><td>${safeEmail}</td></tr>
          ${phone ? `<tr><td style="padding: 6px 0; color: #64748b;">Phone</td><td>${safePhone}</td></tr>` : ""}
        </table>
        <div style="background: #f1f5f9; border-left: 4px solid #059669; padding: 14px 16px; border-radius: 6px; margin: 16px 0;">
          ${safeMessage}
        </div>
        <p style="color: #94a3b8; font-size: 12px;">This message came from the Contact Us form on ${escapeHtml(siteConfig.url)}.</p>
      </div>
    `;

    await sendNotificationEmail({
      subject,
      text: plainText,
      html,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form failed:", error);
    return NextResponse.json(
      { success: false, message: "Your message could not be sent. Please try again later." },
      { status: 500 }
    );
  }
}
