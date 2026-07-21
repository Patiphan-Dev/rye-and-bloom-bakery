"use client";

import { useMember } from "@/context/member-context";
import { AuthTabs } from "@/components/account/auth-tabs";
import { AccountDashboard } from "@/components/account/account-dashboard";

export default function AccountPage() {
  const { profile, isHydrated, logout } = useMember();

  if (!isHydrated) {
    return <div className="py-24 text-center text-sm text-ink-soft">กำลังโหลด...</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {profile ? <AccountDashboard profile={profile} onLogout={logout} /> : <AuthTabs />}
    </div>
  );
}
