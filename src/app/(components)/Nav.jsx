import Link from "next/link"
import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"
import { Button } from "@/components/ui/button"

const Nav = async () => {
  const session = await getServerSession(options)
  return (
     <header className="px-4 lg:px-6 h-16 flex items-center">
            <Link className="flex items-center justify-center" href="#">
              {/* <Heart className="h-6 w-6 text-primary" /> */}
              <span className="ml-2 text-xl font-bold">DoktaSend</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
                Features
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#packages">
                Packages
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
                How It Works
              </Link>
              <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">Home</Link>
              {session ? 
                (<Link href="api/auth/signout?callbackUrl=/" className="text-sm font-medium hover:underline underline-offset-4">Logout</Link>)
                :(
                  <Link href="api/auth/signin" className="text-sm font-medium hover:underline underline-offset-4">Login</Link>
                )}
              <Button variant="default" size="sm" href="/CreateUser">
                Sign Up
              </Button>
            </nav>
          </header>
  )
}

export default Nav