import { CirclePlayIcon } from "lucide-react";
import Link from "next/link";

export function TopNav() {
  return (
    <div className="w-full bg-white dark:bg-black z-10 h-[70px] top-0 fixed border-b dark:border-gray-500 items-center flex px-4">
      <Link href="/" className="items-center flex">
        <CirclePlayIcon className="size-8 mr-2 dark:text-gray-300 text-gray-600" />
        Cosmic Podcast Network
      </Link>
    </div>
  );
}
