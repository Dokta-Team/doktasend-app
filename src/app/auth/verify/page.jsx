"use client";
import { Suspense } from 'react'
import { Spinner } from "@/app/(components)/spinner";
import VerificationContent from "./verifcationPage";

export default function VerificationPage() {

    return (
        <Suspense fallback={<Spinner />}>
            <VerificationContent />
        </Suspense>
    );
}
