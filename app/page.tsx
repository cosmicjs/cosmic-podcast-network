/* eslint-disable @next/next/no-img-element */
// app/page.tsx
import { VideoList } from "@/cosmic/blocks/videos/VideoList";
import { CategoriesList } from "@/cosmic/blocks/videos/CategoriesList";
import { ChannelsList } from "@/cosmic/blocks/videos/ChannelsList";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

export const revalidate = 3600;

export default async function Home() {
  return (
    <>
      <section className="p-4 md:px-8 mb-6">
        <Suspense fallback={<Loader />}>
          <CategoriesList
            query={{ type: "categories" }}
            limit={10}
            skip={0}
            className="mb-6 m-auto flex flex-wrap gap-2"
          />
        </Suspense>
        <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
          Today{`'`}s Picks
        </h1>
        <Suspense fallback={<Loader />}>
          <VideoList
            query={{ type: "videos" }}
            limit={10}
            skip={0}
            className="m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          />
        </Suspense>
      </section>
      <div className="flex items-center border-b dark:border-gray-800"></div>
      <section className="p-4 md:p-8 pt-10 pb-16">
        <h2 className="mb-8 text-2xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
          Featured Channels
        </h2>
        <div className="flex flex-wrap gap-4">
          <Suspense fallback={<Loader />}>
            <ChannelsList />
          </Suspense>
        </div>
      </section>
    </>
  );
}
