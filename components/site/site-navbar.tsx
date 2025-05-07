import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { Menu, X } from "lucide-react";

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

        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <div className="px-4 py-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold text-gradient">
                  TicketWave
                </span>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                  </Button>
                </DrawerClose>
              </div>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-dark-blue hover:text-main-blue transition-colors py-2 text-lg font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="border-t border-gray-200 my-4 pt-4">
                  <a
                    href="#"
                    className="text-dark-blue hover:text-main-blue py-2 text-lg font-medium block"
                  >
                    Sign In
                  </a>
                  <Button className="btn-gradient rounded-full px-4 py-2 w-full mt-4">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

const navLinks = [
  { label: "Browse Events", href: "#" },
  { label: "Categories", href: "#" },
  { label: "Sell Tickets", href: "#" },
  { label: "About Us", href: "#" },
];

export default Navbar;
