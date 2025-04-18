"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Track current signup step
  const [verificationToken, setVerificationToken] = useState("");
  const [tokenVerified, setTokenVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleTokenChange = (e) => {
    setVerificationToken(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (currentStep === 1) {
      // Step 1: Send Verification Token
      try {
        const response = await fetch("/api/send-verification-token", {
          // API endpoint to be created
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }), // Send email to generate token for
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to send verification token.");
        } else {
          setCurrentStep(2); // Move to step 2 if token sent successfully
          return; // Prevent further execution of handleSubmit for step 1
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else if (currentStep === 2) {
      // Step 2: Verify Token
      try {
        const response = await fetch("/api/Users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userData: formData,
            token: verificationToken,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Invalid verification token.");
        } else {
          setTokenVerified(true);
          router.refresh();
          router.push("/OnboardPage"); // Redirect to dashboard after successful registration
          return;
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p>{error}</p>}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sponsor">Sponsor</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="medical">
                        Medical Professional
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending Token..." : "Next"}
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="token" className="text-sm font-medium">
                    Verification Token
                  </label>
                  <Input
                    id="token"
                    placeholder="Enter verification token"
                    value={verificationToken}
                    onChange={handleTokenChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Verifying Token..." : "Verify Token"}
                </Button>
              </div>
            )}

            <div className="text-center text-sm text-gray-500">
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
};

export default RegisterPage;
