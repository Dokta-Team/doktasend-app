"use client";
import { Suspense } from "react";
import ConfirmationPage from "./confirmationPage";

const ConfirmationContent = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationPage />
    </Suspense>
  );
};

export default ConfirmationContent;
