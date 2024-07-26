// app/video/page.tsx
import { VideoList } from "@/cosmic/blocks/videos/VideoList";
import { CategoriesList } from "@/cosmic/blocks/videos/CategoriesList";

export default async function Home() {
  return (
    <>
      <CategoriesList
        query={{ type: "categories" }}
        sort="-created_at"
        limit={10}
        skip={0}
        className="p-4 m-auto flex flex-wrap gap-2"
      />
      <h1 className="pt-4 pl-4 text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
        Today{`'`}s Picks
      </h1>
      <VideoList
        query={{ type: "videos" }}
        sort="-created_at"
        limit={10}
        skip={0}
        className="p-4 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      />
    </>
  );
}
