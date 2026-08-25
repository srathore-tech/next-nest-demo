import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex h-full items-center justify-center bg-black px-6 text-white">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        {/* Loader */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/20 bg-gray-950">
            <LoaderCircle
              size={34}
              className="animate-spin text-emerald-400"
            />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">
            Loading
          </h2>

          <p className="text-sm text-gray-500">
            Preparing everything for you...
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-gray-900">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-emerald-500" />
        </div>

        {/* Skeleton dots */}
        <div className="mt-6 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:300ms]" />
        </div>
      </div>
    </main>
  );
}