import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Store = {
  eventTicket: TicketEvent;
  ticket: EventPackage;
};

export type State = {
  store: Store;
};

export type Actions = {
  updateTicket: (ticket: EventPackage) => void;
  updateEvent: (event: TicketEvent) => void;
};

const initialState: Store = {
  eventTicket: {} as TicketEvent,
  ticket: {} as EventPackage,
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      store: initialState,
      updateEvent: (event: TicketEvent) =>
        set((state) => ({
          store: { ...state.store, eventTicket: event },
        })),
      updateTicket: (ticket: EventPackage) =>
        set((state) => ({
          store: { ...state.store, ticket: ticket },
        })),
    }),
    { name: "store" },
  ),
);
