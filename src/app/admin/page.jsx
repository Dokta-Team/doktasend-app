"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  Heart,
  Bell,
  Search,
  Settings,
  Users,
  Home,
  BarChart3,
  Calendar,
  MessageSquare,
  LogOut,
  ChevronDown,
  Plus,
  Filter,
  MoreHorizontal,
  User,
  Activity,
  Pill,
  Clipboard,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MedicalEventForm from "@/components/admin-forms/MedicalEventForm";
import MedicationForm from "@/components/admin-forms/MedicationForm";
import ActivityLogForm from "@/components/admin-forms/ActivityLogForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminDashboard() {
  const [isVerified, setIsVerified] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState(null);

  const handleVerifyAccessKey = () => {
    if (accessKey === process.env.NEXT_PUBLIC_ADMIN_ACCESS_KEY) {
      setIsVerified(true);
      setError(null);
    } else {
      setError("Invalid Access Key");
    }
  };

  return !isVerified ? (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Admin Access Verification</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Input
          type="password"
          placeholder="Enter Access Key"
          value={accessKey}
          onChange={(e) => setAccessKey(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button onClick={handleVerifyAccessKey} className="w-full">
          Verify Access Key
        </Button>
      </CardContent>
    </Card>
  ) : (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="flex h-14 items-center border-b px-4">
          <Link className="flex items-center justify-center" href="/">
            <Heart className="h-6 w-6 text-primary" />
            <span className="ml-2 text-xl font-bold">DoktaSend</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Activity className="h-4 w-4" />
              Monitoring
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Pill className="h-4 w-4" />
              Medications
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Clipboard className="h-4 w-4" />
              Reports
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Calendar className="h-4 w-4" />
              Appointments
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <MessageSquare className="h-4 w-4" />
              Messages
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src="/placeholder.svg?height=36&width=36"
                alt="Avatar"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-gray-500">admin@doktasend.com</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                  <ChevronDown className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:px-6">
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-white pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  3
                </span>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">
                    New user registered
                  </span>
                  <span className="text-xs text-gray-500">2 minutes ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">
                    Emergency alert: Patient #1234
                  </span>
                  <span className="text-xs text-gray-500">15 minutes ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">
                    Monthly reports ready
                  </span>
                  <span className="text-xs text-gray-500">1 hour ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">
                <span className="text-sm font-medium">
                  View all notifications
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>System Settings</DropdownMenuItem>
              <DropdownMenuItem>User Preferences</DropdownMenuItem>
              <DropdownMenuItem>Notification Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="/placeholder.svg?height=36&width=36"
              alt="Avatar"
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-gray-500">
                Welcome back, Admin. Here's what's happening today.
              </p>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,853</div>
                  <p className="text-xs text-gray-500">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Care Plans
                  </CardTitle>
                  <Activity className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-gray-500">+5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Healthcare Providers
                  </CardTitle>
                  <User className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-gray-500">+3% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Alerts
                  </CardTitle>
                  <AlertCircle className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-red-500">Requires attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 md:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="medical-events">Medical Events</TabsTrigger>
                <TabsTrigger value="medications">Medications</TabsTrigger>
                <TabsTrigger value="activity-logs">Activity Logs</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  {/* Activity Chart */}
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Activity Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="h-[200px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-sm text-gray-500">
                          Activity Chart Placeholder
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Alerts */}
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Alerts</CardTitle>
                      <CardDescription>
                        Alerts requiring attention
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            type: "Emergency",
                            patient: "John Doe",
                            time: "10 minutes ago",
                            status: "critical",
                          },
                          {
                            type: "Medication",
                            patient: "Jane Smith",
                            time: "1 hour ago",
                            status: "warning",
                          },
                          {
                            type: "Check-in",
                            patient: "Robert Johnson",
                            time: "3 hours ago",
                            status: "info",
                          },
                        ].map((alert, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                alert.status === "critical"
                                  ? "bg-red-500"
                                  : alert.status === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                              }`}
                            />
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {alert.type}: {alert.patient}
                              </p>
                              <p className="text-xs text-gray-500">
                                {alert.time}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Activity</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto"
                          >
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>All Activities</DropdownMenuItem>
                          <DropdownMenuItem>
                            User Registrations
                          </DropdownMenuItem>
                          <DropdownMenuItem>Care Plans</DropdownMenuItem>
                          <DropdownMenuItem>Alerts</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Activity</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            activity: "New user registration",
                            user: "Sarah Johnson",
                            status: "Completed",
                            time: "2 hours ago",
                          },
                          {
                            activity: "Care plan updated",
                            user: "Michael Brown",
                            status: "Pending",
                            time: "3 hours ago",
                          },
                          {
                            activity: "Monthly check-up",
                            user: "Emma Wilson",
                            status: "Scheduled",
                            time: "5 hours ago",
                          },
                          {
                            activity: "Medication delivery",
                            user: "David Lee",
                            status: "In Progress",
                            time: "6 hours ago",
                          },
                          {
                            activity: "Emergency response",
                            user: "Patricia Moore",
                            status: "Resolved",
                            time: "1 day ago",
                          },
                        ].map((item, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">
                              {item.activity}
                            </TableCell>
                            <TableCell>{item.user}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  item.status === "Completed" ||
                                  item.status === "Resolved"
                                    ? "default"
                                    : item.status === "Pending" ||
                                      item.status === "Scheduled"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{item.time}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Archive</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Showing 5 of 100 activities
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>User Management</CardTitle>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <Input
                        placeholder="Search users..."
                        className="max-w-sm"
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>All Users</DropdownMenuItem>
                          <DropdownMenuItem>Sponsors</DropdownMenuItem>
                          <DropdownMenuItem>Recipients</DropdownMenuItem>
                          <DropdownMenuItem>Agents</DropdownMenuItem>
                          <DropdownMenuItem>
                            Healthcare Providers
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            name: "John Smith",
                            email: "john.smith@example.com",
                            role: "Sponsor",
                            status: "Active",
                          },
                          {
                            name: "Mary Johnson",
                            email: "mary.johnson@example.com",
                            role: "Recipient",
                            status: "Active",
                          },
                          {
                            name: "Robert Brown",
                            email: "robert.brown@example.com",
                            role: "Agent",
                            status: "Active",
                          },
                          {
                            name: "Patricia Davis",
                            email: "patricia.davis@example.com",
                            role: "Nurse",
                            status: "Inactive",
                          },
                          {
                            name: "Michael Wilson",
                            email: "michael.wilson@example.com",
                            role: "Doctor",
                            status: "Active",
                          },
                        ].map((user, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">
                              {user.name}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  user.status === "Active"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    Deactivate
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Showing 5 of 100 users
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Monitoring Tab */}
              <TabsContent value="monitoring" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Care Monitoring</CardTitle>
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Recipient</TableHead>
                          <TableHead>Assigned Agent</TableHead>
                          <TableHead>Last Check-in</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            recipient: "Mary Johnson",
                            agent: "Robert Brown",
                            lastCheckIn: "Today, 10:30 AM",
                            status: "Normal",
                          },
                          {
                            recipient: "James Wilson",
                            agent: "Sarah Davis",
                            lastCheckIn: "Today, 9:15 AM",
                            status: "Attention Needed",
                          },
                          {
                            recipient: "Patricia Moore",
                            agent: "Michael Lee",
                            lastCheckIn: "Yesterday, 4:45 PM",
                            status: "Normal",
                          },
                          {
                            recipient: "Robert Taylor",
                            agent: "Emma White",
                            lastCheckIn: "Today, 11:20 AM",
                            status: "Normal",
                          },
                          {
                            recipient: "Jennifer Garcia",
                            agent: "David Martinez",
                            lastCheckIn: "Yesterday, 2:30 PM",
                            status: "Critical",
                          },
                        ].map((item, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">
                              {item.recipient}
                            </TableCell>
                            <TableCell>{item.agent}</TableCell>
                            <TableCell>{item.lastCheckIn}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  item.status === "Normal"
                                    ? "default"
                                    : item.status === "Attention Needed"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Showing 5 of 100 recipients
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Generated Reports</CardTitle>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        New Report
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Report Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Generated</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            name: "Monthly User Activity",
                            type: "System",
                            generated: "March 1, 2024",
                            status: "Completed",
                          },
                          {
                            name: "Healthcare Provider Performance",
                            type: "Analytics",
                            generated: "February 28, 2024",
                            status: "Completed",
                          },
                          {
                            name: "Recipient Health Trends",
                            type: "Health",
                            generated: "February 25, 2024",
                            status: "Completed",
                          },
                          {
                            name: "Emergency Response Times",
                            type: "Performance",
                            generated: "February 20, 2024",
                            status: "Completed",
                          },
                          {
                            name: "Quarterly Financial Summary",
                            type: "Financial",
                            generated: "In Progress",
                            status: "Processing",
                          },
                        ].map((report, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">
                              {report.name}
                            </TableCell>
                            <TableCell>{report.type}</TableCell>
                            <TableCell>{report.generated}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  report.status === "Completed"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {report.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {report.status === "Completed" && (
                                  <Button variant="outline" size="sm">
                                    Download
                                  </Button>
                                )}
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Showing 5 of 25 reports
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

function Menu(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
