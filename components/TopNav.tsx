import { CirclePlayIcon } from "lucide-react";
import Link from "next/link";
import { GitHubLink } from "@/components/GitHubLink";
import { cosmic } from "@/cosmic/client";
import { AuthButtons } from "@/cosmic/blocks/user-management/AuthButtons";

export async function TopNav() {
  const { object: globalSettings } = await cosmic.objects
    .findOne({
      type: "settings",
      slut: "settings",
    })
    .props("metadata")
    .depth(1);
  return (
    <div className="w-full gap-4 bg-white dark:bg-black z-10 h-[70px] top-0 fixed border-b dark:border-gray-800 items-center flex px-4 justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="items-center flex dark:text-gray-100">
          <CirclePlayIcon className="size-8 mr-2 text-teal-500" />
          {globalSettings.metadata.site_title}
        </Link>
        <div className="text-gray-600 dark:text-gray-400 text-sm hidden md:block">
          {globalSettings.metadata.tagline}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <GitHubLink />
        </div>
        <div>
          <AuthButtons />
        </div>
      </div>
    </div>
  );
}
