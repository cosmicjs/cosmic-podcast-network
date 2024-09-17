// app/watch/[id]/page.tsx
import { SingleVideo } from "@/cosmic/blocks/videos/SingleVideo";
import { Loader } from "@/components/Loader";
import { Suspense } from "react";

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
