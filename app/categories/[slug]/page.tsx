// app/categories/[slug]/page.tsx
import { VideoList } from "@/cosmic/blocks/videos/VideoList";
import { CategoriesList } from "@/cosmic/blocks/videos/CategoriesList";
import { cosmic } from "@/cosmic/client";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { object: category } = await cosmic.objects
      .findOne({
        slug: params.slug,
        type: "categories",
      })
      .props("id,slug,title,thumbnail,created_at")
      .depth(1);
    return (
      <div className="p-4 md:px-8 mb-6">
        <Suspense fallback={<Loader />}>
          <CategoriesList
            query={{ type: "categories" }}
            activeId={category.id}
            limit={10}
            skip={0}
            className="mb-6 m-auto flex flex-wrap gap-2"
          />
        </Suspense>
        <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
          {category.title}
        </h1>
        <Suspense fallback={<Loader />}>
          <VideoList
            query={{ type: "videos", "metadata.categories": category.id }}
            limit={10}
            skip={0}
            className="m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          />
        </Suspense>
      </div>
    );
  } catch (e: any) {
    if (e.status === 404) return notFound();
  }
}
