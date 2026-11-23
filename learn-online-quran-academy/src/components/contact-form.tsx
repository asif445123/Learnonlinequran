"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100";

type FormStatus = { kind: "success" | "error"; message: string } | null;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);

    const payload = {
      name: String(values.get("name") ?? ""),
      email: String(values.get("email") ?? ""),
      message: String(values.get("message") ?? ""),
      website: String(values.get("website") ?? ""),
    };

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: { success?: boolean; message?: string } = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "We couldn't send your message. Please try again.");
      }

      form.reset();
      setStatus({ kind: "success", message: "Thank you! Your message has been sent. We will get back to you soon." });
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "We couldn't send your message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4 rounded-2xl bg-white p-6 shadow-lg sm:p-8">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-slate-800">
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          required
          className={inputClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-slate-800">
          Email address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-slate-800">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={5000}
          required
          className={inputClass}
          placeholder="How can we help?"
        />
      </div>

      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-px w-px overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {status && (
        <p
          role={status.kind === "error" ? "alert" : "status"}
          className={`text-sm ${status.kind === "error" ? "text-red-700" : "text-brand-700"}`}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
