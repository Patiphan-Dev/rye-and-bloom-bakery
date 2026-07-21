"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMember } from "@/context/member-context";
import type { MemberProfile } from "@/types/member";

export function AuthGate({ children }: { children: (profile: MemberProfile) => React.ReactNode }) {
  const { profile, isHydrated } = useMember();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !profile) {
      router.replace("/account");
    }
  }, [isHydrated, profile, router]);

  if (!isHydrated || !profile) {
    return <div className="py-24 text-center text-sm text-ink-soft">กำลังโหลด...</div>;
  }

  return <>{children(profile)}</>;
}
