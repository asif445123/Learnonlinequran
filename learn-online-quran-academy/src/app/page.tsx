import SiteHeader from "@/components/site-header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import CoursesSection from "@/components/courses-section";
import EnrollSection from "@/components/enroll-section";
import FaqSection from "@/components/faq-section";
import SiteFooter from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CoursesSection />
        <EnrollSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
