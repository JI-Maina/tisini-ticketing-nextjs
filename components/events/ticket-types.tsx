"use client";

// import Link from "next/link";
import Link from "next/link";
import { Ticket } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useStore } from "@/store/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const TicketTypeTable = ({ event }: { event: EventTicket }) => {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  const updateTicket = useStore((state) => state.updateTicket);
  const updateEvent = useStore((state) => state.updateEvent);

  useEffect(() => {
    const ticket = event.ticket_types.filter(
      (item) => item.id === selectedTicket
    );

    if (ticket) {
      updateTicket(ticket[0]);
      updateEvent(event);
    }
  }, [selectedTicket, event]);

  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="font-semibold text-dark-blue text-lg mb-4">
        Select Ticket Type
      </h3>

      <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
        {/* <RadioGroup value={selectedTicket?.toString()} onValueChange={(value) => setSelectedTicket(parseInt(value))}> */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Ticket Type</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {event.ticket_types.map((ticket) => (
              <TableRow
                key={ticket.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedTicket(ticket.id)}
              >
                <TableCell className="text-center">
                  {/* <RadioGroupItem value={ticket.id.toString()} id={`ticket-${ticket.id}`} /> */}
                </TableCell>
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
        {/* </RadioGroup> */}
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
        <Link href={`/checkout`}>
          <Button
            className="btn-gradient rounded-full px-8 py-6 text-base flex items-center gap-2"
            disabled={selectedTicket === null}
          >
            <Ticket className="w-5 h-5" />
            {selectedTicket ? "Buy Selected Ticket" : "Select a Ticket"}
          </Button>
        </Link>

        {event.max_attendees && (
          <p className="text-sm text-gray-500 mt-2">
            Limited availability. Maximum {event.max_attendees} attendees.
          </p>
        )}
      </div>
    </div>
  );
};

export default TicketTypeTable;
