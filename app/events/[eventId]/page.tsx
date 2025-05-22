// import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
// import Link from "next/link";
import Image from "next/image";

// This would typically come from an API call using the event ID
const eventData = {
  id: 1,
  name: "Ngong Race Course",
  category: "1",
  date: "2025-05-24T09:00:00+03:00",
  venue: "Ngong Road",
  description: "Some description",
  image:
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  max_attendees: null,
  terms_and_conditions: null,
};

// Ticket data that would normally be fetched from an API
const ticketData = [
  {
    id: 3,
    event: eventData,
    type: "EARLY BIRD",
    price: "150.00",
  },
  {
    id: 1,
    event: eventData,
    type: "REGULAR",
    price: "200.00",
  },
  {
    id: 2,
    event: eventData,
    type: "VVIP",
    price: "1500.00",
  },
];

const EventDetails = () => {
  // const { eventId } = useParams<{ eventId: string }>();
  const event = eventData; // In a real app, you'd fetch this based on eventId
  // const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  const formattedDate = format(
    new Date(event.date),
    "EEEE, MMMM d, yyyy 'at' h:mm a"
  );

  return (
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
                  <h3 className="font-semibold text-dark-blue">Date & Time</h3>
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

            {/* Ticket Types Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between p-1">
                <h3 className="font-semibold text-dark-blue text-lg mb-4">
                  Tickets Available
                </h3>

                <Button className="btn-gradient rounded-full px-4 py-4 text-base flex items-center gap-2">
                  <Ticket className="w-5 h-5" /> Get Ticket
                </Button>
              </div>

              <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket Type</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ticketData.map((ticket) => (
                      <TableRow
                        key={ticket.id}
                        className="cursor-pointer hover:bg-gray-50"
                      >
                        <TableCell>
                          <label
                            htmlFor={`ticket-${ticket.id}`}
                            className="font-medium cursor-pointer"
                          >
                            {ticket.type}
                            {ticket.type === "EARLY BIRD" && (
                              <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                                Limited
                              </Badge>
                            )}
                            {ticket.type === "VVIP" && (
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
            </div>

            {event.terms_and_conditions && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-dark-blue text-lg mb-3">
                  Terms & Conditions
                </h3>
                <p className="text-gray-600">{event.terms_and_conditions}</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6">
              {event.max_attendees && (
                <p className="text-sm text-gray-500 mt-2">
                  Limited availability. Maximum {event.max_attendees} attendees.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
