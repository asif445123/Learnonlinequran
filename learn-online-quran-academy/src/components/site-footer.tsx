import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const quickLinks = [
  { href: "/#features", label: "Why Us" },
  { href: "/#courses", label: "Courses" },
  { href: "/#enroll", label: "Free Trial" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

const whatsappIconPath =
  "M16.003 3C8.83 3 3 8.83 3 16c0 2.29.6 4.52 1.74 6.49L3 29l6.7-1.71A12.94 12.94 0 0 0 16.003 29C23.17 29 29 23.17 29 16S23.17 3 16.003 3Zm0 23.7c-1.95 0-3.86-.53-5.53-1.52l-.4-.24-3.98 1.02 1.06-3.88-.26-.4A10.66 10.66 0 0 1 5.3 16c0-5.9 4.8-10.7 10.7-10.7S26.7 10.1 26.7 16s-4.8 10.7-10.697 10.7Zm5.87-8c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.84 1.04-1.03 1.25-.19.22-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.6-.96-.86-1.6-1.91-1.8-2.23-.19-.32-.02-.5.14-.66.15-.14.32-.37.48-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.46.2 2.01.12.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z";

export default function SiteFooter() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}`;

  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="mx-auto max-w-6xl px-4 pt-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2" aria-label={siteConfig.name}>
              <Image src="/images/logo.png" alt="" width={240} height={240} className="h-11 w-11 rounded-full object-cover" />
              <span className="text-lg font-bold text-white">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-100/80">
              {siteConfig.name} offers live one-to-one online Quran classes with qualified male
              teachers: Noorani Qaida, Nazra, Tajweed and Hifz. Free trial class available.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-brand-100/80 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <svg viewBox="0 0 32 32" className="h-5 w-5 shrink-0 fill-[#25D366]" aria-hidden="true">
                  <path d={whatsappIconPath} />
                </svg>
                <a href={whatsappHref} className="hover:underline">WhatsApp: {siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="w-5 shrink-0 text-center">✉️</span>
                <a href={`mailto:${siteConfig.email}`} className="break-all hover:underline">{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="w-5 shrink-0 text-center">👨‍🏫</span>
                Qualified Male Teachers
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="w-5 shrink-0 text-center">🕒</span>
                Flexible Timings, 24/7 Support
              </li>
            </ul>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1ebe5a]"
            >
              <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d={whatsappIconPath} />
              </svg>
              Book Free Trial →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-brand-800 py-6 text-sm text-brand-100/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Made with <span className="text-gold-400" aria-label="love">♥</span> in Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
