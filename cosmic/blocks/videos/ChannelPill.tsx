/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
export type ChannelType = {
  id: string;
  slug: string;
  title: string;
  metadata: {
    thumbnail: {
      imgix_url: string;
    };
    image_alt_text: string;
  };
};

export function ChannelPill({ channel }: { channel: ChannelType }) {
  return (
    <Link
      key={channel.id}
      href={`/channels/${channel.slug}`}
      className="rounded-xl flex p-4 px-6 gap-4 items-center bg-gray-200 dark:bg-gray-900"
    >
      <div
        className="flex items-center justify-center overflow-hidden 
            rounded-full bg-gray-200 dark:bg-gray-800"
      >
        <img
          alt={channel.metadata.image_alt_text}
          src={`${channel.metadata.thumbnail.imgix_url}?w=80&auto=format,compression`}
          className="h-[40px] w-[40px] rounded-full object-cover"
        />
      </div>
      <div>
        <span className="font-semibold">{channel.title}</span>
      </div>
    </Link>
  );
}
