// app/watch/[id]/page.tsx
import { SingleVideo } from "@/cosmic/blocks/videos/SingleVideo";
import { Loader } from "@/components/Loader";
import { Suspense } from "react";
import { cosmic } from "@/cosmic/client";

export const revalidate = 60;

export async function generateStaticParams() {
  const { objects: videos } = await cosmic.objects.find({
    type: "videos",
  });
  return videos.map((video: { id: string }) => ({
    id: video.id,
  }));
}

export default async function SingleVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <Suspense fallback={<Loader />}>
      <SingleVideo
        query={{ id: resolvedParams.id.split("-")[0], type: "videos" }}
      />
    </Suspense>
  );
}
