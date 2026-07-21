"use client";

import { AuthGate } from "@/components/account/auth-gate";
import { ChangePasswordForm } from "@/components/account/change-password-form";

export default function ChangePasswordPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-heading text-2xl text-ink">เปลี่ยนรหัสผ่าน</h1>
      <AuthGate>{() => <ChangePasswordForm />}</AuthGate>
    </div>
  );
}
