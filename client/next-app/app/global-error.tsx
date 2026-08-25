"use client";

import { AlertOctagon, RefreshCcw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
          {/* Background effects */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />

            <div className="absolute left-[15%] top-[20%] h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <div className="absolute right-[20%] top-[30%] h-1.5 w-1.5 animate-pulse rounded-full bg-gray-600 [animation-delay:300ms]" />

            <div className="absolute bottom-[20%] left-[25%] h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 [animation-delay:700ms]" />
          </div>

          <div className="relative z-10 w-full max-w-2xl text-center">
            {/* Icon */}
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-500/5 shadow-2xl shadow-emerald-500/5">
              <AlertOctagon
                size={42}
                className="animate-pulse text-emerald-400"
              />
            </div>

            {/* Heading */}
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-emerald-400">
              System error
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Something went wrong
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              The application encountered an unexpected problem. Please try
              refreshing the application.
            </p>

            {/* Error ID */}
            {error.digest && (
              <div className="mx-auto mt-7 w-fit rounded-lg border border-gray-800 bg-gray-950 px-4 py-2">
                <span className="font-mono text-xs text-gray-600">
                  Error ID: {error.digest}
                </span>
              </div>
            )}

            {/* Action */}
            <button
              type="button"
              onClick={reset}
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-black transition-all duration-200 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20"
            >
              <RefreshCcw size={17} />
              Reload application
            </button>

            {/* Footer */}
            <p className="mt-8 text-xs text-gray-700">
              If the problem continues, please try again later.
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}