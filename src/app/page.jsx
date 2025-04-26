import { redirect } from "next/navigation";

const HomePageRedirect = async () => {
  redirect("/api/auth/signin");
};

export default HomePageRedirect;
