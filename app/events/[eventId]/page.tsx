import Image from "next/image";
import { Suspense } from "react";
import { format } from "date-fns";

import { Calendar, MapPin } from "lucide-react";
import { fetchEventById } from "@/actions/fetch-events";
import LoadingPage from "@/components/loader/loading-page";
import TicketTypeTable from "@/components/events/ticket-types";

type EventProps = {
  params: Promise<{ eventId: string }>;
};

const EventDetailsPage = async ({ params }: EventProps) => {
  const { eventId } = await params;

  const event = (await fetchEventById(eventId)) as EventTicket;

  const formattedDate = format(
    new Date(event.date),
    "EEEE, MMMM d, yyyy 'at' h:mm a"
  );

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

          <div className="grid md:grid-cols-3 gap-8">
            {/* Event Image - Portrait */}
            <div className="md:col-span-1 w-full">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/photo-event.avif"
                  alt={event.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Event Details */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-dark-blue mb-2">
                  {event.name}
                </h1>
              </div>

              <div className="space-y-4 border-t border-gray-200 pt-6 flex md:flex-row flex-col md:items-center">
                <div className="flex items-start gap-4 w-1/2">
                  <Calendar className="w-5 h-5 text-main-blue mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-dark-blue">
                      Date & Time
                    </h3>
                    <p className="text-gray-600">{formattedDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-main-blue mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-dark-blue">Venue</h3>
                    <p className="text-gray-600">{event.venue}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-dark-blue text-lg mb-3">
                  Description
                </h3>
                <p className="text-gray-600">
                  {event.description ||
                    "No description available for this event."}
                </p>
              </div>

              <TicketTypeTable event={event} />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default EventDetailsPage;
