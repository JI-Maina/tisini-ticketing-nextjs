"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStore } from "@/store/store";
import { format } from "date-fns";
import { Badge, Calendar, Check, MapPin, Ticket } from "lucide-react";
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
            src="/photo-event.avif"
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
              <p className="text-gray-600">{"eventTicket"}</p>
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

        {/* <TicketTypeTable event={event} /> */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-dark-blue text-lg mb-4">
            Select Ticket Type
          </h3>

          <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Ticket Type</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {eventPackages.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedTicket?.id === ticket.id
                        ? "bg-main-blue/10 ring-1 ring-main-blue"
                        : ""
                    }`}
                    onClick={() => updateTicket(ticket)}
                  >
                    <TableCell className="text-center">
                      {selectedTicket?.id === ticket.id ? (
                        <Check className="w-5 h-5 text-main-blue mx-auto" />
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <label
                        htmlFor={`ticket-${ticket.id}`}
                        className="font-medium cursor-pointer"
                      >
                        {ticket.category_name}
                        {ticket.category_name === "EARLY BIRD" && (
                          <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                            Limited
                          </Badge>
                        )}
                        {ticket.category_name === "VVIP" && (
                          <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-100">
                            Premium
                          </Badge>
                        )}
                      </label>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${parseFloat(ticket.price).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <Link href={`/checkout`}>
              <Button
                className="btn-gradient rounded-full px-8 py-6 text-base flex items-center gap-2"
                disabled={!selectedTicket?.id}
              >
                <Ticket className="w-5 h-5" />
                {selectedTicket ? "Buy Selected Ticket" : "Select a Ticket"}
              </Button>
            </Link>

            {/* {event.max_attendees && (
          <p className="text-sm text-gray-500 mt-2">
            Limited availability. Maximum {event.max_attendees} attendees.
          </p>
        )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
