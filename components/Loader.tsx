import { LoaderCircle } from "lucide-react";

export function Loader() {
  return (
    <div className="items-center -mt-20 h-screen animate-spin flex justify-center">
      <LoaderCircle className="size-20 text-teal-500" />
    </div>
  );
}
