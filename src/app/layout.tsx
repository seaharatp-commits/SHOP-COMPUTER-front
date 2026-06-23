import type { Metadata } from "next";
import { AppProviders } from "@/context/AppProviders";
import { MainLayout } from "@/components/layout/MainLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHOP COMPUTER — ร้านคอมเซทออนไลน์",
  description: "เลือกซื้อคอมเซทสำเร็จรูป หรือปรับแต่งสเปกคอมในแบบของคุณเอง พร้อมชำระเงินผ่าน QR Code",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body>
        <AppProviders>
          <MainLayout>{children}</MainLayout>
        </AppProviders>
      </body>
    </html>
  );
}
