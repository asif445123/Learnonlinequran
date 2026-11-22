import EnrollForm from "@/components/enroll-form";

export default function EnrollSection() {
  return (
    <section id="enroll" className="bg-brand-800">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div className="text-white">
          <h2 className="text-3xl font-bold">Start Your Free Trial Class Today</h2>
          <p className="mt-4 text-brand-100">
            Fill in the form and our team will arrange a free trial class with a qualified male
            teacher at a time that suits you.
          </p>
        </div>
        <EnrollForm />
      </div>
    </section>
  );
}
