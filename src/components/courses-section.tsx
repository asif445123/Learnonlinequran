import { courses } from "@/lib/site-config";

export default function CoursesSection() {
  return (
    <section id="courses" className="bg-brand-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-brand-900">Our Courses</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          From the first letter to complete memorization, we have a course for every level.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <article key={c.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-100">
              <p className="font-arabic text-2xl text-gold-500" lang="ar">{c.arabic}</p>
              <h3 className="mt-2 text-xl font-semibold text-brand-800">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
