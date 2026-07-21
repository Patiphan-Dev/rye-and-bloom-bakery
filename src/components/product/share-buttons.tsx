"use client";

import { useEffect, useState } from "react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  // window.location is only known after mount — reading it during render would
  // make the server (no window) and client HTML diverge and fail hydration.
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs from window.location, an external (browser) source
    setShareUrl(window.location.href);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link", error);
    }
  };

  const shareTargets = [
    {
      key: "facebook",
      label: "Facebook",
      icon: "📘",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      key: "line",
      label: "LINE",
      icon: "💬",
      href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      key: "twitter",
      label: "X",
      icon: "🐦",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-ink-soft">แชร์:</span>
      {shareTargets.map((target) => (
        <a
          key={target.key}
          href={target.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`แชร์ไปที่ ${target.label}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-dark/60 hover:bg-cream-dark"
        >
          {target.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label="คัดลอกลิงก์"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-dark/60 hover:bg-cream-dark"
      >
        {copied ? "✅" : "🔗"}
      </button>
    </div>
  );
}
