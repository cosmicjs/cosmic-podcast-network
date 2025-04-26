// app/categories/[slug]/layout.tsx
import { CategoriesList } from "@/cosmic/blocks/videos/CategoriesList";
import { cosmic } from "@/cosmic/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { object: category } = await cosmic.objects
    .findOne({
      slug: resolvedParams.slug,
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
        "https://imgix.cosmicjs.com/daec0820-4dd1-11ef-b1ea-f56c65dfade9-podcast-network-screenshot-3.png?w=2000&auto=forat,compression",
      ],
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  try {
    return (
      <div className="p-4 md:px-8 mb-6">
        <CategoriesList
          query={{ type: "categories" }}
          activeSlug={resolvedParams.slug}
          limit={10}
          skip={0}
          className="mb-6 m-auto flex flex-wrap gap-2"
        />
        {children}
      </div>
    );
  } catch (e: any) {
    if (e.status === 404) return notFound();
  }
}
