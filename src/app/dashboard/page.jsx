"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { get } from "@/lib/http";

const SponsorDashboardClient = ({ userName }) => {
  const [recipients, setRecipients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // recipients
    // const fetchDashboardData = async () => {
    //   const response = await fetch("/api/dashboard");
    //   if (response.ok) {
    //     const data = await response.json();
    //     setRecipients(data.recipients);
    //   } else {
    //     console.error("Failed to fetch dashboard data");
    //   }
    // };
    // fetchDashboardData();
    const fetchDashboardData = async () => {
      const response = await get("sponsor/recipients");
      // console.log("response", response)
      if (response && response.success === true) {
        setRecipients(response.payload)
      }
      else {
        // setIsLoading(false);
        alert(response?.message || "Something went wrong");
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      {userName && (
        <h2 className="text-2xl font-semibold mb-4">Welcome, {userName}</h2>
      )}{" "}
      {/* Welcome message */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Recipients
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recipients.length}</div>
            <p className="text-xs text-muted-foreground">
              Active care recipients
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Visits
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Scheduled this week</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activities
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Actions in last 7 days
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recipients Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recipients.length === 0 ? (
                <div className="text-center p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    You have no active recipients.
                  </p>
                  <Button onClick={() => router.push("/OnboardPage")}>
                    Onboard your first recipient
                  </Button>
                </div>
              ) : (
                recipients.map((recipient) => (
                  <div
                    key={recipient._id}
                    className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <User className="h-10 w-10 p-2 bg-gray-100 rounded-full" />
                      <div>
                        <p className="font-medium">{recipient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Last check-in: Today
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(`/dashboard/${userName}/${recipient._id}`)
                      }
                      className="shadow-md hover:bg-gray-100"
                    >
                      View Details
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SponsorDashboardClient;
