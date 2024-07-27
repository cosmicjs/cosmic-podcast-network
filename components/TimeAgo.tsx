"use client";

import { timeAgo } from "@/helpers/timeAgo";

export function TimeAgo({ time }: { time: string }) {
  return <>{timeAgo(time)}</>;
}
