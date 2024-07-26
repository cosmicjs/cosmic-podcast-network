/* eslint-disable @next/next/no-img-element */
// app/page.tsx
import { VideoList } from "@/cosmic/blocks/videos/VideoList";
import { CategoriesList } from "@/cosmic/blocks/videos/CategoriesList";
import { cosmic } from "@/cosmic/client";
import Link from "next/link";

export default async function Home() {
  const { objects: channels } = await cosmic.objects
    .find({
      type: "channels",
    })
    .props("id,slug,title,metadata")
    .depth(1);
  return (
    <div className="p-4 md:p-8 pt-4">
      <CategoriesList
        query={{ type: "categories" }}
        sort="-created_at"
        limit={10}
        skip={0}
        className="mb-8 m-auto flex flex-wrap gap-2"
      />
      <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
        Today{`'`}s Video Picks
      </h1>
      <VideoList
        query={{ type: "videos" }}
        limit={10}
        skip={0}
        className="m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20"
      />
      <h2 className="mb-8 text-2xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
        Featured Channels
      </h2>
      <div className="flex flex-wrap gap-4">
        {channels?.map((channel: any) => {
          return (
            <Link
              key={channel.id}
              href={`/channels/${channel.slug}`}
              className="rounded-xl flex p-4 px-6 gap-4 items-center bg-gray-200 dark:bg-gray-900"
            >
              <div
                className="flex items-center justify-center overflow-hidden 
            rounded-full bg-gray-200 dark:bg-gray-800"
              >
                <img
                  alt={channel.title}
                  src={`${channel.metadata.thumbnail.imgix_url}?w=400&auto=format,compression`}
                  className="h-[40px] w-[40px] rounded-full object-cover"
                />
              </div>
              <div>
                <span className="font-semibold">{channel.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
