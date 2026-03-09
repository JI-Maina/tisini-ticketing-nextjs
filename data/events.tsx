"use server";

function getApiUrl(): string | null {
  const BASE_URL = process.env.NEXT_PUBLIC_PHP_API;
  const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
  if (!BASE_URL || !TOKEN) return null;
  return `${BASE_URL}gettoken=${TOKEN}`;
}

export const getEvents = async (): Promise<TicketEvent[]> => {
  const url = getApiUrl();
  if (!url) return [];

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        action: "fetch_ticket_activity",
      }),
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

export const getEventPackage = async (
  eventId: string,
): Promise<EventPackage[]> => {
  const url = getApiUrl();
  if (!url) return [];

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        action: "fetch_ticket_packages",
        activity_id: eventId,
      }),
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};
