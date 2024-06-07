import LoaderIcon from "@/assets/icons/loader";
import { ReactNode } from "react";

export default function Loader({
  children,
  loading,
}: {
  children: ReactNode | ReactNode[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div
        className="flex justify-center items-center w-full min-h-[80vh]"
        role="loader"
      >
        <LoaderIcon />
      </div>
    );
  }
  return children;
}
