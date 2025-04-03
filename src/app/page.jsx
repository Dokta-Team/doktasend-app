import { redirect } from "next/navigation";

const HomePageRedirect = async () => {
  redirect("/dashboard");
};

export default HomePageRedirect;
