import type { Metadata } from "next";
import "./globals.css";

const origin = "https://gotcha.myappcenter.top";

const social = {
  title: "Gotcha | Snap it. Know exactly where it is.",
  description: "Remember where every item lives with photos, offline AI, visual pins, search, and private local-first storage.",
  image: `${origin}/og-en.jpg`,
  alt: "Gotcha — Snap it. Know exactly where it is.",
};

// GitHub Pages only serves static files, so metadata must not depend on request
// headers. Language-specific covers can be exposed through separate static URLs.
export const metadata: Metadata = {
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
      locale: "en_US",
      images: [{ url: social.image, width: 1200, height: 630, alt: social.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: social.title,
      description: social.description,
      images: [social.image],
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
