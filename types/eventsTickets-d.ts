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

type TicketEvent = {
  id: string;
  ticket_title: string;
  created_by: string;
  date_from: string;
  date_to: string;
  is_public: string;
  photo_url: string;
  ticket_desc: string;
  ticket_category_id: string;
  tags: string;
  event_type: string;
  venue: string;
  postal_address: string;
  city: string;
  ticket_type_id: string;
  notification_email: string;
  terms_condition: string;
  event_capacity: string;
  is_password_protected: string;
  activityurl: string;
  category_name: string;
  type_name: string;
};

type EventPackage = {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  date_from: string;
  date_to: string;
  is_transferable: string;
  per_person_limit: string;
  photourl: string | null;
  ticket_package_category_id: string;
  category_name: string;
};
