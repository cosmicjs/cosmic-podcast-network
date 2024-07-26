/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { cn } from "@/cosmic/utils";
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
  active,
}: {
  category: CategoryType;
  className?: string;
  active?: boolean;
}) {
  return (
    <div className={className}>
      <Link
        href={`/categories/${category.slug}`}
        className={cn(
          active
            ? "bg-white dark:bg-black border-2 border-teal-500"
            : "bg-gray-200 dark:bg-gray-900 border-2 dark:border-gray-900",
          `rounded-2xl flex p-1 px-3 gap-2 items-center`
        )}
      >
        <img
          alt={category.title}
          className="h-[20px] w-[20px] object-cover rounded-full"
          src={`${category.thumbnail}?w=40&auto=format,compression`}
        />
        {category.title}
      </Link>
    </div>
  );
}
