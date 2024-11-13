// app/login/page.tsx
import { Suspense } from "react";
import LoginClient from "@/cosmic/blocks/user-management/LoginClient";
import { login } from "@/cosmic/blocks/user-management/actions";
import { Loader } from "@/components/Loader";

export default function LoginPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Suspense fallback={<Loader />}>
        <LoginClient onSubmit={login} />
      </Suspense>
    </div>
  );
}
