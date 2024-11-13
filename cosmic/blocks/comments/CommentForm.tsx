// components/comment-form.tsx
"use client";

import { useState } from "react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { cn } from "@/cosmic/utils";
import { useAuth } from "@/cosmic/blocks/user-management/AuthContext";
import { useRouter } from "next/navigation";

import { Button } from "@/cosmic/elements/Button";
import { Label } from "@/cosmic/elements/Label";
import { Textarea } from "@/cosmic/elements/TextArea";
import { addComment, AddCommentType } from "@/cosmic/blocks/comments/actions";

export function CommentForm({
  resourceId,
  className,
}: {
  resourceId: string;
  className?: string;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmitComment(e: React.SyntheticEvent) {
    e.preventDefault();
    setError(false);
    setSubmitting(true);

    if (!comment.trim() || !user) {
      setSubmitting(false);
      setError(true);
      return;
    }

    const newComment: AddCommentType = {
      type: "comments",
      title: user.name,
      metadata: {
        email: user.email,
        comment,
        resource: resourceId,
        user: user.id,
        approved: true,
      },
    };

    try {
      const res = await addComment(newComment);
      if (!res) {
        setSubmitting(false);
        setError(true);
        return;
      }
      router.refresh();
      setSubmitting(false);
      setSubmitted(true);
      setComment("");
    } catch (err) {
      console.error("Comment submission error:", err);
      setSubmitting(false);
      setError(true);
      return;
    }
  }

  function handleChangeComment(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setComment(target.value);
  }

  if (!user) {
    return (
      <div className={cn("mb-8", className)}>
        <p className="text-gray-600 dark:text-gray-400">
          Please{" "}
          <a href="/login" className="text-teal-500">
            login
          </a>{" "}
          to leave a comment.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("mb-8", className)}>
      {error && (
        <div className="mb-4 flex rounded-xl border border-red-500 p-8">
          <XCircle className="shrink-0 relative top-1 mr-4 h-4 w-4 text-red-500" />
          There was an error with your request. Please try again.
        </div>
      )}
      {submitted && (
        <div>
          <div className="flex items-center mb-4 text-green-500">
            <CheckCircle className="shrink-0 mr-2 h-4 w-4" />
            <span>Comment added successfully!</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmitComment}>
        <div className="mb-4">
          <Label>Commenting as {user.name}</Label>
        </div>
        <div className="mb-4">
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            id="comment"
            placeholder="Write your comment..."
            onChange={handleChangeComment}
            value={comment}
            required
          />
        </div>
        <div>
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              `Submit`
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
