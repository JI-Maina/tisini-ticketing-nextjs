"use client";

import React from "react";
import { Loader } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const LoadingPage = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 500);

    const timer2 = setTimeout(() => {
      setProgress(100);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-main-blue/10 to-light-blue/10">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gradient mb-2">TicketVault</h1>
          <p className="text-gray-600">Finding amazing events for you</p>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-1 bg-gray-200/60 w-full" />

          <div className="flex justify-center">
            <div className="animate-spin text-main-blue">
              <Loader size={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
