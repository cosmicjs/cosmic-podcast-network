/* eslint-disable @next/next/no-img-element */
// components/comments.tsx
import { UserRound } from "lucide-react";
import { CommentForm } from "./CommentForm";
import { getComments } from "./actions";

type Comment = {
  title: string;
  slug: string;
  metadata: {
    comment: string;
    user: {
      title: string;
      metadata: {
        avatar: {
          imgix_url: string;
        };
      };
    };
  };
  created_at: string;
};

function Comment({
  comment,
  className,
}: {
  comment: Comment;
  className?: string;
}) {
  const date = new Date(comment.created_at).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <div
      className={`mb-6 flex flex-col rounded-xl border border-zinc-300 p-4 pb-6 dark:border-zinc-700 ${className}`}
    >
      <div className="mb-4 flex w-full flex-col justify-between gap-2 text-gray-500 dark:text-gray-200 sm:flex-row md:items-center">
        <div className="flex items-center gap-2 text-black dark:text-white">
          {comment.metadata.user?.metadata?.avatar?.imgix_url ? (
            <img
              src={comment.metadata.user.metadata.avatar.imgix_url}
              alt={comment.metadata.user.title}
              className="h-6 w-6 rounded-full object-cover"
            />
          ) : (
            <UserRound className="h-4 w-4" />
          )}
          <div className="text-lg">
            {comment.metadata.user
              ? comment.metadata.user.title
              : comment.title}
          </div>
        </div>
        <div className="text-xs">{date}</div>
      </div>
      <div className="pr-6 text-zinc-700 dark:text-zinc-300">
        {comment.metadata.comment}
      </div>
    </div>
  );
}

export async function Comments({
  query,
  sort,
  limit,
  skip,
  className,
  status,
}: {
  query: any;
  sort?: string;
  limit?: number;
  skip?: number;
  className?: string;
  status?: "draft" | "published" | "any";
}) {
  const comments = await getComments(query, sort, limit, skip, status);
  const resourceId = query["metadata.resource"];

  return (
    <div className={`m-auto w-full max-w-[750px] md:p-0 p-4 ${className}`}>
      <h2 className="mb-4 text-2xl">Comments</h2>
      {comments.map((comment: Comment) => {
        return <Comment comment={comment} key={comment.slug} />;
      })}
      <CommentForm resourceId={resourceId} />
    </div>
  );
}
