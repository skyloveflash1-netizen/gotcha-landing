import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const origin = "https://gotcha.myappcenter.top";

const socialByLanguage = {
  en: {
    title: "Gotcha | Snap it. Know exactly where it is.",
    description: "Remember where every item lives with photos, offline AI, visual pins, search, and private local-first storage.",
    locale: "en_US",
    image: "/og-en.jpg",
    alt: "Gotcha — Snap it. Know exactly where it is.",
  },
  "zh-cn": {
    title: "Gotcha｜拍一张，就知道东西放在哪",
    description: "用照片记住每件物品的位置。支持离线 AI、搜索、图钉定位和备份，本地优先且无广告。",
    locale: "zh_CN",
    image: "/og-zh-cn.jpg",
    alt: "Gotcha — 拍一张，就知道放在哪",
  },
  "zh-tw": {
    title: "Gotcha｜拍一張，就知道東西放在哪",
    description: "用照片記住每件物品的位置。支援離線 AI、搜尋、圖釘定位和備份，本機優先且無廣告。",
    locale: "zh_TW",
    image: "/og-zh-tw.jpg",
    alt: "Gotcha — 拍一張，就知道放在哪",
  },
  ja: {
    title: "Gotcha｜撮るだけ。どこにあるか、すぐわかる。",
    description: "写真、オフラインAI、ピン、検索で、すべての持ち物の場所をすぐに確認できます。",
    locale: "ja_JP",
    image: "/og-ja.jpg",
    alt: "Gotcha — 撮るだけ。どこにあるか、すぐわかる。",
  },
  ko: {
    title: "Gotcha｜사진 한 장이면, 어디 있는지 바로 알아요.",
    description: "사진, 오프라인 AI, 핀과 검색으로 모든 물건의 위치를 쉽고 빠르게 확인하세요.",
    locale: "ko_KR",
    image: "/og-ko.jpg",
    alt: "Gotcha — 사진 한 장이면, 어디 있는지 바로 알아요.",
  },
} as const;

type SocialLanguage = keyof typeof socialByLanguage;

function detectSocialLanguage(acceptLanguage: string): SocialLanguage {
  const value = acceptLanguage.toLowerCase();
  if (/zh-(tw|hk|mo)|zh-hant/.test(value)) return "zh-tw";
  if (/(^|,)\s*zh/.test(value)) return "zh-cn";
  if (/(^|,)\s*ja/.test(value)) return "ja";
  if (/(^|,)\s*ko/.test(value)) return "ko";
  return "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const isWeChat = /MicroMessenger/i.test(requestHeaders.get("user-agent") ?? "");
  const language = detectSocialLanguage(requestHeaders.get("accept-language") ?? "");
  const social = socialByLanguage[language];
  const shareImage = isWeChat
    ? { url: `${origin}/images/gotcha-icon.png`, width: 1024, height: 1024, alt: "Gotcha Logo" }
    : { url: `${origin}${social.image}`, width: 1200, height: 630, alt: social.alt };

  return {
    metadataBase: new URL(origin),
    title: social.title,
    description: social.description,
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
      title: social.title,
      description: social.description,
      type: "website",
      url: origin,
      siteName: "Gotcha",
      locale: social.locale,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: social.title,
      description: social.description,
      images: [shareImage.url],
    },
  };
}

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
    "https://sitzfb.51fgz.com/imgs/Gotcha_K3_1.0_android_release.apk",
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
