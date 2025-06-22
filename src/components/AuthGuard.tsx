"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only allow /auth/login and /auth/signup without a token
    if (
      !localStorage.getItem("token") &&
      !(pathname?.startsWith("/auth"))
    ) {
      router.replace("/auth/signup");
    }
  }, [pathname, router]);

  return <>{children}</>;
}
