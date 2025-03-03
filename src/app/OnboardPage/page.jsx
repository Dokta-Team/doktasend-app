"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    recipientName: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    plan: "GOLD", // ✅ Default plan set to "GOLD"
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkip = () => {
    router.refresh();
    router.push("/dashboard");
  };

  const isRecipientDetailsFilled = () => {
    return formData.recipientName && formData.dateOfBirth && formData.address && formData.phone;
  };

  const handleSubmit = async () => {
    console.log("Form Data:", formData);
    const response = await fetch("/api/recipients", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('Registration failed:', data.error); // Log the error for debugging
      alert(`Registration failed: ${data.error || 'Unknown error'}`); // Display user-friendly error
      throw new Error(data.error || 'Registration failed');
    } else {
      router.refresh();
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-6">
        <CardContent>
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Add Recipient Details</h2>
              <div className="space-y-3">
              <div>
                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="recipientName"
                  name="recipientName"
                  placeholder="Enter full name"
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date of Birth
                </label>
                <input
                  type="date" id="dateOfBirth" name="dateOfBirth"
                  placeholder="Enter full name"
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
              </div>
              <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
               Address
              </label>
              <input
                id="address" name="address" placeholder="Enter address"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                id="phone" name="phone" placeholder="Enter phone number"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              />
            </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={handleSkip} >Skip</Button>
                <Button onClick={() => setStep(2)} disabled={!isRecipientDetailsFilled()}>Next</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Choose a Plan</h2>
              <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GOLD">Gold Plan - Basic coverage</SelectItem>
                  <SelectItem value="DIAMOND">Diamond Plan - Includes at-home testing</SelectItem>
                  <SelectItem value="PLATINUM">Platinum Plan - Full medical coverage + emergency services</SelectItem>
                </SelectContent>
              </Select>
              <p className="mt-2 text-blue-600 cursor-pointer hover:underline">
                <a href="/plan-details">Check out our plan details</a>
              </p>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={handleSkip} >Skip</Button>
                <Button onClick={() => setStep(3)}>Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Complete Onboarding</h2>
              <p>Your recipient has been set up. Click below to continue.</p>
              <Button className="w-full mt-4" onClick={handleSubmit}>Complete Onboarding</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
