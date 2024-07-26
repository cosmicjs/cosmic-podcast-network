// app/categories/[slug]/page.tsx
import { VideoList } from "@/cosmic/blocks/videos/VideoList";
import { CategoriesList } from "@/cosmic/blocks/videos/CategoriesList";
import { cosmic } from "@/cosmic/client";
import { notFound } from "next/navigation";

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
      <div className="p-4 md:p-8 pt-4">
        <CategoriesList
          query={{ type: "categories" }}
          activeId={category.id}
          sort="-created_at"
          limit={10}
          skip={0}
          className="mb-8 m-auto flex flex-wrap gap-2"
        />
        <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
          {category.title}
        </h1>
        <VideoList
          query={{ type: "videos", "metadata.categories": category.id }}
          limit={10}
          skip={0}
          className="m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        />
      </div>
    );
  } catch (e: any) {
    if (e.status === 404) return notFound();
  }
}