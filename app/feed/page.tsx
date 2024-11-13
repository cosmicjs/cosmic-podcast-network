import { VideoList } from "@/cosmic/blocks/videos/VideoList";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { redirect } from "next/navigation";
import {
  getUserFromCookie,
  getUserData,
} from "@/cosmic/blocks/user-management/actions";

export default async function FeedPage() {
  const user = await getUserFromCookie();

  if (!user) {
    redirect("/login");
  }

  const { data: userData, error } = await getUserData(user.id);

  if (error === "Account is not active") {
    redirect("/login?error=Your account is no longer active");
  }

  if (!userData?.metadata?.channels?.length) {
    return (
      <div className="p-4 md:px-8">
        <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
          My Feed
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          You haven't followed any channels yet. Follow some channels to see
          their videos here!
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:px-8">
      <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
        My Feed
      </h1>
      <Suspense fallback={<Loader />}>
        <VideoList
          query={{
            type: "videos",
            "metadata.channel": {
              $in: userData.metadata.channels,
            },
          }}
          sort="-created_at"
          limit={20}
          className="m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        />
      </Suspense>
    </div>
  );
}
