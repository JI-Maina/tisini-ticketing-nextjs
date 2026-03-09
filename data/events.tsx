"use server";

export const getEvents = async (): Promise<TicketEvent[]> => {
  const BASE_URL = process.env.NEXT_PUBLIC_PHP_API;
  const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

  const res = await fetch(`${BASE_URL}gettoken=${TOKEN}`, {
    method: "POST",
    body: JSON.stringify({
      action: "fetch_ticket_activity",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch events!");
  }

  return data;
};

export const getEventPackage = async (
  eventId: string,
): Promise<EventPackage[]> => {
  const BASE_URL = process.env.NEXT_PUBLIC_PHP_API;
  const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

  const res = await fetch(`${BASE_URL}gettoken=${TOKEN}`, {
    method: "POST",
    body: JSON.stringify({
      action: "fetch_ticket_packages",
      activity_id: eventId,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch events!");
  }

  return data;
};
