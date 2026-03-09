import { Suspense } from "react";

import LoadingPage from "@/components/loader/loading-page";
import { EventDetail } from "./event-detail";
import { getEventPackage } from "@/data/events";

type EventProps = {
  params: Promise<{ eventId: string }>;
};

const EventDetailsPage = async ({ params }: EventProps) => {
  const { eventId } = await params;

  const eventPackages = await getEventPackage(eventId);

  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="min-h-screen flex flex-col">
        <div className="w-full md:w-[1200px] mx-auto px-4 py-6 flex-grow">
          {/* <div className="mb-4">
          <Link
          href="/"
          className="text-main-blue hover:underline flex items-center gap-2"
          >
          <span>← Back to events</span>
          </Link>
          </div> */}

          <EventDetail eventPackages={eventPackages} />
        </div>
      </div>
    </Suspense>
  );
};

export default EventDetailsPage;
