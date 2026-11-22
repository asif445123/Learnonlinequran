import { NextResponse } from "next/server";
import { sendNotificationEmail, escapeHtml } from "@/lib/mail";
import { siteConfig } from "@/lib/site-config";

interface EnrollBody {
  fullName?: string;
  email?: string;
  phone?: string;
  course?: string;
  message?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body: EnrollBody = await request.json();
    const fullName = body.fullName?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const course = body.course?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!fullName || !email || !phone) {
      return NextResponse.json({ success: false, message: "Name, email and phone are required." }, { status: 400 });
    }
    if (!emailPattern.test(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
    }

    const safeName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeCourse = escapeHtml(course);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const subject = `Free Trial Request: ${fullName.replace(/[\r\n]+/g, " ").slice(0, 120)}`;
    const plainText = [
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Course: ${course || "Not specified"}`,
      "",
      message || "(no message)",
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <h2 style="color: #047857;">New Free Trial Request</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 0; color: #64748b; width: 110px;">Name</td><td><strong>${safeName}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Email</td><td>${safeEmail}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Phone</td><td>${safePhone}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Course</td><td>${safeCourse || "Not specified"}</td></tr>
        </table>
        ${message ? `<div style="background: #f1f5f9; border-left: 4px solid #059669; padding: 14px 16px; border-radius: 6px; margin: 16px 0;">${safeMessage}</div>` : ""}
        <p style="color: #94a3b8; font-size: 12px;">This request came from the Free Trial form on ${escapeHtml(siteConfig.url)}.</p>
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
    console.error("Enroll form failed:", error);
    return NextResponse.json(
      { success: false, message: "Your request could not be sent. Please try again later." },
      { status: 500 }
    );
  }
}
