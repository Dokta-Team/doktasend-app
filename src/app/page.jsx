import { redirect } from "next/navigation";

export default function HomePageRedirect() {
  redirect("/dashboard");
  return null;
}
