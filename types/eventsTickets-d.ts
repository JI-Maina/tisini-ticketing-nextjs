type EventTicket = {
  id: number;
  name: string;
  category: string;
  date: string;
  venue: string;
  description: string;
  image: string | null;
  max_attendees: string | null;
  terms_and_conditions: string | null;
  ticket_types: TicketType[];
};

type TicketType = { id: number; type: string; price: string };
