"use client";

import { Button } from "@/cosmic/elements/Button";
import { useAuth } from "@/cosmic/blocks/user-management/AuthContext";
import { followChannel, checkIsFollowing } from "./followActions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function FollowButton({ channelId }: { channelId: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkFollowStatus() {
      if (user) {
        const isFollowing = await checkIsFollowing(user.id, channelId);
        setIsFollowing(isFollowing);
      }
      setIsLoading(false);
    }

    checkFollowStatus();
  }, [user, channelId]);

  const handleFollow = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const result = await followChannel(user.id, channelId);
      if (result.success) {
        setIsFollowing(result.isFollowing ?? false);
      }
    } catch (error) {
      console.error("Error following channel:", error);
    }
    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleFollow}
      disabled={isLoading}
      variant={isFollowing ? "secondary" : "default"}
      className="w-[160px]"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isFollowing ? (
        "Following channel"
      ) : (
        "Follow channel"
      )}
    </Button>
  );
}
