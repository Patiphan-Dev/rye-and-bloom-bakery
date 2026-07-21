"use client";

import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Demo-only: this form does not send data anywhere, it just shows a confirmation state.
    setIsSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-card p-6 text-center">
        <span className="text-3xl">✅</span>
        <p className="mt-2 font-heading text-lg text-ink">ขอบคุณสำหรับข้อความ!</p>
        <p className="mt-1 text-sm text-ink-soft">ทีมงานจะติดต่อกลับโดยเร็วที่สุด (ตัวอย่างสาธิต ยังไม่มีการส่งข้อมูลจริง)</p>
        <button type="button" onClick={() => setIsSubmitted(false)} className="mt-4 text-sm font-medium text-terracotta">
          ส่งข้อความอีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-ink/10 bg-card p-6">
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-ink">
          ชื่อของคุณ
        </label>
        <input
          id="contact-name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-ink">
          อีเมล
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-ink">
          ข้อความ
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
      <button type="submit" className="w-full rounded-full bg-terracotta py-3 text-sm font-semibold text-cream hover:bg-terracotta-dark">
        ส่งข้อความ
      </button>
    </form>
  );
}
