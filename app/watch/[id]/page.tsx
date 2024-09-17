// app/watch/[id]/page.tsx
import { SingleVideo } from "@/cosmic/blocks/videos/SingleVideo";
import { Loader } from "@/components/Loader";
import { Suspense } from "react";
import { cosmic } from "@/cosmic/client";

export const revalidate = 3600;

export default async function SingleVideoPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<Loader />}>
      <SingleVideo query={{ id: params.id.split("-")[0], type: "videos" }} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  const { objects: videos } = await cosmic.objects
    .find({ type: "videos" })
    .props("id")
    .limit(100)
    .depth(0);
  return videos.map((video: { id: string }) => ({
    id: video.id,
  }));
}
