"use client";
import { useEffect, useState } from "react";

import { timeAgo } from "@/helpers/timeAgo";
import { LoaderCircle } from "lucide-react";

export function TimeAgo({ time }: { time: string }) {
  const [localTime, setTLocalTime] = useState<string | null>(null);
  useEffect(() => {
    setTLocalTime(timeAgo(time));
  }, [time]);
  return (
    <div className="h-6">
      {!localTime ? (
        <LoaderCircle className="size-5 animate-spin text-teal-500" />
      ) : (
        localTime
      )}
    </div>
  );
}
