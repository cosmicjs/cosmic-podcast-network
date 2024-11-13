// app/signup/page.tsx
import SignUpClient from "@/cosmic/blocks/user-management/SignUpClient";
import { signUp } from "@/cosmic/blocks/user-management/actions";

export default function SignUpPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SignUpClient onSubmit={signUp} />
    </div>
  );
}
