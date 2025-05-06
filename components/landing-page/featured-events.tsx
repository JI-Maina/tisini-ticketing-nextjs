import React from "react";
import EventCard from "./event-card";

const FeaturedEventsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-purple">
            Featured Events
          </h2>
          <a href="#" className="text-main-purple font-medium hover:underline">
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              image={event.image}
              date={event.date}
              location={event.location}
              time={event.time}
              price={event.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsSection;

const featuredEvents = [
  {
    id: 1,
    title: "Summer Music Festival 2025",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    date: "July 15-17, 2025",
    location: "Golden Gate Park, SF",
    time: "12:00 PM - 11:00 PM",
    price: "From $99",
  },
  {
    id: 2,
    title: "International Film Festival",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    date: "September 5-10, 2025",
    location: "Downtown Cinema",
    time: "Various times",
    price: "From $45",
  },
  {
    id: 3,
    title: "Tech Conference 2025",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    date: "October 20-22, 2025",
    location: "Convention Center",
    time: "9:00 AM - 6:00 PM",
    price: "From $199",
  },
  {
    id: 4,
    title: "Broadway Show: Hamilton",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    date: "Ongoing",
    location: "Broadway Theater",
    time: "7:30 PM",
    price: "From $120",
  },
];
