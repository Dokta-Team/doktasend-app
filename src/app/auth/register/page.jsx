"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    phone: "",
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
    e.preventDefault();
    // setError("");

    // if (
    //   !formData.fname ||
    //   !formData.lname ||
    //   !formData.email ||
    //   !formData.password
    // ) {
    //   setError("All fields are required");
    //   return;
    // }

    // if (formData.password !== formData.confirmPassword) {
    //   setError("Passwords do not match");
    //   return;
    // }

    // if (formData.password.length < 6) {
    //   setError("Password must be at least 6 characters");
    //   return;
    // }

    // setIsLoading(true);

    // if (currentStep === 1) {
    //   try {
    //     // Step 1: Register user
    //     const registerResponse = await fetch("/api/auth/register", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         fname: formData.fname,
    //         lname: formData.lname,
    //         email: formData.email,
    //         password: formData.password,
    //         phone: formData.phone,
    //       }),
    //     });

    //     const registerData = await registerResponse.json();

    //     if (!registerResponse.ok) {
    //       throw new Error(registerData.error || "Registration failed.");
    //     }

    //     // Step 2: Send verification token
    //     const tokenRes = await fetch("/api/send-verification-token", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ email: formData.email }),
    //     });

    //     const tokenData = await tokenRes.json();
    //     console.log("love", tokenData);
    //     if (!tokenRes.ok) {
    //       console.log("lov", tokenRes);
    //       throw new Error(
    //         tokenData.error || "Failed to send verification token."
    //       );
    //     }

    //     // Move to Step 2 on success
    //     setCurrentStep(2);
    //     return; // Prevent further execution of handleSubmit for step 1
    //   } catch (error) {
    //     setError(error.message);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // } else if (currentStep === 2) {
    //   try {
    //     const response = await fetch("/api/verify-token", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         userData: formData,
    //         token: verificationToken,
    //       }),
    //     });

    //     const data = await response.json();

    //     if (!response.ok) {
    //       throw new Error(data.error || "Invalid verification token.");
    //     }

    //     setTokenVerified(true);
    //     router.refresh();
    //     router.push(`/confirmation?plan=${formData.plan}`);
    //     return; // Prevent further execution of handleSubmit for step 1
    //   } catch (error) {
    //     setError(error.message);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6">
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
                    id="fname"
                    name="fname"
                    placeholder="John"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lname">Last Name</Label>
                  <Input
                    id="lname"
                    name="lname"
                    placeholder="Doe"
                    value={formData.lname}
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
                      placeholder="8123456789"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setFormData({ ...formData, phone: value });
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
