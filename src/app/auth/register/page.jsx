"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { post } from "@/lib/http";
import { toast } from "sonner"

export default function RegisterPage() {

  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") || "Gold";
  const planFromQuery = initialPlan.charAt(0).toUpperCase() + initialPlan.slice(1).toLowerCase();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    mobile: "",
    countryCode: "+234",
    plan: planFromQuery,
  });

  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationToken, setVerificationToken] = useState("");
  const [tokenVerified, setTokenVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleTokenChange = (e) => {
    setVerificationToken(e.target.value);
  };


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");
      // Validate form
      if (!formData.email || !formData.password) {
        setError("Email and password are required");
        return;
      }

      setIsLoading(true);

      const response = await post('sponsor', formData)
      // const data = await response.json();
      formData.plan = formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1).toLowerCase()
      if (response && response.success === true) {
        setIsLoading(false);
        router.push("/auth/verify?email=formData.email");
      }
      else {
        setIsLoading(false);
        toast.warning(response?.message || "Login failed")

      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message)
      setIsLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 my-12">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fname">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lname">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    type="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* ✅ Plan Selection Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="plan">Select Plan</Label>
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-md bg-gray-100 text-sm text-gray-700 w-full"
                  >
                    <option value="Gold">Gold (Free)</option>
                    <option value="Diamond">Diamond</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center space-x-2">
                    <select
                      className="px-3 py-2 border rounded-md bg-gray-100 text-sm text-gray-600"
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          countryCode: e.target.value,
                        })
                      }
                    >
                      <option value="+234">+234</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      {/* Add more as needed */}
                    </select>

                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Mobile Number"
                      value={formData.mobile}
                      // maxLength={10}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setFormData({ ...formData, mobile: value });
                      }}
                      required
                    />
                  </div>
                </div>

                {error && <div className="text-red-500">{error}</div>}

                <Button type="submit" className="w-full">
                  {isLoading ? "Sending Token..." : "Send Verification Token"}
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token">Verification Token</Label>
                  <Input
                    id="token"
                    placeholder="Enter verification token"
                    value={verificationToken}
                    onChange={handleTokenChange}
                    required
                  />
                </div>

                {error && <div className="text-red-500">{error}</div>}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying Token..." : "Verify Token"}
                </Button>
              </div>
            )}

            <div className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <a
                href="/api/auth/signin"
                className="text-primary hover:underline"
              >
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
