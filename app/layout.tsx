import type { Metadata } from "next";
import "./globals.css";

const origin = process.env.GITHUB_ACTIONS === "true"
  ? "https://skyloveflash1-netizen.github.io/gotcha-landing"
  : "https://gotcha-memory.kevin-skyloveflash.chatgpt.site";

export const metadata: Metadata = {
    metadataBase: new URL(origin),
    title: "Gotcha｜拍照记录物品位置，快速找到东西",
    description: "Gotcha 是一款本地优先的物品位置管理应用。拍照记录房间、柜子和物品的存放位置，支持离线 AI 识别、搜索、图钉定位与备份。",
    applicationName: "Gotcha",
    authors: [{ name: "Gotcha" }],
    creator: "Gotcha",
    publisher: "Gotcha",
    category: "lifestyle",
    keywords: ["Gotcha", "物品管理", "收纳整理", "物品位置", "家庭收纳", "搬家整理", "照片管理", "离线 AI", "item organizer", "home inventory"],
    alternates: { canonical: origin },
    manifest: `${origin}/manifest.webmanifest`,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    icons: { icon: `${origin}/images/gotcha-icon.png`, shortcut: `${origin}/images/gotcha-icon.png` },
    openGraph: {
      title: "Gotcha｜拍一张，就知道东西放在哪",
      description: "用照片记住每件物品的位置。支持离线 AI、搜索、图钉定位和备份，本地优先且无广告。",
      type: "website",
      url: origin,
      siteName: "Gotcha",
      locale: "zh_CN",
      images: [{ url: `${origin}/og.jpg`, width: 1200, height: 630, alt: "Gotcha — 拍一张，就知道放在哪" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gotcha｜拍一张，就知道东西放在哪",
      description: "用照片记住每件物品的位置。支持离线 AI、搜索、图钉定位和备份。",
      images: [`${origin}/og.jpg`],
    },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Gotcha",
  description: "用照片记录物品的存放位置，通过离线 AI、搜索和图钉定位快速找到物品。",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "iOS, iPadOS, Android",
  url: origin,
  image: `${origin}/images/gotcha-icon.png`,
  downloadUrl: [
    "https://apps.apple.com/cn/app/id6788549634",
    "https://github.com/skyloveflash1-netizen/gotcha-landing/releases/download/v1.0.0/Gotcha_K3_1.0_android_release.apk",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
      </body>
    </html>
  );
}
