"use client";
import { useAuth } from "@/cosmic/blocks/user-management/AuthContext";
import AuthForm from "@/cosmic/blocks/user-management/AuthForm";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginClient({
  onSubmit,
  redirect,
}: {
  onSubmit: any;
  redirect: string;
}) {
  const { user, isLoading, login: authLogin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const error = searchParams.get("error");

  useEffect(() => {
    if (!isLoading && user) {
      router.push(redirect);
    }
  }, [user, isLoading, router, redirect]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <>
      {success && (
        <div className="mx-auto mt-4 max-w-md rounded-md bg-green-100 p-4 text-green-700">
          {success}
        </div>
      )}
      {error && (
        <div className="mx-auto mt-4 max-w-md rounded-md bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}
      <AuthForm
        type="login"
        onSubmit={async (formData) => {
          const result = await onSubmit(formData);
          if (result.error) {
            router.push(`/login?error=${encodeURIComponent(result.error)}`);
          } else if (result.user) {
            authLogin(result.user);
          }
        }}
      />
    </>
  );
}
