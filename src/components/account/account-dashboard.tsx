import Link from "next/link";
import type { MemberProfile } from "@/types/member";
import { formatDateThai } from "@/lib/utils/format";

const dashboardLinks = [
  { href: "/account/profile", icon: "👤", label: "ข้อมูลส่วนตัว" },
  { href: "/account/orders", icon: "📦", label: "ประวัติคำสั่งซื้อ" },
  { href: "/account/wishlist", icon: "❤️", label: "รายการโปรด" },
  { href: "/account/change-password", icon: "🔒", label: "เปลี่ยนรหัสผ่าน" },
];

export function AccountDashboard({ profile, onLogout }: { profile: MemberProfile; onLogout: () => void }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-ink/10 bg-card p-6">
        <p className="text-sm text-ink-soft">สวัสดี,</p>
        <h1 className="font-heading text-2xl text-ink">{profile.fullName}</h1>
        <p className="mt-1 text-xs text-ink-soft">สมาชิกตั้งแต่ {formatDateThai(profile.memberSince)}</p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {dashboardLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-card p-4 hover:border-terracotta"
          >
            <span className="text-2xl">{link.icon}</span>
            <span className="text-sm font-medium text-ink">{link.label}</span>
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="mt-6 w-full rounded-full border border-ink/15 py-3 text-sm font-medium text-ink-soft hover:border-terracotta hover:text-terracotta"
      >
        ออกจากระบบ
      </button>
    </div>
  );
}
