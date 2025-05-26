"use client";

import Link from "next/link";
import { format } from "date-fns";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  User,
} from "lucide-react";

import { useStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CheckoutData {
  quantity: number;
  user_name: string;
  user_email: string;
  user_phone: string;
}

const image =
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80";

const CheckoutPage = () => {
  const eventData = useStore((state) => state.store.eventTicket);
  const selectedTicket = useStore((state) => state.store.ticket);

  const [formData, setFormData] = useState<CheckoutData>({
    quantity: 1,
    user_name: "",
    user_email: "",
    user_phone: "",
  });

  const [errors, setErrors] = useState<Partial<CheckoutData>>({});
  const { toast } = useToast();
  const router = useRouter();

  const formattedDate = format(
    new Date(eventData.date),
    "EEEE, MMMM d, yyyy 'at' h:mm a"
  );
  const totalPrice = parseFloat(selectedTicket.price) * formData.quantity;

  const handleInputChange = (
    field: keyof CheckoutData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleQuantityChange = (increment: boolean) => {
    const newQuantity = increment
      ? formData.quantity + 1
      : Math.max(1, formData.quantity - 1);
    handleInputChange("quantity", newQuantity);
  };

  const validateForm = () => {
    const newErrors: Partial<CheckoutData> = {};

    if (!formData.user_name.trim()) {
      newErrors.user_name = "Name is required";
    }
    if (!formData.user_email.trim()) {
      newErrors.user_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = "Please enter a valid email";
    }
    if (!formData.user_phone.trim()) {
      newErrors.user_phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const data = {
        ticket_type: selectedTicket.id,
        user_name: formData.user_name,
        user_email: formData.user_email,
        user_phone: formData.user_phone,
      };

      const url = process.env.NEXT_PUBLIC_API;
      fetch(`${url}/api/tickets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          toast({
            title: "Success",
            description: "Ticket purchased successfully",
          });
          router.push("/");
          console.log("Ticket purchased successfully", result);
        })
        .catch((error) => {
          toast({
            title: "Error purchasing ticket",
            description: "Error purchasing ticket",
          });
          console.error("Error purchasing ticket:", error);
        });

      //   console.log("Checkout data:", data);
      // Here you would typically send the data to your backend
      //   alert("Ticket purchased successfully!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex-grow">
      <div className="mb-6">
        <Link
          href={`/events/`}
          className="text-main-blue hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to event details</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-blue mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="order-2 md:order-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={eventData.image || image}
                    alt={eventData.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-dark-blue">
                      {eventData.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{eventData.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {selectedTicket.type} Ticket
                    </span>
                    <span className="font-semibold">
                      ${parseFloat(selectedTicket.price).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">Quantity</span>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(false)}
                        disabled={formData.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {formData.quantity}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(true)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="order-1 md:order-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Your Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* User Details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="user_name">Full Name *</Label>
                      <Input
                        id="user_name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.user_name}
                        onChange={(e) =>
                          handleInputChange("user_name", e.target.value)
                        }
                        className={errors.user_name ? "border-red-500" : ""}
                      />
                      {errors.user_name && (
                        <p className="text-sm text-red-600">
                          {errors.user_name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="user_email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="user_email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.user_email}
                          onChange={(e) =>
                            handleInputChange("user_email", e.target.value)
                          }
                          className={`pl-10 ${
                            errors.user_email ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.user_email && (
                        <p className="text-sm text-red-600">
                          {errors.user_email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="user_phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="user_phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.user_phone}
                          onChange={(e) =>
                            handleInputChange("user_phone", e.target.value)
                          }
                          className={`pl-10 ${
                            errors.user_phone ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.user_phone && (
                        <p className="text-sm text-red-600">
                          {errors.user_phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-gradient rounded-full py-6 text-base"
                  >
                    Complete Purchase
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
