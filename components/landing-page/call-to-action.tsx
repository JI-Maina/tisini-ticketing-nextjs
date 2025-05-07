import React from "react";
import { Button } from "../ui/button";

const CalltoActionSection = () => {
  return (
    <section className="py-16 bg-main-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Want to Host Your Own Event?
          </h2>
          <p className="text-white/80 mb-8">
            Create, promote, and manage your event with our easy-to-use
            platform. Reach thousands of potential attendees and sell tickets
            hassle-free.
          </p>
          <Button className="bg-white text-main-blue hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-medium">
            Start Selling Tickets
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CalltoActionSection;
