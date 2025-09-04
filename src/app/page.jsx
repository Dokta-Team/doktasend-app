import { redirect } from "next/navigation";

export default function HomePageRedirect() {
  redirect("/dashboard");
  return null;
}

// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// const DOKTA_ACCESS_TOKEN = process.env.DOKTA_ACCESS_TOKEN
// export default function HomePageRedirect() {
//   const router = useRouter();
//   useEffect(() => {
//     const token = localStorage.getItem(DOKTA_ACCESS_TOKEN|| "DOKTA_ACCESS_TOKEN");
//     if (token) {
//       router.replace("/dashboard"); // Token exists → redirect to dashboard
//     } else {
//       router.replace("/auth/login"); // No token → redirect to login
//     }
//   }, [router]);
//   return null;
// }
