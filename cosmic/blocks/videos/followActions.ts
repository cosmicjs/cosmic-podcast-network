"use server";

import { cosmic } from "@/cosmic/client";

export async function followChannel(userId: string, channelId: string) {
  try {
    // Get current user data
    const { object: user } = await cosmic.objects
      .findOne({
        id: userId,
        type: "users",
      })
      .props("metadata")
      .depth(0);

    // Get current followed channels or initialize empty array
    const followedChannels = user.metadata.channels || [];

    // Check if already following
    const isFollowing = followedChannels.includes(channelId);

    // Update the followed channels list
    const updatedFollowedChannels = isFollowing
      ? followedChannels.filter((id: string) => id !== channelId)
      : [...followedChannels, channelId];

    // Update user metadata
    await cosmic.objects.updateOne(userId, {
      metadata: {
        channels: updatedFollowedChannels,
      },
    });

    return {
      success: true,
      isFollowing: !isFollowing,
    };
  } catch (error) {
    console.error("Error following channel:", error);
    return {
      success: false,
      error: "Failed to update follow status",
    };
  }
}

export async function checkIsFollowing(userId: string, channelId: string) {
  if (!userId) return false;

  const { object: user } = await cosmic.objects
    .findOne({
      type: "users",
      id: userId,
    })
    .props("metadata");

  return user?.metadata?.channels?.includes(channelId) || false;
}
