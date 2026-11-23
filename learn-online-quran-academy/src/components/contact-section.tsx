import ContactForm from "@/components/contact-form";
import { siteConfig } from "@/lib/site-config";

export default function ContactSection() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}`;

  return (
    <section id="contact" className="scroll-mt-20 bg-slate-50">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Get in touch</p>
          <h2 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
            Have a question about our Quran classes, teachers, or class timings? Send us a message and
            our team will get back to you soon.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <p>
              <span className="font-semibold text-slate-900">Email: </span>
              <a className="break-all text-brand-700 hover:underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
            <p>
              <span className="font-semibold text-slate-900">WhatsApp: </span>
              <a className="text-brand-700 hover:underline" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                {siteConfig.phone}
              </a>
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
