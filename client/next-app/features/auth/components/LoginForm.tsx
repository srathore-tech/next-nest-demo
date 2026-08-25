"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Eye, EyeOff, LockKeyhole, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);

    // Example:
    // await apiCollection.login(data);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
            <LockKeyhole size={24} />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Sign in to continue to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Email address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className={`h-11 w-full rounded-lg border bg-zinc-900 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 ${
                  errors.email
                    ? "border-red-500/70 focus:border-red-500"
                    : "border-zinc-800 focus:border-orange-500"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>

            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="mt-1.5 text-xs text-red-400">{message}</p>
              )}
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-200"
              >
                Password
              </label>

              <button
                type="button"
                className="text-xs font-medium text-orange-400 transition hover:text-orange-300"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                className={`h-11 w-full rounded-lg border bg-zinc-900 pl-10 pr-11 text-sm text-white outline-none transition placeholder:text-zinc-600 ${
                  errors.password
                    ? "border-red-500/70 focus:border-red-500"
                    : "border-zinc-800 focus:border-orange-500"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p className="mt-1.5 text-xs text-red-400">{message}</p>
              )}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-semibold text-zinc-950 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              "Signing in..."
            ) : (
              <>
                Sign in
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </>
            )}
          </button>
        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-orange-400 transition hover:text-orange-300"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
