// app/login/page.tsx
import LoginClient from "@/cosmic/blocks/user-management/LoginClient";
import { login } from "@/cosmic/blocks/user-management/actions";

export default function LoginPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <LoginClient onSubmit={login} />
    </div>
  );
}
