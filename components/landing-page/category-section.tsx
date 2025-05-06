import React from "react";
import {
  Calendar,
  Film,
  Headphones,
  Image,
  Music,
  Ticket,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const EventsCategorySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-purple mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore events by category to find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              icon={category.icon}
              count={category.count}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon, count }) => {
  return (
    <Card className="group cursor-pointer hover:shadow-md transition-all">
      <CardContent className="flex flex-col items-center justify-center py-6 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <h3 className="font-semibold text-dark-purple mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{count} Events</p>
      </CardContent>
    </Card>
  );
};

const categories = [
  {
    id: 1,
    title: "Music",
    icon: <Music className="w-6 h-6 text-main-purple" />,
    count: 253,
  },
  {
    id: 2,
    title: "Sports",
    icon: <Users className="w-6 h-6 text-main-purple" />,
    count: 184,
  },
  {
    id: 3,
    title: "Arts & Theatre",
    icon: <Image className="w-6 h-6 text-main-purple" />,
    count: 97,
  },
  {
    id: 4,
    title: "Conferences",
    icon: <Users className="w-6 h-6 text-main-purple" />,
    count: 65,
  },
  {
    id: 5,
    title: "Films",
    icon: <Film className="w-6 h-6 text-main-purple" />,
    count: 112,
  },
  {
    id: 6,
    title: "Festivals",
    icon: <Calendar className="w-6 h-6 text-main-purple" />,
    count: 74,
  },
  {
    id: 7,
    title: "Workshops",
    icon: <Ticket className="w-6 h-6 text-main-purple" />,
    count: 53,
  },
  {
    id: 8,
    title: "Concerts",
    icon: <Headphones className="w-6 h-6 text-main-purple" />,
    count: 165,
  },
];

export default EventsCategorySection;
