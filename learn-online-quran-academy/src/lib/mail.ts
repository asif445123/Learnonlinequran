import nodemailer, { type Transporter } from "nodemailer";

export interface MailOptions {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

function getTransporter(): Transporter {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP_USER and SMTP_PASS must be set in the environment.");
  }

  // Gmail SMTP (works for any standard mail server; override host/port via env if needed)
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? "465");

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user, pass },
  });
}

export function getNotificationRecipient(): string {
  const user = process.env.SMTP_USER;
  if (!user) throw new Error("SMTP_USER must be set in the environment.");
  return process.env.CONTACT_EMAIL ?? user;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendNotificationEmail({ subject, text, html, replyTo }: MailOptions): Promise<void> {
  const user = process.env.SMTP_USER;
  if (!user) throw new Error("SMTP_USER must be set in the environment.");

  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Learn Online Quran Academy" <${user}>`,
    to: getNotificationRecipient(),
    replyTo,
    subject,
    text,
    html,
  });
}
