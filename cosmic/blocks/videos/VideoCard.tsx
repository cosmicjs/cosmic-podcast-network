/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getFormattedDate } from "@/cosmic/utils";
import { CategoryType } from "./CategoryPill";

export type VideoType = {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  metadata: {
    thumbnail: {
      imgix_url: string;
    };
    video: {
      url: string;
    };
    description: string;
    categories: CategoryType[];
    channel: {
      slug: string;
      title: string;
      metadata: {
        thumbnail: {
          imgix_url: string;
        };
      };
    };
  };
};

export function VideoCard({
  video,
  className,
}: {
  video: VideoType;
  className?: string;
}) {
  return (
    <div>
      <Link href={`/watch/${video.id}-${video.slug}`}>
        <img
          alt={video.title}
          className="h-[175px] 2xl:h-[250px] w-full object-cover rounded-lg"
          src={`${video.metadata.thumbnail.imgix_url}?w=400&auto=format,compression`}
        />
        <div className="relative mb-2">
          <h2 className="mt-2 text-2xl font-bold text-black dark:text-white">
            {video.title}
          </h2>
        </div>
      </Link>
      <div className="flex flex-col justify-between">
        <div
          className="relative flex w-full flex-col items-start justify-between 
          space-y-10 md:flex-row md:items-center md:space-y-0"
        >
          <div className="flex w-full items-center gap-10 text-sm text-gray-700 dark:text-gray-300">
            <Link
              href={`/channels/${video.metadata.channel.slug}`}
              className="flex items-center gap-3"
            >
              <div
                className="flex items-center justify-center overflow-hidden 
                rounded-full bg-gray-200 dark:bg-gray-800"
              >
                <img
                  alt={video.metadata.channel.title}
                  src={`${video.metadata.channel.metadata.thumbnail.imgix_url}?w=400&auto=format,compression`}
                  className="h-[40px] w-[40px] rounded-full object-cover"
                />
              </div>
              <div>
                <span className="font-semibold">
                  {video.metadata.channel.title}
                </span>
                <br />
                {getFormattedDate(video.created_at)}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
