"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select,SelectContent, SelectItem } from "@/components/ui/select";

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    recipientName: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    plan: "GOLD", // Default plan
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkip = () => {
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    await fetch("/api/recipients", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-6">
        <CardContent>
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Add Recipient Details</h2>
              <Input name="recipientName" placeholder="Full Name" onChange={handleChange} />
              <Input type="date" name="dateOfBirth" placeholder="Date of Birth" onChange={handleChange} />
              <Input name="address" placeholder="Address" onChange={handleChange} />
              <Input name="phone" placeholder="Phone" onChange={handleChange} />
              <div className="flex justify-between mt-4">
                <Button onClick={handleSkip} variant="outline">Skip</Button>
                <Button onClick={() => setStep(2)}>Next</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Choose a Plan</h2>
              <Select>
              <SelectContent name="plan" onChange={handleChange}>
                <SelectItem value="GOLD">Gold (Default)</SelectItem>
                <SelectItem value="DIAMOND">Diamond</SelectItem>
                <SelectItem value="PLATINUM">Platinum</SelectItem>
              </SelectContent>
              </Select>
              <div className="flex justify-between mt-4">
                <Button onClick={handleSkip} variant="outline">Skip</Button>
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
