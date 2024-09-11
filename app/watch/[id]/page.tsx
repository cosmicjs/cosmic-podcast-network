// app/watch/[id]/page.tsx
import { SingleVideo } from "@/cosmic/blocks/videos/SingleVideo";
import { Loader } from "@/components/Loader";
import { Suspense } from "react";

export default async function SingleVideoPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <SingleVideo query={{ id: params.id.split("-")[0], type: "videos" }} />
  );
}
