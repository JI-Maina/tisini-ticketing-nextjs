import HeroSection from "@/components/landing-page/hero-section";
import NewsletterSignup from "@/components/landing-page/news-letter";
import CalltoActionSection from "@/components/landing-page/call-to-action";
import FeaturedEventsSection from "@/components/landing-page/featured-events";
import EventsCategorySection from "@/components/landing-page/category-section";
import { Suspense } from "react";
import LoadingPage from "@/components/loader/loading-page";
import { getEvents } from "@/data/events";

export default async function Home() {
  const allEvents = await getEvents();
  // const allEvents = (await fetchEvents()) as EventTicket[];

  return (
    <main>
      <HeroSection />

      <Suspense fallback={<LoadingPage />}>
        <FeaturedEventsSection allEvents={allEvents} />
      </Suspense>

      <EventsCategorySection />
      <CalltoActionSection />
      <NewsletterSignup />
    </main>
  );
}
