"use client";

import { HomeIcon, RssIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { cn } from "@/cosmic/utils";

export function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "md:hidden border dark:border-gray-900 block md:bg-transparent bg-white shadow-sm dark:bg-gray-900 fixed left-0 bottom-10 text-primary-foreground p-2 rounded-r-lg z-50",
          isOpen && "translate-x-[80px]",
          "transition-transform duration-300"
        )}
      >
        <MenuIcon className="size-6" />
      </button>

      <div
        className={`
        bg-white dark:bg-gray-900 md:dark:bg-transparent z-50 w-[80px] flex space-y-6 fixed h-screen border-r dark:border-gray-900 top-[70px] left-0 pt-6 flex-col justify-start
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:block
        bg-background
      `}
      >
        <Link
          href="/"
          className="space-y-2 w-full flex flex-col justify-center"
        >
          <HomeIcon className="size-6 m-auto" />
          <div className="m-auto text-sm">Home</div>
        </Link>

        <Link
          href="/feed"
          className="space-y-2 w-full flex flex-col justify-center"
        >
          <RssIcon className="size-6 m-auto" />
          <div className="m-auto text-sm">My Feed</div>
        </Link>

        <div className="m-auto pl-2">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
