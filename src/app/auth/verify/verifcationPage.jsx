"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { post } from "@/lib/http";
import { Suspense } from 'react'
import { Spinner } from "@/app/(components)/spinner";

export default function VerificationContent() {
    const searchParams = useSearchParams();
    const userEmail = searchParams.get("email"); // email from query

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [tokenVerified, setTokenVerified] = useState(false);
    const [resendCountdown, setResendCountdown] = useState(120); // seconds remaining
    const router = useRouter();


    useEffect(() => {
        if (resendCountdown <= 0) return;

        const interval = setInterval(() => {
            setResendCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [resendCountdown]);

    const handleTokenChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!userEmail) {
            setError("Your email is missing in the URL");
            return;
        }
        if (!verificationCode) {
            setError("Verification code is required");
            return;
        }

        setIsLoading(true);

        try {
            const response = await post("auth/verify-email", {
                verificationCode,
                email: userEmail.toLowerCase(),
            });
            if (response && response.success) {
                setTokenVerified(true);
                setIsLoading(false);
                router.push("/auth/login");
            } else {
                throw new Error(response?.message || "Verification failed");
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!userEmail) return;

        setIsLoading(true);
        try {
            const response = await post("auth/resend-otp", {
                email: userEmail.toLowerCase(),
            });

            if (response && response.success) {
                setResendCountdown(120);
            } else {
                throw new Error(response?.message || "Failed to resend code");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6">
                <CardHeader>
                    <CardTitle>Email Verification</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="token">Verification Token</Label>
                            <Input
                                id="token"
                                placeholder="Enter verification token"
                                value={verificationCode}
                                onChange={handleTokenChange}
                                required
                            />
                        </div>

                        {error && <div className="text-red-500">{error}</div>}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Verifying Token..." : "Verify Token"}
                        </Button>

                        <div className="text-center text-sm text-gray-500 mt-4">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (resendCountdown === 0 && !isLoading) handleResend();
                                }}
                                className={`font-medium hover:underline ${resendCountdown > 0 || isLoading ? "pointer-events-none text-gray-400" : "text-primary"}`}
                            >
                                {resendCountdown > 0
                                    ? `Resend code in ${resendCountdown}s`
                                    : "Resend Code"}
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
