"use client";
import { useState, useLayoutEffect, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { get } from "@/lib/http";
import OnboardingModal from "./onboardModal";
import { Spinner } from "../(components)/spinner";
import { toast } from "sonner"
import { useAuthContext } from "@/context/authContext";

const SponsorDashboardClient = () => {
  const [recipients, setRecipients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setloading] = useState(false)
  const router = useRouter();
  const user = useAuthContext()

  useLayoutEffect(() => {

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setloading(true)
      const response = await get("recipient/sponsor-recipients");
      if (response && response.success === true) {
        setRecipients(response.payload)
        setloading(false)
      }
      else {
        // setIsLoading(false);
        toast(response?.message || "There was a problem with your request.", {
          description: "Uh oh! Something went wrong.",
          action: {
            label: "Try again",
            onClick: () => fetchDashboardData(),
          },
        })
        setloading(false)
      }
    } catch (error) {
      toast(error.message, {
        // description: "Success",
        action: {
          label: "Try again",
          onClick: () => fetchDashboardData(),
        },
      })
    }
  };
  return (
    <div className="p-6">
      {loading && <Spinner />}
      <h2 className="text-2xl font-semibold mb-4">Welcome, {'userName'}</h2>
      {/* {userName && (
        <h2 className="text-2xl font-semibold mb-4">Welcome, {userName}</h2>
      )}{" "} */}
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
            <div className="text-2xl font-bold">0</div>
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
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Actions in last 7 days
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Recipients Overview</CardTitle>
            {recipients.length !== 0 && <div className="text-center pb-2">
              <Button onClick={() => setShowModal(true)}>
                Onboard your recipient
              </Button>
              <OnboardingModal open={showModal} onClose={() => setShowModal(false)} fetchDashboardData={fetchDashboardData} />
            </div>}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recipients.length === 0 ? (
                <div className="text-center p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    You have no active recipients.
                  </p>
                  {/* <Button onClick={() => router.push("/onboard")}> */}
                  <Button onClick={() => setShowModal(true)}>
                    Onboard your first recipient
                  </Button>
                  <OnboardingModal open={showModal} onClose={() => setShowModal(false)} fetchDashboardData={fetchDashboardData} />
                </div>
              ) : (

                recipients?.map((recipient) => (
                  <div
                    key={recipient._id}
                    className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <User className="h-10 w-10 p-2 bg-gray-100 rounded-full" />
                      <div>
                        <p className="font-medium">{recipient.fullName}</p>
                        <p className="text-sm text-muted-foreground">
                          Last check-in: Today
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(`/dashboard/${recipient._id}`)
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
