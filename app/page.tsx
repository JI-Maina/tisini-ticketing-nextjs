import CalltoActionSection from "@/components/landing-page/call-to-action";
import EventsCategorySection from "@/components/landing-page/category-section";
import FeaturedEventsSection from "@/components/landing-page/featured-events";
import HeroSection from "@/components/landing-page/hero-section";
import NewsletterSignup from "@/components/landing-page/news-letter";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedEventsSection />
      <EventsCategorySection />
      <CalltoActionSection />
      <NewsletterSignup />
    </main>
  );
}
