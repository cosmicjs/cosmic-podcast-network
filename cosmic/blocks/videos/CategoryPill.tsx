/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export type CategoryType = {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  thumbnail: string;
};

export function CategoryPill({
  category,
  className,
}: {
  category: CategoryType;
  className?: string;
}) {
  return (
    <div className={className}>
      <Link
        href={`/categories/${category.slug}`}
        className="bg-gray-200 dark:bg-gray-900 rounded-2xl flex p-2 px-4 gap-2"
      >
        <img
          alt={category.title}
          className="h-[20px] w-[20px] object-cover rounded-full"
          src={`${category.thumbnail}?w=1200&auto=format,compression`}
        />
        {category.title}
      </Link>
    </div>
  );
}
