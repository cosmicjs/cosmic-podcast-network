import { cosmic } from "@/cosmic/client";
import { ChannelPill, ChannelType } from "@/cosmic/blocks/videos/ChannelPill";

export async function ChannelsList() {
  try {
    const { objects: channels } = await cosmic.objects
      .find({
        type: "channels",
      })
      .props("id,slug,title,metadata")
      .depth(1);
    return channels?.map((channel: ChannelType) => {
      return <ChannelPill key={channel.id} channel={channel} />;
    });
  } catch (e: any) {
    if (e.status === 404) return <>No results found.</>;
  }
}
