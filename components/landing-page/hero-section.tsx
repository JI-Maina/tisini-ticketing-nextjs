import React from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="bg-hero-pattern pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-purple leading-tight mb-6">
            Discover <span className="text-gradient">Amazing Events</span>{" "}
            Happening Near You
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find and book tickets to the best concerts, sports games, festivals,
            conferences, and more.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-full shadow-lg p-2 flex items-center max-w-2xl mx-auto">
            <div className="flex-1 flex items-center gap-2 px-4">
              <Search className="w-4 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, artists, venues..."
                className="flex-1 border-0 focus:outline-none focus:ring-0 text-gray-800 placeholder:text-gray-400 bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2 border-l border-gray-200 px-4">
              <MapPin className="w-4 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 border-0 focus:outline-none focus:ring-0 text-gray-800 placeholder:text-gray-400 bg-transparent"
              />
            </div>
            <div className="">
              <Button className="btn-gradient rounded-full px-3">Search</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
