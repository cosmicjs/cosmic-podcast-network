"use server";

import { cosmic } from "@/cosmic/client";

export type AddCommentType = {
  type: "comments";
  title: string;
  metadata: {
    email: string;
    comment: string;
    resource: string;
  };
};

export async function addComment(comment: AddCommentType) {
  const data = await cosmic.objects.insertOne(comment);
  return data;
}
