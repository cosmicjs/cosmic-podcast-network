// app/channels/[slug]/page.tsx
import { SingleChannel } from "@/cosmic/blocks/videos/SingleChannel";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

export const revalidate = 3600;

export default async function SingleVideoPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <Suspense fallback={<Loader />}>
      <SingleChannel query={{ slug: params.slug, type: "channels" }} />
    </Suspense>
  );
}
