import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Calendar, MapPin, Clock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type EventProps = {
  allEvents: EventTicket[];
};

const FeaturedEventsSection = ({ allEvents }: EventProps) => {
  return (
    <section className="py-16 bg-main-blue/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-purple">
            Featured Events
          </h2>
          <a href="#" className="text-main-purple font-medium hover:underline">
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allEvents?.slice(0, 5).map((event) => (
            <div key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EventCard = ({ event }: { event: EventTicket }) => {
  const { name, image, venue, date, id } = event;

  const img = image ? image : "/event-img.avif";

  const parsed = parseISO(date);

  // Format date and time separately
  const formatedDate = format(parsed, "MMMM d, yyyy");
  const formatedTime = format(parsed, "h:mm a");

  return (
    <Card className="overflow-hidden group transition-all hover:shadow-lg p-0">
      <Link href={`/events/${id}`} className="block h-full">
        <div className="h-80 w-full aspect-[3/4] overflow-hidden bg-gray-100 relative">
          <Image
            src={img}
            alt={name || "Event image"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold">
            {"From $99"}
          </div>
        </div>
        <CardContent className="p-2 transition-colors group-hover:bg-gray-50">
          <h3 className="font-bold text-lg mb-2 text-dark-blue">{name}</h3>
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-main-blue" />
              <span className="text-sm">{formatedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-main-blue" />
              <span className="text-sm">{venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-main-blue" />
              <span className="text-sm">{formatedTime}</span>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full py-2 rounded-full bg-primary/10 text-main-blue font-medium hover:bg-primary/20 transition-colors">
              Details
            </button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default FeaturedEventsSection;
