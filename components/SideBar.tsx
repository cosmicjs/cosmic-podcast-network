import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
export function SideBar() {
  return (
    <div className="w-[80px] hidden md:flex space-y-6 fixed h-screen border-r dark:border-gray-500 top-[70px] left-0 pt-6 flex-col justify-start">
      <Link href="/" className="space-y-2 w-full flex flex-col justify-center">
        <HomeIcon className="size-6 m-auto" />
        <div className="m-auto text-sm">Home</div>
      </Link>
      <div className="m-auto">
        <ThemeToggle />
      </div>
    </div>
  );
}
