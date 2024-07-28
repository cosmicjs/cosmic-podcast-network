// app/categories/[slug]/layout.tsx
import { CategoriesList } from "@/cosmic/blocks/videos/CategoriesList";
import { cosmic } from "@/cosmic/client";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { object: category } = await cosmic.objects
    .findOne({
      slug: params.slug,
      type: "categories",
    })
    .props("title")
    .depth(1);
  const { object: globalSettings } = await cosmic.objects
    .findOne({
      type: "settings",
      slut: "settings",
    })
    .props("metadata.site_title,metadata.description")
    .depth(1);
  return {
    title: `${globalSettings.metadata.site_title} | ${category.title}`,
    description: globalSettings.metadata.description,
    openGraph: {
      images: [
        "https://imgix.cosmicjs.com/f2eeb900-4b9b-11ef-b1ea-f56c65dfade9-cosmic-podcast-network-screenshot.png?w=2000&auto=forat,compression",
      ],
    },
  };
}

export default async function CategoryPage({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  try {
    return (
      <div className="p-4 md:px-8 mb-6">
        <Suspense fallback={<Loader />}>
          <CategoriesList
            query={{ type: "categories" }}
            activeSlug={params.slug}
            limit={10}
            skip={0}
            className="mb-6 m-auto flex flex-wrap gap-2"
          />
        </Suspense>
        {children}
      </div>
    );
  } catch (e: any) {
    if (e.status === 404) return notFound();
  }
}
