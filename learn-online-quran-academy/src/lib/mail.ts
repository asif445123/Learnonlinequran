import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";

/**
 * SMTP is read from environment variables. For Gmail, use smtp.gmail.com with
 * port 465 or 587 and a Google App Password (not your normal account password).
 */
function getTransporter() {
  const SMTP_HOST = process.env.SMTP_HOST?.trim();
  const SMTP_USER = process.env.SMTP_USER?.trim();
  const SMTP_PASS = process.env.SMTP_PASS;
  const configuredPort = process.env.SMTP_PORT?.trim();

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local.");
  }

  const port = configuredPort ? Number(configuredPort) : 465;
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid port number.");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

function getSiteName() {
  return process.env.NEXT_PUBLIC_SITE_NAME?.trim() || siteConfig.name;
}

function getSenderAddress() {
  const senderAddress = process.env.SMTP_FROM?.trim() || process.env.SMTP_USER?.trim();
  if (!senderAddress) {
    throw new Error("SMTP_FROM or SMTP_USER must be configured as the sender address.");
  }
  return senderAddress;
}

export async function sendResetEmail(to: string, resetUrl: string) {
  const transporter = getTransporter();
  const siteName = getSiteName();
  const safeSiteName = escapeHtml(siteName);
  const safeResetUrl = escapeHtml(resetUrl);

  const info = await transporter.sendMail({
    from: { name: siteName, address: getSenderAddress() },
    to,
    subject: `Reset your ${siteName} password`,
    text: `Reset your ${siteName} password using this link (valid for 1 hour):\n\n${resetUrl}\n\nIf you didn't request this, you can ignore this email.`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Reset your ${safeSiteName} password</h2>
        <p>We received a request to reset your ${safeSiteName} account password. This link expires in 1 hour.</p>
        <p>
          <a href="${safeResetUrl}" style="display:inline-block;padding:10px 20px;background:#0E7C4A;color:#fff;border-radius:6px;text-decoration:none;">
            Reset password
          </a>
        </p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });

  assertRecipientAccepted(info.accepted, to, info.response);
}

/** Sends a contact form message to CONTACT_EMAIL or the configured admin inbox. */
export async function sendContactMessage(name: string, fromEmail: string, message: string) {
  const transporter = getTransporter();
  const siteName = getSiteName();
  const recipient = process.env.CONTACT_EMAIL?.trim() || "faisalnazir2526@gmail.com";

  const safeSiteName = escapeHtml(siteName);
  const safeName = escapeHtml(name);
  const safeFromEmail = escapeHtml(fromEmail);
  const safeMessage = escapeHtml(message);

  const info = await transporter.sendMail({
    from: { name: `${siteName} Contact Form`, address: getSenderAddress() },
    to: recipient,
    replyTo: { name, address: fromEmail },
    subject: `New contact message for ${siteName}`,
    text: `New message from ${name} (${fromEmail}):\n\n${message}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New message for ${safeSiteName}</h2>
        <p><strong>From:</strong> ${safeName} (${safeFromEmail})</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; border-left: 3px solid #0E7C4A; padding-left: 12px;">${safeMessage}</p>
      </div>
    `,
  });

  assertRecipientAccepted(info.accepted, recipient, info.response);
}

function assertRecipientAccepted(
  accepted: Array<string | { address: string; name: string }>,
  recipient: string,
  response: string,
) {
  const wasAccepted = accepted.some((address) => {
    const acceptedAddress = typeof address === "string" ? address : address.address;
    return acceptedAddress.toLowerCase() === recipient.toLowerCase();
  });

  if (!wasAccepted) {
    throw new Error(`SMTP server did not accept the recipient (${response}).`);
  }
}
