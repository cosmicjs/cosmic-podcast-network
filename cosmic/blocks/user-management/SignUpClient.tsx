"use client"
import { useAuth } from "@/cosmic/blocks/user-management/AuthContext"
import AuthForm from "@/cosmic/blocks/user-management/AuthForm"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function SignUpClient({ onSubmit }: { onSubmit: any }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isSignupComplete, setIsSignupComplete] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (isSignupComplete) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
        <h2 className="mb-4 text-2xl font-semibold">Check your email</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          We've sent you a verification link. Please check your email to
          complete the signup process.
        </p>
        <Link href="/login" className="text-blue-600">
          Go to login
        </Link>
      </div>
    )
  }

  const handleSubmit = async (formData: FormData) => {
    setError("")
    const result = await onSubmit(formData)

    if (result.error) {
      setError(result.error)
      return result
    }

    if (result.success) {
      setIsSignupComplete(true)
    }

    return result
  }

  return (
    <>
      {error && (
        <div className="mx-auto mt-4 max-w-md rounded-md bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}
      <AuthForm type="signup" onSubmit={handleSubmit} />
    </>
  )
}
