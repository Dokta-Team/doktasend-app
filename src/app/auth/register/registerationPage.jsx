// app/auth/register/page.js

'use client';
export const dynamic = 'force-dynamic'; // Prevent Next.js from prerendering this page

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { post } from "@/lib/http";
import { toast } from "sonner";

export default function RegisterContent() {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await post('sponsor', formData);

      if (response && response.success) {
        setIsLoading(false);
        // Navigate to verify page with email in query
        router.push(`/auth/verify?email=${encodeURIComponent(formData.email)}`);
      } else {
        setIsLoading(false);
        toast.warning(response?.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
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
              <Label htmlFor="lastName">Last Name</Label>
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
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="1234567890"
                value={formData.mobile}
                onChange={handleChange}
                pattern="\d{10,}"
                title="Mobile number must be at least 10 digits"
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

            {/* Plan Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="plan">Select Plan</Label>
              <select
                id="plan"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md bg-gray-100 text-sm w-full"
              >
                <option value="Gold">Gold (Free)</option>
                <option value="Diamond">Diamond</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <Button type="submit" className="w-full">
              {isLoading ? "Sending Token..." : "Send Verification Token"}
            </Button>

            <div className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <a href="/api/auth/signin" className="text-primary hover:underline">
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
