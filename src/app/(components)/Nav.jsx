import Link from "next/link";

const Nav = async () => {
  // const user = await getCurrentUser();
  const user = {}

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
          <Link
            href="/auth/login"
            className="text-sm font-medium hover:text-primary"
          >
            Logout
          </Link>
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
