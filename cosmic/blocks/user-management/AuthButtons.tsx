"use client";

import { useAuth } from "@/cosmic/blocks/user-management/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const buttonStyles =
  "group inline-flex h-10 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-100 data-[state=open]:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:data-[state=active]:bg-zinc-900 dark:data-[state=open]:bg-zinc-900 md:w-max";

export function AuthButtons() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return (
      <button onClick={() => router.push("/login")} className={buttonStyles}>
        Login
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/dashboard" className={buttonStyles}>
        Dashboard
      </Link>
      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className={buttonStyles}
      >
        Logout
      </button>
    </div>
  );
}
