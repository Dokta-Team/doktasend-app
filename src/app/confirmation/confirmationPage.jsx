"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

const ConfirmationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const planDetails = {
    GOLD: "Basic coverage including general consultations and checkups.",
    DIAMOND: "Includes at-home testing and priority support.",
    PLATINUM: "Full medical coverage, emergency services, and premium support.",
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-lg p-6 shadow-lg">
          <CardContent>
            <h1 className="text-2xl font-bold text-center text-green-600 mb-4">
              🎉 Congratulations!
            </h1>
            <p className="text-center text-gray-700 mb-6">
              You have successfully signed up for the <strong>{plan}</strong>{" "}
              package.
            </p>
            <p className="text-center text-gray-600 mb-6">
              Your recipient will have access to:{" "}
              <span className="font-medium">{planDetails[plan]}</span>
            </p>
            <div className="flex justify-center mt-6">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => router.push("/onboard")}
              >
                Complete Registration for Your Loved One
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
};

export default ConfirmationPage;
