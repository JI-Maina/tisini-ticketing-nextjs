import { confirmPayment } from "@/data/events";
import React, { FC } from "react";
import { format } from "date-fns";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
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
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { TicketReceipt } from "@/components/ticket-receipt";

const M_PESA_BUSINESS_NUMBER = "4113757";

type Props = {
  params: Promise<{ ticketId: string }>;
};

const ConfirmPaymentPage: FC<Props> = async ({ params }) => {
  const { ticketId } = await params;

  const ticket = await confirmPayment(ticketId);

  if (!ticket?.length) {
    return (
      <main className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Ticket not found.</p>
      </main>
    );
  }

  const ticketData = ticket[0];

  return (
    <main className="min-h-screen bg-gray-50">
      {ticketData.is_paid === "0" ? (
        <TicketPayment ticket={ticketData} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-main-blue hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ticket.map((t) => (
              <TicketReceipt
                key={t.id ?? t.TicketNo ?? t.ticket_code}
                ticket={t}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default ConfirmPaymentPage;

const TicketPayment = ({ ticket }: { ticket: Ticket }) => {
  const createdDate = ticket.date_created
    ? format(new Date(ticket.date_created), "EEEE, MMMM d, yyyy 'at' h:mm a")
    : "—";

  const amountToPay = ticket.amount ? parseFloat(ticket.amount) : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-main-blue hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to events
      </Link>

      <div className="space-y-6">
        <div className="flex items-center gap-3 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <div>
            <p className="font-semibold">Payment pending</p>
            <p className="text-sm text-amber-800">
              Complete your M-Pesa payment to confirm this ticket.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-dark-blue">
              <Ticket className="w-5 h-5" />
              Ticket details
            </CardTitle>
            <CardDescription>
              Use the details below when paying via M-Pesa.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Ticket code</span>
              <span className="font-mono font-semibold text-main-blue">
                {ticket.ticket_code}
              </span>
            </div>
            <div className="flex items-center gap-2 py-2 border-b">
              <User className="w-4 h-4 text-gray-500" />
              <div>
                <p className="font-medium text-dark-blue">
                  {ticket.first_name} {ticket.last_name}
                </p>
                <p className="text-sm text-gray-500">Purchaser</p>
              </div>
            </div>
            <div className="flex items-center gap-2 py-2 border-b">
              <Mail className="w-4 h-4 text-gray-500" />
              <div>
                <p className="font-medium">{ticket.email}</p>
                <p className="text-sm text-gray-500">Email</p>
              </div>
            </div>
            <div className="flex items-center gap-2 py-2 border-b">
              <Phone className="w-4 h-4 text-gray-500" />
              <div>
                <p className="font-medium">{ticket.phone}</p>
                <p className="text-sm text-gray-500">Phone</p>
              </div>
            </div>
            <div className="flex items-center gap-2 py-2 border-b">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <p className="font-medium">{createdDate}</p>
                <p className="text-sm text-gray-500">Created</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Quantity</span>
              <span className="font-semibold">{ticket.quantity}</span>
            </div>
            <div className="flex items-center justify-between py-2 pt-4 border-t">
              <span className="text-gray-600">Amount to pay</span>
              <span className="text-lg font-bold text-main-blue">
                KES {amountToPay * parseInt(ticket.quantity)}
              </span>
            </div>
            <p className="text-xs text-gray-500 pt-1">
              Payment status: {ticket.payment_status}
            </p>
          </CardContent>
        </Card>

        <Card className="border-main-blue/30 bg-main-blue/5">
          <CardHeader>
            <CardTitle className="text-base text-dark-blue">
              Pay manually with M-Pesa
            </CardTitle>
            <CardDescription>
              If you did not receive an M-Pesa prompt, follow these steps:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-dark-blue">
            <ol className="list-decimal list-inside space-y-2">
              <li>Go to your M-Pesa Menu</li>
              <li>Select Lipa na M-Pesa</li>
              <li>Select Pay Bill</li>
              <li>Enter Business Number: {M_PESA_BUSINESS_NUMBER}</li>
              <li>
                Enter Account Number:{" "}
                <span className="font-mono font-semibold">
                  {ticket.ticket_code}
                </span>
              </li>
              <li>
                Enter Amount: KES {amountToPay * parseInt(ticket.quantity)}
              </li>
            </ol>
          </CardContent>
        </Card>

        <Button asChild className="w-full rounded-full">
          <Link href="/">Go back to events</Link>
        </Button>
      </div>
    </div>
  );
};
