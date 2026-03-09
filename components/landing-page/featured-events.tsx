import React from "react";
import { EventCard } from "./event_card";

type EventProps = {
  allEvents: TicketEvent[];
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

export default FeaturedEventsSection;
