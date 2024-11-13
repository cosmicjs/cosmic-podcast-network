"use server";

import { cosmic } from "@/cosmic/client";

export type AddCommentType = {
  type: "comments";
  title: string;
  metadata: {
    email: string;
    comment: string;
    resource: string;
    user: string;
    approved: boolean;
  };
};

export async function addComment(comment: AddCommentType) {
  const data = await cosmic.objects.insertOne(comment);
  return data;
}

export async function getComments(
  query: any,
  sort?: string,
  limit?: number,
  skip?: number,
  status?: "draft" | "published" | "any"
) {
  try {
    const { objects } = await cosmic.objects
      .find(query)
      .props(
        `{
          title
          slug
          metadata {
            comment
            email
            resource
            user
            approved
          }
          created_at
        }`
      )
      .depth(1)
      .sort(sort ? sort : "-created_at")
      .limit(limit ? limit : 100)
      .skip(skip ? skip : 0)
      .status(status ? status : "published");
    return objects;
  } catch (err) {
    console.error("Error fetching comments:", err);
    return [];
  }
}
