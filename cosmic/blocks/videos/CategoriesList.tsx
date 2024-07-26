import { CategoryPill, CategoryType } from "./CategoryPill";
import { cosmic } from "@/cosmic/client";

function Categories({
  categories,
  activeId,
}: {
  categories: CategoryType[];
  activeId?: string;
}) {
  return (
    <>
      {categories.map((category: CategoryType) => {
        return (
          <CategoryPill
            key={category.id}
            active={activeId ? activeId === category.id : false}
            category={category}
          />
        );
      })}
    </>
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
  activeId,
}: {
  query: any;
  sort?: string;
  limit?: number;
  skip?: number;
  className?: string;
  status?: "draft" | "published" | "any";
  noWrap?: boolean;
  activeId?: boolean;
}) {
  const { objects: categories } = await cosmic.objects
    .find(query)
    .props("id,slug,title,thumbnail,created_at")
    .depth(1)
    .sort(sort ? sort : "-order")
    .limit(limit ? limit : 100)
    .skip(skip ? skip : 0)
    .status(status ? status : "published");
  if (noWrap) return <Categories categories={categories} />;
  return (
    <div className={className}>
      <Categories categories={categories} activeId={activeId} />
    </div>
  );
}
