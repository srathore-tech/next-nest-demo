"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Eye, EyeOff, LockKeyhole, Mail, ArrowRight, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RegisterPayload } from "../types/auth.types";
import { useRegister } from "../hook/useAuth";

export default function RegisterForm() {
  const { mutateAsync: registerUser, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterPayload) => {
    try {
      const response = await registerUser(data);
      toast.success(response.message || "User registered successfully!", {
        description: "You can now log in with your credentials.",
      });
      router.push("/login");
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string | string[] } };
        message?: string;
      };
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please check your information.";
      toast.error(Array.isArray(message) ? message[0] : message);
    }
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
            Register your account
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Sign up to create and manage your projects
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                id="name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                className={`h-11 w-full rounded-lg border bg-zinc-900 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 ${
                  errors.name
                    ? "border-red-500/70 focus:border-red-500"
                    : "border-zinc-800 focus:border-orange-500"
                }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
            </div>

            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className="mt-1.5 text-xs text-red-400">{message}</p>
              )}
            />
          </div>

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
            </div>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                autoComplete="new-password"
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
            disabled={isPending}
            className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-semibold text-zinc-950 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Registering account...
              </>
            ) : (
              <>
                Sign up
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </>
            )}
          </button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-orange-400 transition hover:text-orange-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
