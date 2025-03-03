import Link from "next/link"
import Image from "next/image"
import { Heart, Users, Globe, Shield, Award, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Heart className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">DoktaSend</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#packages">
            Packages
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
            About
          </Link>
          <Button variant="default" size="sm">
            Sign Up
          </Button>
        </nav>
      </header> */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  About <span className="text-primary">DoktaSend</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Bridging distances with care, connecting families through healthcare
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Mission</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Connecting Diaspora With Their Loved Ones Through Quality Healthcare
                </h2>
                <p className="text-gray-500 md:text-xl dark:text-gray-400">
                  At DoktaSend, our mission is to bridge the gap between diaspora communities and their loved ones back
                  home through comprehensive healthcare monitoring and support.
                </p>
                <p className="text-gray-500 md:text-xl dark:text-gray-400">
                  We believe that distance should never be a barrier to ensuring the health and wellbeing of family
                  members. Through our innovative platform, we provide peace of mind to those living abroad while
                  delivering quality care to their relatives locally.
                </p>
                <p className="text-gray-500 md:text-xl dark:text-gray-400">
                  Our commitment is to create a seamless connection that transcends borders, making healthcare
                  accessible, transparent, and reliable for all.
                </p>
              </div>
              {/* <div className="relative h-[400px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/WhatsApp.jpg"
                  alt="Healthcare professional with patient"
                  fill
                  className="object-cover"
                />
              </div> */}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 shadow-lg">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Story</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Born From Personal Experience</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The journey of DoktaSend began with a personal challenge faced by our founder
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-12 space-y-8">
              <div className="relative pl-8 border-l-2 border-primary">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-bold">The Beginning</h3>
                <p className="mt-2 text-gray-500">
                  Living abroad while trying to manage healthcare for aging parents back home, our founder experienced
                  firsthand the challenges of distance caregiving. The worry, the lack of information, and the
                  difficulty in coordinating care inspired the creation of DoktaSend.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-primary">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-bold">Building the Solution</h3>
                <p className="mt-2 text-gray-500">
                  We assembled a team of healthcare professionals, technology experts, and diaspora members to create a
                  comprehensive platform that addresses the unique challenges faced by families separated by distance.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-primary">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-bold">Today</h3>
                <p className="mt-2 text-gray-500">
                  Today, DoktaSend serves thousands of families across the globe, providing peace of mind to diaspora
                  members and quality care to their loved ones. Our network of healthcare providers, pharmacies, and
                  laboratories continues to grow, ensuring comprehensive coverage and support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Values</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">The Principles That Guide Us</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  At the core of everything we do are these fundamental values
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card className="flex flex-col items-center text-center shadow-md">
                <CardHeader>
                  <Users className="h-12 w-12 text-primary" />
                  <CardTitle>Compassion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    We approach every interaction with empathy and understanding, recognizing the emotional aspects of
                    distance caregiving.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex flex-col items-center text-center shadow-md">
                <CardHeader>
                  <Shield className="h-12 w-12 text-primary" />
                  <CardTitle>Trust</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    We build relationships based on reliability, transparency, and consistent delivery of our promises.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex flex-col items-center text-center shadow-md">
                <CardHeader>
                  <Award className="h-12 w-12 text-primary" />
                  <CardTitle>Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    We strive for the highest standards in healthcare delivery, technology, and customer service.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex flex-col items-center text-center shadow-md">
                <CardHeader>
                  <Globe className="h-12 w-12 text-primary" />
                  <CardTitle>Connection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    We believe in the power of human connection and work to strengthen bonds across distances.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Team</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">The People Behind DoktaSend</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A dedicated team of healthcare professionals, technology experts, and customer care specialists
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-4">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full">
                    <Image
                      src={`/placeholder.svg?height=160&width=160&text=Team Member ${i}`}
                      alt={`Team Member ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Team Member {i}</h3>
                    <p className="text-sm text-gray-500">Position Title</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section *
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Impact</h2>
                <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                  Making a difference in the lives of families across the globe
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              {[
                { number: "5,000+", label: "Families Served" },
                { number: "200+", label: "Healthcare Providers" },
                { number: "15+", label: "Countries Reached" },
                { number: "98%", label: "Satisfaction Rate" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center space-y-2 text-center">
                  <div className="text-4xl font-bold">{stat.number}</div>
                  <p className="text-primary-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section *
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Real stories from diaspora members and their loved ones
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "DoktaSend has given me peace of mind knowing my mother is receiving regular care and monitoring. The weekly reports are detailed and help me stay connected despite being thousands of miles away.",
                  name: "Sarah K.",
                  location: "UK Diaspora",
                },
                {
                  quote:
                    "The care agents are professional and compassionate. My father looks forward to their visits and calls. It's made a significant difference in his health management.",
                  name: "Michael O.",
                  location: "US Diaspora",
                },
                {
                  quote:
                    "As someone living abroad, I was constantly worried about my parents' health. DoktaSend has removed that anxiety with their comprehensive monitoring and quick response to any concerns.",
                  name: "Priya M.",
                  location: "Canada Diaspora",
                },
              ].map((testimonial, i) => (
                <Card key={i} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#0891b2"
                          stroke="none"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="italic text-gray-500">{testimonial.quote}</p>
                    <div className="mt-4">
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join the DoktaSend Family</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Start providing comprehensive care for your loved ones today
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
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
