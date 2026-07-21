"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { MemberProfile } from "@/types/member";
import { readFromStorage, writeToStorage } from "@/lib/utils/storage";

const MEMBER_STORAGE_KEY = "bakery.member.profile";

interface AuthResult {
  success: boolean;
  message: string;
}

interface MemberContextValue {
  profile: MemberProfile | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (email: string, password: string) => AuthResult;
  register: (input: { fullName: string; email: string; phone: string; password: string }) => AuthResult;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<MemberProfile, "fullName" | "phone" | "address">>) => void;
  changePassword: (currentPassword: string, newPassword: string) => AuthResult;
}

const MemberContext = createContext<MemberContextValue | undefined>(undefined);

// Demo-only credential store — this is a frontend-only mock, never a real auth backend.
const DEMO_PASSWORD_KEY = "bakery.member.demoPassword";

export function MemberProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs from localStorage, an external source unavailable during SSR
    setProfile(readFromStorage(MEMBER_STORAGE_KEY, null));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) writeToStorage(MEMBER_STORAGE_KEY, profile);
  }, [profile, isHydrated]);

  const login = (email: string, password: string): AuthResult => {
    const storedPassword = readFromStorage(DEMO_PASSWORD_KEY, "");
    const storedProfile = readFromStorage<MemberProfile | null>(MEMBER_STORAGE_KEY, null);

    if (!storedProfile || storedProfile.email.toLowerCase() !== email.trim().toLowerCase()) {
      return { success: false, message: "ไม่พบบัญชีนี้ กรุณาสมัครสมาชิกก่อนเข้าสู่ระบบ" };
    }
    if (storedPassword !== password) {
      return { success: false, message: "รหัสผ่านไม่ถูกต้อง" };
    }

    setProfile(storedProfile);
    return { success: true, message: "เข้าสู่ระบบสำเร็จ" };
  };

  const register = (input: { fullName: string; email: string; phone: string; password: string }): AuthResult => {
    if (input.password.length < 6) {
      return { success: false, message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" };
    }

    const newProfile: MemberProfile = {
      id: `member-${Date.now()}`,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      address: "",
      memberSince: new Date().toISOString(),
    };

    writeToStorage(DEMO_PASSWORD_KEY, input.password);
    setProfile(newProfile);
    return { success: true, message: "สมัครสมาชิกสำเร็จ ยินดีต้อนรับ!" };
  };

  const logout = () => setProfile(null);

  const updateProfile = (updates: Partial<Pick<MemberProfile, "fullName" | "phone" | "address">>) => {
    setProfile((current) => (current ? { ...current, ...updates } : current));
  };

  const changePassword = (currentPassword: string, newPassword: string): AuthResult => {
    const storedPassword = readFromStorage(DEMO_PASSWORD_KEY, "");
    if (storedPassword !== currentPassword) {
      return { success: false, message: "รหัสผ่านปัจจุบันไม่ถูกต้อง" };
    }
    if (newPassword.length < 6) {
      return { success: false, message: "รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร" };
    }
    writeToStorage(DEMO_PASSWORD_KEY, newPassword);
    return { success: true, message: "เปลี่ยนรหัสผ่านสำเร็จ" };
  };

  return (
    <MemberContext.Provider
      value={{ profile, isAuthenticated: Boolean(profile), isHydrated, login, register, logout, updateProfile, changePassword }}
    >
      {children}
    </MemberContext.Provider>
  );
}

export function useMember(): MemberContextValue {
  const context = useContext(MemberContext);
  if (!context) throw new Error("useMember must be used within a MemberProvider");
  return context;
}
