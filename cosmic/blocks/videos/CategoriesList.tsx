import { CategoryPill, CategoryType } from "./CategoryPill";
import { cosmic } from "@/cosmic/client";

function Categories({
  categories,
  activeSlug,
}: {
  categories: CategoryType[];
  activeSlug?: string;
}) {
  return (
    <div className="flex flex-nowrap gap-2 overflow-y-scroll">
      {categories.map((category: CategoryType) => {
        return (
          <CategoryPill
            key={category.id}
            active={activeSlug ? activeSlug === category.slug : false}
            category={category}
          />
        );
      })}
    </div>
  );
}

export async function CategoriesList({
  query,
  sort,
  limit,
  skip,
  className,
  status,
  noWrap = false,
  activeSlug,
}: {
  query: any;
  sort?: string;
  limit?: number;
  skip?: number;
  className?: string;
  status?: "draft" | "published" | "any";
  noWrap?: boolean;
  activeSlug?: string;
}) {
  const { objects: categories } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata,created_at")
    .depth(1)
    .sort(sort ? sort : "-order")
    .limit(limit ? limit : 100)
    .skip(skip ? skip : 0)
    .status(status ? status : "published");
  if (noWrap) return <Categories categories={categories} />;
  return (
    <div className={className}>
      <Categories categories={categories} activeSlug={activeSlug} />
    </div>
  );
}
