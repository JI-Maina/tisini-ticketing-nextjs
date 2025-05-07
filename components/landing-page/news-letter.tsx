import React from "react";
import { Button } from "@/components/ui/button";

const NewsletterSignup = () => {
  return (
    <div className="w-full bg-main-blue/10 py-12 px-4 sm:px-6 md:py-16">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-blue mb-3">
            Never Miss an Event
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Subscribe to our newsletter and be the first to know about upcoming
            events, exclusive offers, and more.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button className="btn-gradient rounded-full px-6 py-3">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
