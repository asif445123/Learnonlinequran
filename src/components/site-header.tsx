import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "#features", label: "Why Us" },
  { href: "#courses", label: "Courses" },
  { href: "#enroll", label: "Free Trial" },
  { href: "#faq", label: "FAQ" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label={siteConfig.name}>
          <Image src="/images/logo.png" alt="" width={240} height={240} priority className="h-11 w-11 rounded-full object-cover" />
          <span className="text-lg font-bold text-brand-800">{siteConfig.name}</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-700 hover:text-brand-600">
              {l.label}
            </a>
          ))}
          <a
            href="#enroll"
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Start Free Trial
          </a>
        </nav>
      </div>
    </header>
  );
}
