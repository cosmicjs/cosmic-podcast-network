/* eslint-disable @next/next/no-img-element */
"use client";
import { PlayIcon } from "lucide-react";
import { VideoType } from "./VideoCard";
import { useState } from "react";
export function PlayArea({ video }: { video: VideoType }) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      {!isClicked ? (
        <div className="relative overflow-hidden cursor-pointer max-h-[75vh]">
          <button onClick={() => setIsClicked(true)} className="w-full">
            <img
              src={`${video.metadata.thumbnail.imgix_url}?w=2000&auto=format,compression`}
              alt={video.title}
              className="aspect-video w-full object-cover"
            />
            <div className="absolute top-[50%] justify-center flex w-full">
              <PlayIcon className="size-20 -mt-10" />
            </div>
          </button>
        </div>
      ) : (
        <video
          src={video.metadata.video.url}
          controls
          className="w-full max-h-[75vh]"
          autoPlay
        />
      )}
    </>
  );
}
