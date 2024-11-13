"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/cosmic/blocks/user-management/AuthContext";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/cosmic/elements/Button";
import { Input } from "@/cosmic/elements/Input";
import { Label } from "@/cosmic/elements/Label";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit?: (data: FormData) => Promise<any>;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);

      if (onSubmit) {
        const result = await onSubmit(formData);

        if (result.error) {
          setError(result.error);
          return;
        }

        if (type === "login" && result.user) {
          authLogin(result.user);
          router.push("/dashboard");
          router.refresh();
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-6">
      <h1 className="text-center text-2xl font-bold">
        {type === "login" ? "Login" : "Sign Up"}
      </h1>

      {type === "signup" && (
        <>
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              required
              placeholder="Enter your first name"
              autoFocus={type === "signup"}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              required
              placeholder="Enter your last name"
            />
          </div>
        </>
      )}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email address"
          autoFocus={type === "login"}
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          placeholder="Enter your password"
        />
        {type === "signup" ? (
          <p className="mt-1 text-sm text-gray-500">
            Password must be at least 8 characters long and contain both letters
            and numbers
          </p>
        ) : (
          <Link
            href="/forgot-password"
            className="mt-1 inline-block text-sm text-teal-500"
          >
            Forgot your password?
          </Link>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : type === "login" ? (
          "Login"
        ) : (
          "Sign Up"
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm">
        {type === "login" ? (
          <>
            <div className="flex items-center gap-2">
              Don&apos;t have an account?
              <Link href="/signup" className="text-teal-500">
                Sign up
              </Link>
            </div>
          </>
        ) : (
          <>
            Already have an account?
            <Link href="/login" className="text-teal-500">
              Login
            </Link>
          </>
        )}
      </div>
    </form>
  );
}
