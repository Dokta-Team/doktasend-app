"use client"
import Link from "next/link"
import { Check, Heart, Clock, Hospital, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col">
        {/* <header className="px-4 lg:px-6 h-16 flex items-center">
        <nav>
          <Button variant="default" size="sm" onClick={() => router.push('/CreateUser')}> 
        Sign Up
      </Button>
      </nav>
      </header> */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Care for Your Loved Ones, <span className="text-primary">From Anywhere</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Comprehensive healthcare monitoring and support system connecting diaspora with their local relatives.
                  Professional care, daily monitoring, and peace of mind.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="bg-primary text-white shadow-md hover:bg-primary-dark">Get Started</Button>
                <Button variant="outline" size="lg" className="shadow-md hover:bg-gray-100">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Comprehensive Care Solutions</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to ensure your loved ones receive the best care
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-none">
                <CardHeader>
                  <Clock className="w-8 h-8 text-primary" />
                  <CardTitle className="text-lg font-semibold">24/7 Monitoring</CardTitle>
                  <CardDescription className="text-sm text-gray-500">Daily check-ins and weekly calls from dedicated care agents</CardDescription>
                </CardHeader>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-none">
                <CardHeader>
                  <Hospital className="w-8 h-8 text-primary" />
                  <CardTitle className="text-lg font-semibold">Professional Network</CardTitle>
                  <CardDescription className="text-sm text-gray-500">Access to qualified healthcare providers, pharmacies, and labs</CardDescription>
                </CardHeader>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-none">
                <CardHeader>
                  <Activity className="w-8 h-8 text-primary" />
                  <CardTitle className="text-lg font-semibold">Health Tracking</CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">Detailed reporting and real-time health status updates</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="packages" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Choose Your Care Package</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Flexible plans designed to meet your specific needs
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  title: "GOLD",
                  price: "FREE",
                  features: [
                    "Daily check-ins via chat",
                    "Weekly calls",
                    "Basic weekly reporting",
                    "24/7 virtual consultations",
                  ],
                },
                {
                  title: "DIAMOND",
                  price: "$XX/month",
                  features: [
                    "All Basic features",
                    "Monthly medical visits",
                    "Prescription management",
                    "Lab testing services",
                  ],
                },
                {
                  title: "PLATINUM",
                  price: "$XX/month",
                  features: ["All Standard features", "Emergency services", "Year-round insurance", "Priority support"],
                },
              ].map((pkg) => (
                <Card key={pkg.title} className="flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{pkg.title}</CardTitle>
                    <CardDescription className="text-2xl font-bold">{pkg.price}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button className="w-full shadow-md hover:bg-primary-dark">Choose Plan</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Simple steps to get started with DoktaSend
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Sign Up",
                  description: "Create your account and choose a care package",
                },
                {
                  step: "2",
                  title: "Register Recipient",
                  description: "Provide details about your loved one",
                },
                {
                  step: "3",
                  title: "Care Assignment",
                  description: "We assign a dedicated care agent",
                },
                {
                  step: "4",
                  title: "Begin Monitoring",
                  description: "Start receiving updates and reports",
                },
              ].map((step) => (
                <div key={step.step} className="flex flex-col items-center space-y-2 text-center shadow-md hover:shadow-lg transition-shadow duration-300 rounded-md p-4 border border-gray-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-lg">{step.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Join thousands of families providing the best care for their loved ones
                </p>
              </div>
              <div className="space-x-4">
                <Button variant="secondary" size="lg" onClick={() => router.push('/CreateUser')}>
                  Sign Up Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-white hover:bg-white hover:text-primary"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 DoktaSend. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
