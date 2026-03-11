"use client";

import { format } from "date-fns";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Ticket,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

type TicketReceiptProps = {
  ticket: Ticket;
};

export function TicketReceipt({ ticket }: TicketReceiptProps) {
  const createdDate = ticket.date_created
    ? format(new Date(ticket.date_created), "EEEE, MMMM d, yyyy 'at' h:mm a")
    : "—";

  const amountPaid = ticket.amount_paid
    ? parseFloat(ticket.amount_paid).toLocaleString()
    : ticket.amount
      ? parseFloat(ticket.amount).toLocaleString()
      : "—";

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-main-blue hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <Card className="overflow-hidden">
        <div className="bg-green-50 border-b border-green-200 px-6 py-4 flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-600 shrink-0" />
          <div>
            <p className="font-semibold text-green-800">Payment confirmed</p>
            <p className="text-sm text-green-700">This ticket is valid for entry.</p>
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-dark-blue text-lg">
            <Ticket className="w-5 h-5" />
            Ticket receipt
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-4 py-4 bg-gray-50 rounded-lg">
            <QRCodeSVG
              value={ticket.ticket_code}
              size={180}
              level="M"
              includeMargin
              className="rounded-lg border border-gray-200 bg-white p-2"
              title={`Ticket ${ticket.ticket_code}`}
            />
            <p className="font-mono font-bold text-lg text-main-blue">
              {ticket.ticket_code}
            </p>
            <p className="text-xs text-gray-500">Show this code at the venue</p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Ticket holder</span>
              <span className="font-medium text-dark-blue">
                {ticket.first_name} {ticket.last_name}
              </span>
            </div>
            <div className="flex items-center gap-2 py-2 border-b">
              <Mail className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="text-sm">{ticket.email}</span>
            </div>
            <div className="flex items-center gap-2 py-2 border-b">
              <Phone className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="text-sm">{ticket.phone}</span>
            </div>
            <div className="flex items-center gap-2 py-2 border-b">
              <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="text-sm">{createdDate}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Quantity</span>
              <span className="font-semibold">{ticket.quantity}</span>
            </div>
            <div className="flex items-center justify-between py-2 pt-2 border-t">
              <span className="text-gray-600">Amount paid</span>
              <span className="font-bold text-green-700">
                KES {amountPaid}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button asChild className="w-full rounded-full mt-6">
        <Link href="/">Back to events</Link>
      </Button>
    </div>
  );
}
