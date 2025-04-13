import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";

const Nav = async () => {
  const session = await getServerSession(options);

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center shadow-md bg-white">
      <Link className="flex items-center justify-center" href="#">
        {/* <Heart className="h-6 w-6 text-primary" /> */}
        <span className="ml-2 text-2xl font-extrabold text-primary">
          DoktaSend
        </span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:text-primary"
          href="/dashboard"
        >
          Dashboard
        </Link>
        {session ? (
          <Link
            href="api/auth/signout?callbackUrl=/"
            className="text-sm font-medium hover:text-primary"
          >
            Logout
          </Link>
        ) : (
          <Link
            href="api/auth/signin"
            className="text-sm font-medium hover:text-primary"
          >
            Login
          </Link>
        )}
        {/* <Button variant="default" size="sm" className="shadow-md hover:bg-secondary-foreground hover:text-secondary" onClick={() => router.push('/CreateUser')}>
          Sign Up
        </Button> */}
      </nav>
    </header>
  );
};

export default Nav;
