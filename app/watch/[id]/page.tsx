// app/watch/[slug]/page.tsx
import { SingleVideo } from "@/cosmic/blocks/videos/SingleVideo";
export default async function SingleVideoPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <SingleVideo query={{ id: params.id.split("-")[0], type: "videos" }} />
  );
}
