"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/store/store";
import { format } from "date-fns";
import { Badge, Calendar, Check, MapPin, Ticket, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type EventProps = {
  eventPackages: EventPackage[];
};

export const EventDetail: FC<EventProps> = ({ eventPackages }) => {
  const { store, updateTicket } = useStore((state) => state);
  const { eventTicket, ticket: selectedTicket } = store;

  const formattedDate = format(
    new Date(eventTicket.date_to),
    "EEEE, MMMM d, yyyy 'at' h:mm a",
  );

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Event Image - Portrait */}
      <div className="md:col-span-1 w-full">
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={
              eventTicket.id === "3"
                ? "/daystar-v-kcb-event.jpeg"
                : eventTicket.photo_url.length === 0 ||
                    eventTicket.photo_url === null
                  ? eventTicket.photo_url
                  : "/event-img.avif"
            }
            alt={eventTicket.ticket_title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Event Details */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-dark-blue mb-2">
            {eventTicket.ticket_title}
          </h1>
        </div>

        <div className="space-y-4 border-t border-gray-200 pt-6 flex md:flex-row flex-col md:items-center">
          <div className="flex items-start gap-4 w-1/2">
            <Calendar className="w-5 h-5 text-main-blue mt-0.5" />
            <div>
              <h3 className="font-semibold text-dark-blue">Date & Time</h3>
              <p className="text-gray-600">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-main-blue mt-0.5" />
            <div>
              <h3 className="font-semibold text-dark-blue">Venue</h3>
              <p className="text-gray-600">{eventTicket.venue}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-dark-blue text-lg mb-3">
            Description
          </h3>
          <p className="text-gray-600">
            {eventTicket.ticket_desc ||
              "No description available for this event."}
          </p>
        </div>

        {/* Ticket type selection - card layout */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-dark-blue text-lg mb-1">
            Select Ticket Type
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Choose a ticket and proceed to checkout
          </p>

          <div className="grid gap-3 sm:grid-cols-2 mb-6">
            {eventPackages.map((ticket) => {
              const isSelected = selectedTicket?.id === ticket.id;
              return (
                <Card
                  key={ticket.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? "ring-2 ring-main-blue bg-main-blue/5 shadow-md"
                      : "border-gray-200 hover:border-main-blue/40 hover:bg-gray-50/50"
                  }`}
                  onClick={() => updateTicket(ticket)}
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-dark-blue text-lg">
                            {ticket.category_name}
                          </span>
                          {ticket.category_name === "EARLY BIRD" && (
                            <Badge className="bg-green-100 text-green-800 border-0 font-medium">
                              Limited
                            </Badge>
                          )}
                          {ticket.category_name === "VVIP" && (
                            <Badge className="bg-purple-100 text-purple-800 border-0 font-medium">
                              Premium
                            </Badge>
                          )}
                        </div>
                        {ticket.description?.trim() && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {ticket.description}
                          </p>
                        )}
                        <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
                          <Users className="w-4 h-4 shrink-0" />
                          <span>{ticket.quantity} available</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-xl font-bold text-main-blue">
                          ${parseFloat(ticket.price).toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          per ticket
                        </span>
                        {isSelected && (
                          <div className="flex items-center gap-1 text-main-blue font-medium text-sm mt-1">
                            <Check className="w-4 h-4" />
                            Selected
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <Link href={`/checkout`}>
              <Button
                className="w-full sm:w-auto btn-gradient rounded-full px-8 py-6 text-base flex items-center gap-2"
                disabled={!selectedTicket?.id}
              >
                <Ticket className="w-5 h-5" />
                {selectedTicket
                  ? `Buy ${selectedTicket.category_name} — $${parseFloat(selectedTicket.price).toLocaleString()}`
                  : "Select a Ticket"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
