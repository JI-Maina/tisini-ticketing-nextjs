"use client";

import { format, parseISO } from "date-fns";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useStore } from "@/store/store";

export const EventCard = ({ event }: { event: TicketEvent }) => {
  const { ticket_title, photo_url, venue, date_from, id } = event;

  const { updateEvent } = useStore();

  const img =
    id === "3"
      ? "/daystar-v-kcb-event.jpeg"
      : photo_url.length === 0
        ? photo_url
        : "/event-img.avif";

  const parsed = parseISO(date_from);

  // Format date and time separately
  const formatedDate = format(parsed, "MMMM d, yyyy");
  const formatedTime = format(parsed, "h:mm a");

  return (
    <Card className="overflow-hidden group transition-all hover:shadow-lg p-0">
      <Link href={`/events/${id}`} className="block h-full">
        <div className="h-80 w-full aspect-[3/4] overflow-hidden bg-gray-100 relative">
          <Image
            src={img}
            alt={ticket_title || "Event image"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold">
            {`Capacity: ${event.event_capacity}`}
          </div>
        </div>
        <CardContent className="p-2 transition-colors group-hover:bg-gray-50">
          <h3 className="font-bold text-lg mb-2 text-dark-blue">
            {ticket_title}
          </h3>
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
            <button
              onClick={() => updateEvent(event)}
              className="w-full py-2 rounded-full bg-primary/10 text-main-blue font-medium hover:bg-primary/20 transition-colors"
            >
              Details
            </button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
