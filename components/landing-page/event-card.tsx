import React from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EventCardProps {
  title: string;
  image: string;
  date: string;
  location: string;
  time: string;
  price: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  image,
  date,
  location,
  time,
  price,
}) => {
  return (
    <Card className="overflow-hidden group h-full transition-all hover:shadow-lg">
      <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold">
          {price}
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-2 text-dark-purple">{title}</h3>
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-main-purple" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-main-purple" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-main-purple" />
            <span className="text-sm">{time}</span>
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full py-2 rounded-full bg-primary/10 text-main-purple font-medium hover:bg-primary/20 transition-colors">
            Get Tickets
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
