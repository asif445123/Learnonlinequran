import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ContactForm from "@/components/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Learn Online Quran Academy. Send us a message and our team will reply soon, in shaa Allah.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact Us | ${siteConfig.name}`,
    description:
      "Get in touch with Learn Online Quran Academy. Send us a message and our team will reply soon, in shaa Allah.",
    url: `${siteConfig.url}/contact`,
  },
};

const whatsappIconPath =
  "M16.003 3C8.83 3 3 8.83 3 16c0 2.29.6 4.52 1.74 6.49L3 29l6.7-1.71A12.94 12.94 0 0 0 16.003 29C23.17 29 29 23.17 29 16S23.17 3 16.003 3Zm0 23.7c-1.95 0-3.86-.53-5.53-1.52l-.4-.24-3.98 1.02 1.06-3.88-.26-.4A10.66 10.66 0 0 1 5.3 16c0-5.9 4.8-10.7 10.7-10.7S26.7 10.1 26.7 16s-4.8 10.7-10.697 10.7Zm5.87-8c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.84 1.04-1.03 1.25-.19.22-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.6-.96-.86-1.6-1.91-1.8-2.23-.19-.32-.02-.5.14-.66.15-.14.32-.37.48-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.46.2 2.01.12.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z";

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}`;

  return (
    <>
      <SiteHeader />
      <main className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-14 md:grid-cols-2">
          <div>
            <p className="font-arabic text-2xl text-gold-500 md:text-3xl" lang="ar" dir="rtl">
              مَعَلُّم
            </p>
            <h1 className="mt-4 text-3xl font-extrabold text-brand-900 md:text-4xl">Contact Us</h1>
            <p className="mt-4 text-lg text-slate-600">
              Have a question, need help with a free trial or want to know more about our classes?
              Send us a message and our team will reply soon, in shaa Allah.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="w-6 shrink-0 text-center"><svg viewBox="0 0 32 32" className="h-6 w-6 fill-[#25D366]"><path d={whatsappIconPath} /></svg></span>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 hover:underline">
                  WhatsApp: {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="w-6 shrink-0 text-center">✉️</span>
                <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-700 hover:underline break-all">{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="w-6 shrink-0 text-center">📞</span>
                <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="font-medium text-brand-700 hover:underline">{siteConfig.phone}</a>
              </li>
            </ul>
          </div>

          <ContactForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
