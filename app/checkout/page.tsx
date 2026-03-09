"use client";

import Link from "next/link";
import { format } from "date-fns";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  CreditCard,
  Home,
  Loader2,
  Mail,
  MapPin,
  Minus,
  Plus,
  Ticket,
  User,
} from "lucide-react";

import { useStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface CheckoutData {
  quantity: number;
  first_name: string;
  last_name: string;
  user_email: string;
  user_phone: string;
}

const image =
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80";

const CheckoutPage = () => {
  const { store, updateTicket } = useStore();
  const { eventTicket: eventData, ticket: selectedTicket } = store;

  const [formData, setFormData] = useState<CheckoutData>({
    quantity: 1,
    first_name: "",
    last_name: "",
    user_email: "",
    user_phone: "",
  });

  const [errors, setErrors] = useState<Partial<CheckoutData>>({});
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState<{
    ticket_code?: string;
    message?: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const router = useRouter();

  const fullPhone = phoneValue?.replace(/\D/g, "") ?? "";

  let formattedDate = "Invalid date";

  if (eventData?.date_from) {
    const date = new Date(eventData.date_from);
    if (!isNaN(date.getTime())) {
      formattedDate = format(date, "EEEE, MMMM d, yyyy 'at' h:mm a");
    }
  }

  const totalPrice = parseFloat(selectedTicket.price) * formData.quantity;

  const handleInputChange = (
    field: keyof CheckoutData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneValue(value);
    if (errors.user_phone) {
      setErrors((prev) => ({ ...prev, user_phone: undefined }));
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    setPurchaseResult(null);
  };

  const handleGoHome = () => {
    updateTicket({} as EventPackage);
    handleSuccessModalClose();
    router.push("/");
  };

  const handlePurchaseMore = () => {
    handleSuccessModalClose();
    router.push(`/events/${eventData?.id ?? ""}`);
  };

  const handleQuantityChange = (increment: boolean) => {
    const newQuantity = increment
      ? formData.quantity + 1
      : Math.max(1, formData.quantity - 1);
    handleInputChange("quantity", newQuantity);
  };

  const validateForm = () => {
    const newErrors: Partial<CheckoutData> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First Name is required";
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last Name is required";
    }
    if (!formData.user_email.trim()) {
      newErrors.user_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = "Please enter a valid email";
    }
    if (!phoneValue?.trim()) {
      newErrors.user_phone = "Phone number is required";
    } else if (!isValidPhoneNumber(phoneValue)) {
      newErrors.user_phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      const data = {
        action: "create_ticket_purchaser",
        first_name: formData.first_name,
        last_name: formData.last_name,
        ticket_activity_id: eventData.id,
        ticket_package_id: selectedTicket.id,
        phone: fullPhone,
        email: formData.user_email,
        amount: "1",
        quantity: formData.quantity,
      };

      const url = process.env.NEXT_PUBLIC_PHP_API;
      const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
      fetch(`${url}gettoken=${TOKEN}`, {
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
          // console.log("Server response:", result);
          toast({
            title: result?.message ?? "Success",
            description: result?.ticket_code
              ? `Your ticket code: ${result.ticket_code}`
              : "Ticket purchased successfully",
          });
          setPurchaseResult({
            ticket_code: result?.ticket_code,
            message: result?.message,
          });
          setSuccessModalOpen(true);
        })
        .catch((error) => {
          toast({
            title: "Error purchasing ticket",
            description: "Error purchasing ticket",
          });
          console.error("Error purchasing ticket:", error);
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex-grow">
      <div className="mb-6">
        <Button
          onClick={() => router.back()}
          variant="link"
          type="button"
          className="text-main-blue hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to event details</span>
        </Button>
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
                    src={image}
                    alt={eventData.ticket_title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-dark-blue">
                      {eventData.ticket_title}
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
                      {selectedTicket.category_name} Ticket
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
                      <Label htmlFor="first_name">First Name *</Label>
                      <Input
                        id="first_name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.first_name}
                        onChange={(e) =>
                          handleInputChange("first_name", e.target.value)
                        }
                        className={errors.first_name ? "border-red-500" : ""}
                      />
                      {errors.first_name && (
                        <p className="text-sm text-red-600">
                          {errors.first_name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name *</Label>
                      <Input
                        id="last_name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.last_name}
                        onChange={(e) =>
                          handleInputChange("last_name", e.target.value)
                        }
                        className={errors.last_name ? "border-red-500" : ""}
                      />
                      {errors.last_name && (
                        <p className="text-sm text-red-600">
                          {errors.last_name}
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
                      <PhoneInput
                        id="user_phone"
                        international
                        defaultCountry="KE"
                        placeholder="Enter phone number"
                        value={phoneValue}
                        onChange={handlePhoneChange}
                        className={`PhoneInput--checkout ${errors.user_phone ? "PhoneInput--error" : ""}`}
                        numberInputProps={{
                          "aria-label": "Phone number",
                          className: errors.user_phone ? "!border-red-500" : "",
                        }}
                      />
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Complete Purchase"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogContent
          className="sm:max-w-md"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={() => handleSuccessModalClose()}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-main-blue">
              <CheckCircle className="h-6 w-6" />
              Order received
            </DialogTitle>
            <DialogDescription>
              {purchaseResult?.message ?? "Your order has been received."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="rounded-lg border bg-gray-50 p-4 space-y-2">
              <p className="font-semibold text-dark-blue">
                {eventData?.ticket_title}
              </p>
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  {selectedTicket?.category_name} × {formData.quantity}
                </span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              {purchaseResult?.ticket_code && (
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Ticket className="h-4 w-4 text-main-blue" />
                  <span className="font-mono font-semibold">
                    {purchaseResult.ticket_code}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3 text-sm text-dark-blue bg-main-blue/10 rounded-lg p-4">
              <p className="font-medium text-center">
                Complete payment on your phone when you get the M-Pesa prompt.
              </p>
              <p className="font-medium pt-2 border-t border-main-blue/20">
                If you did not receive a prompt, you may pay manually:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-left">
                <li>Go to your M-Pesa Menu</li>
                <li>Select Lipa na M-Pesa</li>
                <li>Select Pay Bill</li>
                <li>Enter Business Number: 4113757</li>
                <li>
                  Enter Account Number:{" "}
                  {purchaseResult?.ticket_code ?? "Your ticket code"}
                </li>
                <li>Enter Amount: KES {totalPrice.toLocaleString()}</li>
              </ol>
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleGoHome}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              type="button"
              className="w-full sm:w-auto btn-gradient"
              onClick={handlePurchaseMore}
            >
              <Ticket className="w-4 h-4 mr-2" />
              Purchase more
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;
