// app/video/[slug]/page.tsx
import { SingleChannel } from "@/cosmic/blocks/videos/SingleChannel";
export default async function SingleVideoPage({
  params,
}: {
  params: { slug: string };
}) {
  return <SingleChannel query={{ slug: params.slug, type: "channels" }} />;
}
