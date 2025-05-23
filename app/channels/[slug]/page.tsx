// app/channels/[slug]/page.tsx
import { SingleChannel } from "@/cosmic/blocks/videos/SingleChannel";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { cosmic } from "@/cosmic/client";

export const revalidate = 60;

export async function generateStaticParams() {
  const { objects: channels } = await cosmic.objects.find({
    type: "channels",
  });
  return channels.map((channel: { slug: string }) => ({
    slug: channel.slug,
  }));
}

export default async function SingleVideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  return (
    <Suspense fallback={<Loader />}>
      <SingleChannel query={{ slug: resolvedParams.slug, type: "channels" }} />
    </Suspense>
  );
}
