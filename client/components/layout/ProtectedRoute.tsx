"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LoaderPinwheel } from "lucide-react";
import { useCurrentUser } from "@/features/users/hook/useUsers";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [tokenExists, setTokenExists] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("accessToken");
    setTokenExists(Boolean(token));
  }, []);

  const {
    data: user,
    isLoading: isUserLoading,
    isError,
  } = useCurrentUser({
    enabled: mounted && Boolean(tokenExists),
  });

  useEffect(() => {
    if (!mounted || tokenExists === null) return;

    if (!tokenExists) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (isError) {
      localStorage.removeItem("accessToken");
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [mounted, tokenExists, isError, router, pathname]);

  if (!mounted || tokenExists === null || (tokenExists && isUserLoading)) {
    return (
      <section className="w-full text-orange-500 h-screen flex flex-col items-center justify-center bg-zinc-50">
        <LoaderPinwheel size={48} className="animate-spin" />
        <h4 className="mt-4 text-sm font-medium text-zinc-500">
          Authenticating your session...
        </h4>
      </section>
    );
  }

  if (!tokenExists || isError || !user) {
    return null;
  }

  return <>{children}</>;
}
