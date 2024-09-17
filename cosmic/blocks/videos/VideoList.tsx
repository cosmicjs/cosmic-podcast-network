import { VideoCard, VideoType } from "./VideoCard";
import { cosmic } from "@/cosmic/client";

function Videos({ videos }: { videos: VideoType[] }) {
  return (
    <>
      {videos.map((video: VideoType) => {
        return <VideoCard key={video.id} video={video} />;
      })}
    </>
  );
}

export async function VideoList({
  query,
  sort,
  limit,
  skip,
  className,
  status,
  noWrap = false,
}: {
  query: any;
  sort?: string;
  limit?: number;
  skip?: number;
  className?: string;
  status?: "draft" | "published" | "any";
  noWrap?: boolean;
}) {
  try {
    const { objects: videos } = await cosmic.objects
      .find(query)
      .props(
        `{
          id
          slug
          title
          created_at
          metadata {
            thumbnail {
              imgix_url
            }
            video {
              url
            }
            channel {
              slug
              title
              metadata {
                thumbnail {
                  imgix_url
                }
              }
            }
          }
        }`
      )
      .depth(1)
      .sort(sort ? sort : "-order")
      .limit(limit ? limit : 100)
      .skip(skip ? skip : 0)
      .status(status ? status : "published")
      .options({
        media: {
          props: "alt_text",
        },
      });
    if (noWrap) return <Videos videos={videos} />;
    return (
      <div className={className}>
        <Videos videos={videos} />
      </div>
    );
  } catch (e: any) {
    if (e.status === 404) return <>No results found.</>;
  }
}
