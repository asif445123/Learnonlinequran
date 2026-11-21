"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Swal from "sweetalert2";

interface EnrollFormData {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

const emptyForm: EnrollFormData = { fullName: "", email: "", phone: "", course: "Noorani Qaida", message: "" };

const inputClass =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100";

export default function EnrollForm() {
  const [form, setForm] = useState<EnrollFormData>(emptyForm);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Missing information",
        text: "Please fill in your name, email and phone number.",
        confirmButtonColor: "#059669",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: { success: boolean; message?: string } = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message ?? "Something went wrong");

      await Swal.fire({
        icon: "success",
        title: "JazakAllah Khair!",
        text: "Your free trial request has been received. We will contact you soon, in shaa Allah.",
        confirmButtonColor: "#059669",
      });
      setForm(emptyForm);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Request failed",
        text: error instanceof Error ? error.message : "Please try again later.",
        confirmButtonColor: "#059669",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-lg" noValidate>
      <div>
        <label htmlFor="fullName" className="mb-1 block text-sm font-medium">Full Name</label>
        <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} className={inputClass} placeholder="Parent / student name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium">Phone / WhatsApp</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+92 300 0000000" />
        </div>
      </div>
      <div>
        <label htmlFor="course" className="mb-1 block text-sm font-medium">Course</label>
        <select id="course" name="course" value={form.course} onChange={handleChange} className={inputClass}>
          <option>Madani Qaida</option>
          <option>Nazra Quran</option>
          <option>Tajweed Course</option>
          <option>Hifz Program</option>
          <option>Islamic Studies</option>
          <option>Quran Translation</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">Message (optional)</label>
        <textarea id="message" name="message" rows={3} value={form.message} onChange={handleChange} className={inputClass} placeholder="Student age, preferred timing, time zone..." />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Book My Free Trial"}
      </button>
    </form>
  );
}
