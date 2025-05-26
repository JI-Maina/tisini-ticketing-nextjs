"use server";

const URL = process.env.NEXT_PUBLIC_API;

export default async function fetchEvents() {
  const res = await fetch(`${URL}/api/events/`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch events!");
  }

  return data;
}

export async function fetchEventById(id: string) {
  const res = await fetch(`${URL}/api/events/${id}/`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch event details!");
  }

  return data;
}
