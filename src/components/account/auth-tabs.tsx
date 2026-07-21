"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { cn } from "@/lib/utils/cn";

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-ink/10 bg-card p-6 sm:p-8">
      <div className="mb-6 flex rounded-full bg-cream-dark/40 p-1">
        <button
          type="button"
          onClick={() => setActiveTab("login")}
          className={cn(
            "flex-1 rounded-full py-2 text-sm font-medium",
            activeTab === "login" ? "bg-terracotta text-cream" : "text-ink-soft",
          )}
        >
          เข้าสู่ระบบ
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("register")}
          className={cn(
            "flex-1 rounded-full py-2 text-sm font-medium",
            activeTab === "register" ? "bg-terracotta text-cream" : "text-ink-soft",
          )}
        >
          สมัครสมาชิก
        </button>
      </div>

      {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
