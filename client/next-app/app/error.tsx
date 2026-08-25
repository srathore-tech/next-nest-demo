"use client";

import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-12 text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-800 bg-gray-950">
          <AlertTriangle
            size={36}
            className="animate-pulse text-emerald-400"
          />
        </div>

        {/* Status */}
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
          Something went wrong
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          We couldn't complete that request
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
          An unexpected error occurred. You can try the operation again or
          return to the homepage.
        </p>

        {/* Error digest */}
        {error.digest && (
          <div className="mx-auto mt-6 w-fit rounded-lg border border-gray-800 bg-gray-950 px-4 py-2">
            <p className="font-mono text-xs text-gray-600">
              Error ID: {error.digest}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            <RefreshCcw size={17} />
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-950 px-5 py-3 text-sm font-semibold text-gray-300 transition-all duration-200 hover:border-gray-700 hover:bg-gray-900 hover:text-white"
          >
            <Home size={17} />
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}