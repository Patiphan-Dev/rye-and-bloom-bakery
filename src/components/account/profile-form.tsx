"use client";

import { useState } from "react";
import type { MemberProfile } from "@/types/member";
import { useMember } from "@/context/member-context";

export function ProfileForm({ profile }: { profile: MemberProfile }) {
  const { updateProfile } = useMember();
  const [fullName, setFullName] = useState(profile.fullName);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateProfile({ fullName, phone, address });
    setSavedAt(Date.now());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-ink/10 bg-card p-6">
      <div>
        <label htmlFor="profile-name" className="mb-1 block text-sm font-medium text-ink">
          ชื่อ-นามสกุล
        </label>
        <input
          id="profile-name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="profile-email" className="mb-1 block text-sm font-medium text-ink">
          อีเมล
        </label>
        <input
          id="profile-email"
          disabled
          value={profile.email}
          className="w-full rounded-xl border border-ink/10 bg-cream-dark/30 px-4 py-2.5 text-sm text-ink-soft"
        />
      </div>
      <div>
        <label htmlFor="profile-phone" className="mb-1 block text-sm font-medium text-ink">
          เบอร์โทรศัพท์
        </label>
        <input
          id="profile-phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="profile-address" className="mb-1 block text-sm font-medium text-ink">
          ที่อยู่จัดส่งเริ่มต้น
        </label>
        <textarea
          id="profile-address"
          rows={3}
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
      {savedAt && <p className="text-sm text-moss-dark">บันทึกข้อมูลเรียบร้อยแล้ว</p>}
      <button type="submit" className="rounded-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-cream hover:bg-terracotta-dark">
        บันทึกการเปลี่ยนแปลง
      </button>
    </form>
  );
}
