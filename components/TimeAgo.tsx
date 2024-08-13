"use client";
import { useEffect, useState } from "react";

import { timeAgo } from "@/helpers/timeAgo";
import { LoaderCircle } from "lucide-react";

export function TimeAgo({ time }: { time: string }) {
  const [localTime, setTLocalime] = useState<string | null>(null);
  useEffect(() => {
    return setTLocalime(timeAgo(time));
  }, [localTime, setTLocalime]);
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
