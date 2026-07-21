import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/context/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingContactButtons } from "@/components/layout/floating-contact-buttons";
import { storeInfo } from "@/lib/mock-data/store-info";

const bodyFont = Noto_Sans_Thai({
  variable: "--font-body",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const headingFont = Noto_Serif_Thai({
  variable: "--font-heading",
  subsets: ["thai", "latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${storeInfo.nameTh} | ${storeInfo.tagline}`,
  description: `${storeInfo.nameTh} ร้านเบเกอรี่โฮมเมด อบสดใหม่ทุกวัน สั่งซื้อขนมปัง เค้ก เพสตรี้ และของหวานคุณภาพระดับพรีเมียม`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <AppProviders>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <FloatingContactButtons />
        </AppProviders>
      </body>
    </html>
  );
}
