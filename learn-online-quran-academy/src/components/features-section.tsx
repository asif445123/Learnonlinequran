const features = [
  { icon: "👨‍🏫", title: "Qualified Male & Female Teachers", text: "Experienced, patient teachers trained in Tajweed and in teaching children." },
  { icon: "🧑‍💻", title: "Live One-to-One Classes", text: "Full attention for every student on Zoom, Skype or Google Meet." },
  { icon: "🕒", title: "Flexible Timings", text: "Choose class times that fit your family and your time zone." },
  { icon: "📈", title: "Progress Reports", text: "Regular feedback so parents can follow their child's progress." },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold text-brand-900">Why Choose Our Academy</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
            <div className="text-3xl" aria-hidden="true">{f.icon}</div>
            <h3 className="mt-3 text-lg font-semibold text-brand-800">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
