import HeroSection from "@/components/landing-page/hero-section";
import NewsletterSignup from "@/components/landing-page/news-letter";
import CalltoActionSection from "@/components/landing-page/call-to-action";
import FeaturedEventsSection from "@/components/landing-page/featured-events";
import EventsCategorySection from "@/components/landing-page/category-section";
import fetchEvents from "@/actions/fetch-events";
import { Suspense } from "react";
import LoadingPage from "@/components/loader/loading-page";

export default async function Home() {
  const allEvents = (await fetchEvents()) as EventTicket[];

  console.log(allEvents);

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
