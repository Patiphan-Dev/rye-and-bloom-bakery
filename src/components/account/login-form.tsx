"use client";

import { useState } from "react";
import { useMember } from "@/context/member-context";

export function LoginForm() {
  const { login } = useMember();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = login(email, password);
    setError(result.success ? null : result.message);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-ink">
          อีเมล
        </label>
        <input
          id="login-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-ink">
          รหัสผ่าน
        </label>
        <input
          id="login-password"
          type="password"
          required
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
        เข้าสู่ระบบ
      </button>
      <p className="text-center text-xs text-ink-soft">
        * เว็บไซต์ตัวอย่าง: ระบบสมาชิกนี้จำลองการทำงานในเบราว์เซอร์ ไม่มีการเชื่อมต่อฐานข้อมูลจริง
      </p>
    </form>
  );
}
