import Link from "next/link";
import { ArrowLeft, Compass, Home } from "lucide-react";

export default function NotFound() {
    const handleGoBack = () => {
        if (typeof window !== "undefined") {
            window.history.back();
        }
    };
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-12 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="absolute left-10 top-20 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        <div className="absolute right-20 top-32 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 delay-300" />
        <div className="absolute bottom-32 left-24 h-1.5 w-1.5 animate-pulse rounded-full bg-gray-500 delay-700" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 shadow-2xl shadow-emerald-500/5">
          <Compass
            size={38}
            className="animate-pulse text-emerald-400"
          />
        </div>

        {/* Status */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Error 404
        </p>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Page not found
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-gray-400 sm:text-base">
          The page you're looking for doesn't exist, has been moved, or is
          temporarily unavailable.
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 sm:w-auto"
          >
            <Home size={17} />
            Go home
          </Link>

         
        </div>
      </div>
    </main>
  );
}