// app/categories/[slug]/page.tsx
import { VideoList } from "@/cosmic/blocks/videos/VideoList";
import { cosmic } from "@/cosmic/client";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

export const revalidate = 3600;

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
      .props("id,title")
      .depth(1);
    return (
      <>
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
      </>
    );
  } catch (e: any) {
    if (e.status === 404) return notFound();
  }
}
