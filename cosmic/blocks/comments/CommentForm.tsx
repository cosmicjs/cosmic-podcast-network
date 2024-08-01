// components/comment-form.tsx
"use client";

import { useState } from "react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { cn } from "@/cosmic/utils";

import { Button } from "@/cosmic/elements/Button";
import { Input } from "@/cosmic/elements/Input";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sumbitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  async function handleSubmitComment(e: React.SyntheticEvent) {
    setError(false);
    setSubmitting(true);
    if (!name.trim() || !email.trim() || !comment.trim()) {
      setSubmitting(false);
      setError(true);
      return;
    }
    const newComment: AddCommentType = {
      type: "comments",
      title: name,
      metadata: {
        email,
        comment,
        resource: resourceId, // Add resource id here such as blog post or product id
      },
    };
    try {
      const res = await addComment(newComment);
      if (!res.object) {
        setSubmitting(false);
        setError(true);
        return;
      }
    } catch (err) {
      setSubmitting(false);
      setError(true);
      return;
    }
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setComment("");
    }, 3000);
  }
  function handleChangeName(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setName(target.value);
  }
  function handleChangeEmail(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
  }
  function handleChangeComment(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setComment(target.value);
  }
  return (
    <div className={cn("mb-8", className)}>
      {error && (
        <div className="mb-4 flex rounded-xl border border-red-500 p-8">
          <XCircle className="shrink-0 relative top-1 mr-4 h-4 w-4 text-red-500" />
          There was an error with your request. Make sure all fields are valid.
        </div>
      )}
      {sumbitted ? (
        <div className="flex rounded-xl border border-green-500 p-8">
          <CheckCircle className="shrink-0 relative top-1 mr-4 h-4 w-4 text-green-500" />
          Comment submitted for approval.
        </div>
      ) : (
        <>
          <div className="mb-4">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              placeholder="Name"
              onChange={handleChangeName}
              value={name}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Your email</Label>
            <Input
              id="email"
              placeholder="Email"
              onChange={handleChangeEmail}
              value={email}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              placeholder="Comment"
              onChange={handleChangeComment}
              value={comment}
            />
          </div>
          <div>
            <Button
              onClick={handleSubmitComment}
              type="submit"
              disabled={submitting}
            >
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
        </>
      )}
    </div>
  );
}
