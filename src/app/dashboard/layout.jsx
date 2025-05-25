import { getCurrentUser } from "@/lib/server-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }
  return <>{children}</>;
}
