'use client';
import Link from "next/link";
import { useAuthContext } from "../../context/authContext"; // ✅ not async
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Nav = () => {
  // const user = await getCurrentUser();
  const { user, logout } = useAuthContext();

  const router = useRouter();
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center shadow-md bg-white">
      <Link className="flex items-center justify-center" href="/">
        <span className="ml-2 text-2xl font-extrabold text-primary">
          <img width={100}  src="data:image/webp;base64,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"/>
        </span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {user && user?.firstName && <Link
          className="text-sm font-medium hover:text-primary"
          href="/dashboard"
        >
          Dashboard
        </Link>}
        {user && user?.firstName || user?.first_name ? (
          // <Link
          //   href="/auth/login"
          //   className="text-sm font-medium hover:text-primary"
          // >
          //   Logout
          // </Link>
          <button
            className="text-sm font-medium hover:text-primary"
            onClick={logout}
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
