// app/auth/register/page.js

'use client';
export const dynamic = 'force-dynamic'; // Prevent Next.js from prerendering this page

import { Suspense } from "react";
import RegisterContent from "./registerationPage";
import { Spinner } from "@/app/(components)/spinner";

export default function RegisterPage() {


  return (
    <Suspense fallback={<Spinner />}>
      <RegisterContent />
    </Suspense>
  );
}
