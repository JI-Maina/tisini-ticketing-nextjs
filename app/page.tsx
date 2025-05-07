import HeroSection from "@/components/landing-page/hero-section";
import NewsletterSignup from "@/components/landing-page/news-letter";
import CalltoActionSection from "@/components/landing-page/call-to-action";
import FeaturedEventsSection from "@/components/landing-page/featured-events";
import EventsCategorySection from "@/components/landing-page/category-section";

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
