// app/verify/page.tsx
"use client";

import { Suspense } from "react";
import VerifyClient from "@/cosmic/blocks/user-management/VerifyClient";
import { Loader } from "@/components/Loader";

export default function VerifyPage() {
  return (
    <Suspense fallback={<Loader />}>
      <VerifyClient />
    </Suspense>
  );
}
