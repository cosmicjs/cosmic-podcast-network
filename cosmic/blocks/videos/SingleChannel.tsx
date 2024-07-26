/* eslint-disable @next/next/no-img-element */
// app/video/[slug]/page.tsx
import { cosmic } from "@/cosmic/client";
import { notFound } from "next/navigation";
import { VideoList } from "@/cosmic/blocks/videos/VideoList";

export async function SingleChannel({
  query,
  className,
  status,
}: {
  query: any;
  className?: string;
  status?: "draft" | "published" | "any";
}) {
  try {
    const { object: channel } = await cosmic.objects
      .findOne(query)
      .props("id,slug,title,metadata,created_at")
      .depth(1)
      .status(status ? status : "published");
    return (
      <div className={className}>
        <div className="mb-6 w-full max-h-[400px] overflow-hidden">
          <img
            src={`${channel.metadata.backsplash.imgix_url}?w=2000&auto=format,compression`}
            alt={channel.title}
            className="aspect-video w-full object-cover"
          />
        </div>
        <section className="px-8 mb-10 max-w-[1650px] m-auto">
          <div className="flex items-center mb-4 gap-3">
            <img
              alt={channel.title}
              src={`${channel.metadata.thumbnail.imgix_url}?w=400&auto=format,compression`}
              className="h-[50px] w-[50px] rounded-full object-cover"
            />
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
              {channel.title}
            </h1>
          </div>
          <div
            className="space-y-4 text-zinc-700 dark:text-zinc-300"
            dangerouslySetInnerHTML={{ __html: channel.metadata.description }}
          />
        </section>
        <section className="px-8 mb-10 max-w-[1650px] m-auto">
          <h2 className="mb-4 text-2xl font-extrabold leading-tight tracking-tighter text-black dark:text-white">
            Videos
          </h2>
          <VideoList
            query={{ type: "videos", "metadata.channel": channel.id }}
            sort="-created_at"
            limit={10}
            skip={0}
            className="m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          />
        </section>
      </div>
    );
  } catch (e: any) {
    if (e.status === 404) return notFound();
  }
}
