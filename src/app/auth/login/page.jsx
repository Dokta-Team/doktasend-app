"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { post, setToken } from "@/lib/http";
import { useAuthContext } from "@/context/authContext";
import { toast } from "sonner"

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { saveUser, saveUserToken } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      const response = await post('sponsor/login', formData)
      console.log("Login response:", response);
      if (response && response.success === true) {
        const { ...sponsor } = response.payload.sponsor;
        const { accessToken, } = response.payload;
        if (sponsor.verified === false) {
          await post("auth/resend-otp", {
            email: formData.email.toLowerCase(),
          });
          // send a new code here
          setTimeout(() => {
            setIsLoading(false);
          }, 4000);
          return router.push(`/auth/verify?email=${formData.email}`);
        }
        if (response.payload.role === 'admin') {
          setIsLoading(false);
          return router.push("/admin");
        }
        else {
          setToken(accessToken)
          saveUserToken(accessToken)
          saveUser(sponsor)
          setIsLoading(false);
          return router.push("/dashboard");
        }
      }
      else {
        setIsLoading(false);
       return toast.warning(response?.message || "Login failed")
      }
    } catch (error) {
      // setError(error.message);
      toast.error(error?.message)
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Create account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
