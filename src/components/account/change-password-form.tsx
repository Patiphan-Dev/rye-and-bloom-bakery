"use client";

import { useState } from "react";
import { useMember } from "@/context/member-context";

export function ChangePasswordForm() {
  const { changePassword } = useMember();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = changePassword(currentPassword, newPassword);
    setMessage({ text: result.message, isError: !result.success });
    if (result.success) {
      setCurrentPassword("");
      setNewPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-ink/10 bg-card p-6">
      <div>
        <label htmlFor="current-password" className="mb-1 block text-sm font-medium text-ink">
          รหัสผ่านปัจจุบัน
        </label>
        <input
          id="current-password"
          type="password"
          required
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="new-password" className="mb-1 block text-sm font-medium text-ink">
          รหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร)
        </label>
        <input
          id="new-password"
          type="password"
          required
          minLength={6}
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
      {message && (
        <p className={message.isError ? "text-sm text-terracotta" : "text-sm text-moss-dark"}>{message.text}</p>
      )}
      <button type="submit" className="rounded-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-cream hover:bg-terracotta-dark">
        เปลี่ยนรหัสผ่าน
      </button>
    </form>
  );
}
