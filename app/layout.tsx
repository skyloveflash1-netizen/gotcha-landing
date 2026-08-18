import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "Gotcha — 拍照即存，物品不再找不见",
    description: "Gotcha 是一款本地优先的私人物品管家。拍照记录存放位置，设备端 AI 自动识别，随时快速找到重要物品。",
    icons: { icon: "/images/gotcha-icon.png", shortcut: "/images/gotcha-icon.png" },
    openGraph: {
      title: "Gotcha — 拍一张，就知道放在哪",
      description: "用照片记住每件物品的位置。本地优先、设备端 AI、隐私安全。",
      type: "website",
      url: origin,
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Gotcha — 拍一张，就知道放在哪" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gotcha — 拍一张，就知道放在哪",
      description: "用照片记住每件物品的位置。本地优先、设备端 AI、隐私安全。",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
