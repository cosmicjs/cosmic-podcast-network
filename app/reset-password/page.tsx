// app/reset-password/page.tsx
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/cosmic/blocks/user-management/ResetPasswordForm";
import { resetPassword } from "@/cosmic/blocks/user-management/actions";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const resolvedParams = await searchParams;
  const token = resolvedParams.token;

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <ResetPasswordForm token={token} onSubmit={resetPassword} />
    </div>
  );
}
