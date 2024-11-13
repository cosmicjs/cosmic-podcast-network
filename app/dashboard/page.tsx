// app/dashboard/page.tsx
import { Suspense } from "react";
import DashboardClient from "@/cosmic/blocks/user-management/DashboardClient";
import { Loader } from "@/components/Loader";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Suspense fallback={<Loader />}>
        <DashboardClient />
      </Suspense>
    </div>
  );
}
