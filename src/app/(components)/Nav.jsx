'use client';
import Link from "next/link";
import { useAuthContext } from "@/context/authContext"; // ✅ not async
import { useRouter } from "next/navigation";

const Nav = () => {
  // const user = await getCurrentUser();
  const { getSavedUser } = useAuthContext();
  const user = {}
  const router = useRouter();
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center shadow-md bg-white">
      <Link className="flex items-center justify-center" href="/">
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
        {user ? (
          // <Link
          //   href="/auth/login"
          //   className="text-sm font-medium hover:text-primary"
          // >
          //   Logout
          // </Link>
          <button
            className="text-sm font-medium hover:text-primary"
            onClick={() => {
              // You can also make an API call to log out
              localStorage.removeItem("user");
              // router.push("/auth/login");
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="text-sm font-medium hover:text-primary"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Nav;
