"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/authContext";
import { toast } from "sonner"
import { get } from "@/lib/http";
import { formatAccountDate } from "@/lib/utils";
import { Spinner } from "@/app/(components)/spinner";


const RecipientDetailsPage = () => {
  const params = useParams();
  const { user } = useAuthContext();
  const { username, recipientId } = params;
  const [recipient, setRecipient] = useState({});
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getRecipientDetails(recipientId)
  }, [])

  const getRecipientDetails = async (recipientId) => {
    try {
      if (!recipientId) {
        toast.warning("No recipient id", {
          description: "Uh oh! Something went wrong.",
        })
      }
      setLoading(true)
      const response = await get(`recipient/${recipientId}`);
      if (response && response.success === true) {
        setRecipient(response.payload)
        setLoading(false)
      }
      else {
        setLoading(false)
        toast.warning(response.message, {
          description: "Uh oh! Something went wrong.",
        })
      }
    } catch (error) {
      toast.error(error.message || "There was a problem fetching recipient data.", {
        description: "Uh oh! Something went wrong.",
      })
    }
    finally {
      setLoading(false)
    }
  }

  if (loading) return <Spinner />
  if (!recipientId) return <p>No recipient data available.</p>;

  return (
    <>
      <Head>
        <title>Doktasend | {recipient?.fullName}</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Recipient Profile
              </h1>
              <p className="text-sm text-gray-500">
                Manage and monitor recipient healthcare
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                onClick={() => router.push("/dashboard")}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Recipient Summary Card */}
          <Card className="bg-white rounded-lg shadow mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    {recipient?.fullName}
                  </CardTitle>
                  <p className="text-gray-600">
                    Mobile: {recipient?.mobile ? recipient?.mobile : "Not provided"}
                  </p>
                  <p className="text-gray-600">
                    Email: {recipient?.email !== "default@gmail.com" ? recipient?.email?.toLowerCase() : "Not provided"}
                  </p>
                  <p className="text-gray-600">
                    Date of Birth: {recipient?.dateOfBirth ? formatAccountDate(recipient?.dateOfBirth || new Date()) : "Not provided"}
                  </p>
                  <p className="text-gray-600 capitalize">
                    Gender: {recipient?.gender}
                  </p>
                  <p className="text-gray-600">
                    {/* {recipient.age} years • */}
                    Package: {recipient?.sponsor?.plan}
                  </p>
                  <p className="text-gray-600">
                    Onboarded: {formatAccountDate(recipient?.createdAt || new Date())}
                  </p>
                </div>
                <div className="mt-4 md:mt-0"></div>
              </div>
            </CardContent>

            {/* Navigation Tabs */}
            <CardContent className="border-t border-gray-200">
              <nav className="flex">
                {["overview", "medications", "activities", "reports"].map(
                  (tab) => (
                    <Button
                      key={tab}
                      variant="ghost"
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 text-sm font-medium ${activeTab === tab
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Button>
                  )
                )}
              </nav>
            </CardContent>
          </Card>

          {/* Tab Content */}
          <Card className="bg-white rounded-lg shadow">
            {activeTab === "overview" && (
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Upcoming Visits */}
                  <Card className="bg-gray-50 p-4 rounded-md">
                    <CardTitle className="text-lg font-medium mb-4">
                      Upcoming Visits
                    </CardTitle>
                    <CardContent className="space-y-4">
                      {recipient?.upcomingVisits?.map((visit, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium">{visit.type}</p>
                            <p className="text-sm text-gray-500">
                              {visit.date} at {visit.time}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${visit.status === "Scheduled"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {visit.status}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Recent Activities */}
                  <Card className="bg-gray-50 p-4 rounded-md">
                    <CardTitle className="text-lg font-medium mb-4">
                      Recent Activities
                    </CardTitle>
                    {/* <CardContent className="space-y-4">
                      {recipient?.recentActivities
                        .slice(0, 3)
                        .map((activity, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-blue-500 pl-3"
                          >
                            <p className="text-sm text-gray-500">
                              {activity.date} - {activity.type}
                            </p>
                            <p className="text-sm">{activity.notes}</p>
                            <p className="text-xs text-gray-500">
                              By: {activity.agent}
                            </p>
                          </div>
                        ))}
                      <Button variant="outline" className="w-full mt-2">
                        View All Activities
                      </Button>
                    </CardContent> */}
                  </Card>
                </div>
              </CardContent>
            )}

            {activeTab === "medications" && (
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <CardTitle className="text-lg font-medium">
                    Current Medications
                  </CardTitle>
                  <div className="flex space-x-3">
                    <Button variant="outline">Request Prescription</Button>
                    <Button variant="outline">Add Medication</Button>
                  </div>
                </div>

                {/* <div className="grid grid-cols-1 gap-4">
                  {recipient?.medications.map((med, index) => (
                    <Card
                      key={index}
                      className="bg-white border rounded-md p-4 flex flex-col md:flex-row md:justify-between md:items-center"
                    >
                      <div>
                        <CardTitle className="font-medium">
                          {med.name}
                        </CardTitle>
                        <CardContent className="text-sm text-gray-600">
                          {med.dosage} • {med.frequency}
                        </CardContent>
                        <p className="text-xs text-gray-500">
                          Started: {med.startDate} • End: {med.endDate}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 flex space-x-2">
                        <Button variant="outline" className="px-3 py-1 text-sm">
                          Refill
                        </Button>
                        <Button variant="outline" className="px-3 py-1 text-sm">
                          Edit
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div> */}
              </CardContent>
            )}

            {activeTab === "activities" && (
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <CardTitle className="text-lg font-medium">
                    Activity Log
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Filter:</span>
                    <select className="border rounded-md px-2 py-1 text-sm">
                      <option>All Activities</option>
                      <option>Check-in Calls</option>
                      <option>Medications</option>
                      <option>Tests</option>
                    </select>
                  </div>
                </div>

                {/* <CardContent className="space-y-4">
                  {recipient?.recentActivities.map((activity, index) => (
                    <Card
                      key={index}
                      className="bg-white border-l-2 border-blue-500 p-4 rounded-r-md shadow-sm"
                    >
                      <div className="flex justify-between">
                        <CardTitle className="font-medium">
                          {activity.type}
                        </CardTitle>
                        <CardContent className="text-sm text-gray-500">
                          {activity.date}
                        </CardContent>
                      </div>
                      <CardContent className="mt-2 text-sm">
                        {activity.notes}
                      </CardContent>
                      <p className="mt-1 text-xs text-gray-500">
                        Recorded by: {activity.agent}
                      </p>
                    </Card>
                  ))}
                  <div className="flex justify-center mt-6">
                    <Button variant="outline">Load More Activities</Button>
                  </div>
                </CardContent> */}
              </CardContent>
            )}

            {activeTab === "reports" && (
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <CardTitle className="text-lg font-medium">
                    Health Reports
                  </CardTitle>
                  <Button variant="outline">Generate New Report</Button>
                </div>

                <Card className="bg-yellow-50 p-4 rounded-md mb-6">
                  <CardContent className="text-sm text-yellow-700">
                    Monthly reports are automatically generated and sent to the
                    sponsor. You can also generate custom reports or download
                    previous reports here.
                  </CardContent>
                </Card>

                <CardContent className="space-y-4">
                  <Card className="bg-white border rounded-md p-4 flex justify-between items-center">
                    <div>
                      <CardTitle className="font-medium">
                        March 2025 Monthly Report
                      </CardTitle>
                      <CardContent className="text-sm text-gray-600">
                        Generated on March 31, 2025
                      </CardContent>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="px-3 py-1 text-sm">
                        View
                      </Button>
                      <Button variant="outline" className="px-3 py-1 text-sm">
                        Download
                      </Button>
                    </div>
                  </Card>
                  <Card className="bg-white border rounded-md p-4 flex justify-between items-center">
                    <div>
                      <CardTitle className="font-medium">
                        February 2025 Monthly Report
                      </CardTitle>
                      <CardContent className="text-sm text-gray-600">
                        Generated on February 28, 2025
                      </CardContent>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="px-3 py-1 text-sm">
                        View
                      </Button>
                      <Button variant="outline" className="px-3 py-1 text-sm">
                        Download
                      </Button>
                    </div>
                  </Card>
                  <Card className="bg-white border rounded-md p-4 flex justify-between items-center">
                    <div>
                      <CardTitle className="font-medium">
                        January 2025 Monthly Report
                      </CardTitle>
                      <CardContent className="text-sm text-gray-600">
                        Generated on January 31, 2025
                      </CardContent>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="px-3 py-1 text-sm">
                        View
                      </Button>
                      <Button variant="outline" className="px-3 py-1 text-sm">
                        Download
                      </Button>
                    </div>
                  </Card>
                </CardContent>
              </CardContent>
            )}
          </Card>
        </main>
      </div>
    </>
  );
};

export default RecipientDetailsPage;
