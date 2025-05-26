import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Store = {
  eventTicket: EventTicket;
  ticket: TicketType;
};

export type State = {
  store: Store;
};

export type Actions = {
  updateTicket: (ticket: TicketType) => void;
  updateEvent: (event: EventTicket) => void;
};

const initialState: Store = {
  eventTicket: {} as EventTicket,
  ticket: {} as TicketType,
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      store: initialState,
      updateEvent: (event: EventTicket) =>
        set((state) => ({
          store: { ...state.store, eventTicket: event },
        })),
      updateTicket: (ticket: TicketType) =>
        set((state) => ({
          store: { ...state.store, ticket: ticket },
        })),
    }),
    { name: "store" }
  )
);
