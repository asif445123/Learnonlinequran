import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-12 md:py-16">
        {/* Left: text (narrower) */}
        <div className="md:col-span-5">
          <p className="font-arabic text-center text-2xl text-gold-500 md:text-3xl" lang="ar" dir="rtl">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-center text-brand-900 md:text-3xl">
            Learn the Holy Quran Online with Qualified Male & Female Teachers
          </h1>
          <p className="mt-4 text-base text-center text-slate-600 md:text-lg">
            Live one-to-one Quran classes for kids and adults. Madani Qaida, Nazra, Tajweed and
            Hifz, taught by experienced male teachers from the comfort of your home.
          </p>
          <div className="w-full mt-6 flex flex-wrap gap-10 justify-center">
            <a
              href="#enroll"
              className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow hover:bg-brand-700"
            >
              Book Free Trial
            </a>
            <a
              href="#courses"
              className="rounded-full border border-brand-600 px-6 py-3 font-semibold text-brand-700 hover:bg-brand-50"
            >
              View Courses
            </a>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium w-full justify-center text-brand-800">
            <li>✔ One-to-one classes</li>
            <li>✔ Flexible timings</li>
            <li>✔ Free trial</li>
          </ul>
        </div>

        {/* Right: complete image (wider) */}
        <div className="md:col-span-7">
          <Image
            src="/images/hero-quran-class.jpg"
            alt="Male Quran teacher and a young student in a live one-to-one online Quran class at Learn Online Quran Academy"
            width={1400}
            height={1055}
            priority
            sizes="(min-width: 1280px) 750px, (min-width: 768px) 58vw, 100vw"
            className="h-auto w-full rounded-3xl border-4 border-white shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
