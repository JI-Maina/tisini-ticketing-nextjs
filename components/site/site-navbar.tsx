import React from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gradient">TisiniVault</span>
        </div>

        <div className="hidden md:flex items-center space-x-6 font-semibold">
          <a
            href="#"
            className="text-dark-blue hover:text-main-blue transition-colors"
          >
            Browse Events
          </a>
          <a
            href="#"
            className="text-dark-blue hover:text-main-blue transition-colors"
          >
            Categories
          </a>
          <a
            href="#"
            className="text-dark-blue hover:text-main-blue transition-colors"
          >
            Sell Tickets
          </a>
          <a
            href="#"
            className="text-dark-blue hover:text-main-blue transition-colors"
          >
            About Us
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="text-dark-blue hover:text-main-blue hidden md:inline-block font-semibold"
          >
            Sign In
          </a>
          <Button className="btn-gradient rounded-full px-4 py-2">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
