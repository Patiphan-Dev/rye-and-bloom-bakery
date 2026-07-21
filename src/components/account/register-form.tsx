"use client";

import { useState } from "react";
import { useMember } from "@/context/member-context";

export function RegisterForm() {
  const { register } = useMember();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = register({ fullName, email, phone, password });
    // A successful register auto-authenticates the member (see MemberProvider),
    // so the parent page swaps this form out for the account dashboard.
    setError(result.success ? null : result.message);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="register-name" className="mb-1 block text-sm font-medium text-ink">
          ชื่อ-นามสกุล
        </label>
        <input
          id="register-name"
          required
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="register-email" className="mb-1 block text-sm font-medium text-ink">
          อีเมล
        </label>
        <input
          id="register-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="register-phone" className="mb-1 block text-sm font-medium text-ink">
          เบอร์โทรศัพท์
        </label>
        <input
          id="register-phone"
          type="tel"
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="register-password" className="mb-1 block text-sm font-medium text-ink">
          รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)
        </label>
        <input
          id="register-password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
      {error && <p className="text-sm text-terracotta">{error}</p>}
      <button
        type="submit"
        className="w-full rounded-full bg-terracotta py-3 text-sm font-semibold text-cream hover:bg-terracotta-dark"
      >
        สมัครสมาชิก
      </button>
    </form>
  );
}
