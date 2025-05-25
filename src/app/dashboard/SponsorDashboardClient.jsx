"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SponsorDashboardClient({ userName }) {
  const [recipients, setRecipients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const response = await fetch("/api/dashboard");
      if (response.ok) {
        const data = await response.json();
        setRecipients(data.recipients);
      } else {
        console.error("Failed to fetch dashboard data");
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      {userName && (
        <h2 className="text-2xl font-semibold mb-4">Welcome, {userName}</h2>
      )}
      {/* ...existing dashboard UI code... */}
      {/* Copy the dashboard UI from the original file here, replacing all references to setUserName, etc. */}
    </div>
  );
}
