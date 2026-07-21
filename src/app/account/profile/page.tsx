"use client";

import { AuthGate } from "@/components/account/auth-gate";
import { ProfileForm } from "@/components/account/profile-form";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-heading text-2xl text-ink">ข้อมูลส่วนตัว</h1>
      <AuthGate>{(profile) => <ProfileForm profile={profile} />}</AuthGate>
    </div>
  );
}
