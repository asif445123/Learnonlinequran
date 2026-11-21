import { faqs } from "@/lib/site-config";

export default function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold text-brand-900">Frequently Asked Questions</h2>
      <div className="mt-8 space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="rounded-xl border border-brand-100 bg-white p-4">
            <summary className="cursor-pointer font-semibold text-brand-800">{f.q}</summary>
            <p className="mt-2 text-sm text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
