import { cosmic } from "@/cosmic/client";
import { ChannelPill, ChannelType } from "@/cosmic/blocks/videos/ChannelPill";

export async function ChannelsList() {
  try {
    const { objects: channels } = await cosmic.objects
      .find({
        type: "channels",
      })
      .props(
        `{
          id
          slug
          title
          metadata {
            thumbnail {
              imgix_url
            }
          }
        }`
      )
      .depth(1)
      .options({
        media: {
          props: "alt_text",
        },
      });
    return channels?.map((channel: ChannelType) => {
      return <ChannelPill key={channel.id} channel={channel} />;
    });
  } catch (e: any) {
    if (e.status === 404) return <>No results found.</>;
  }
}
