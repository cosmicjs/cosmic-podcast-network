/* eslint-disable @next/next/no-img-element */
// app/video/[slug]/page.tsx
import { cosmic } from "@/cosmic/client";
import { notFound } from "next/navigation";
import { getFormattedDate } from "@/cosmic/utils";
import { VideoType } from "./VideoCard";
import { PlayArea } from "./PlayArea";
import Link from "next/link";
import { CategoryPill, CategoryType } from "./CategoryPill";

export async function SingleVideo({
  query,
  className,
  status,
}: {
  query: any;
  className?: string;
  status?: "draft" | "published" | "any";
}) {
  try {
    const { object: video }: { object: VideoType } = await cosmic.objects
      .findOne(query)
      .props("id,slug,title,metadata,created_at")
      .depth(1)
      .status(status ? status : "published");

    const date = getFormattedDate(video.created_at);

    return (
      <div className={className}>
        <div className="w-full">
          <PlayArea video={video} />
        </div>
        <section className="m-auto grid items-center pb-8 md:container p-4 pt-8">
          <div className="relative m-auto flex w-full md:w-[750px] flex-col items-start gap-2">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
              {video.title}
            </h1>
            <div className="mb-8 md:flex">
              <Link
                href={`/channels/${video.metadata.channel.slug}`}
                className="flex items-center gap-3"
              >
                <img
                  className="mr-2 h-[60px] w-[60px] rounded-full object-cover"
                  src={`${video.metadata.channel.metadata.thumbnail.imgix_url}?w=120&auto=format,compression`}
                  alt={video.metadata.channel.title}
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {video.metadata.channel.title}
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {date}
                  </span>
                </div>
              </Link>
              <div className="md:absolute md:right-0">
                {video.metadata.categories.map((category: CategoryType) => {
                  return <CategoryPill key={category.id} category={category} />;
                })}
              </div>
            </div>
            <div
              className="space-y-4 text-zinc-700 dark:text-zinc-300"
              dangerouslySetInnerHTML={{ __html: video.metadata.description }}
            />
          </div>
        </section>
      </div>
    );
  } catch (e: any) {
    if (e.status === 404) return notFound();
  }
}
