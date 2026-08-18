"use client";

import { useEffect, useRef, useState } from "react";

const appStoreUrls = {
  zh: "https://apps.apple.com/cn/app/id6788549634",
  tw: "https://apps.apple.com/tw/app/id6788549634",
  en: "https://apps.apple.com/us/app/id6788549634",
  ja: "https://apps.apple.com/jp/app/id6788549634",
  ko: "https://apps.apple.com/kr/app/id6788549634",
} as const;

const androidDownloadUrl = "https://github.com/skyloveflash1-netizen/gotcha-landing/releases/download/v1.0.0/Gotcha_K3_1.0_android_release.apk";

const copy = {
  zh: {
    nav: ["功能", "使用方式", "隐私"], download: "立即下载", eyebrow: "你的物品记忆外脑",
    titleA: "拍一张，", titleB: "就知道放在哪。",
    lead: "Gotcha 帮你用照片记住每件物品的位置。无需繁琐输入，收纳、查找、搬家，从此一目了然。",
    trust: ["本地优先", "无广告", "数据只属于你"],
    featureKicker: "简单，但很聪明", featureTitle: "把找东西，变成看照片。",
    featureLead: "从房间到抽屉，从照片到图钉，Gotcha 用最符合直觉的方式还原你的真实空间。",
    features: [
      ["拍照即存", "拍下物品，选择空间与容器，几秒完成记录。"],
      ["设备端识别", "离线 AI 自动建议名称、标签，并识别图片文字。"],
      ["自由空间树", "客厅、电视柜、左侧抽屉——层级由你定义。"],
      ["图钉精准定位", "在空间照片上直接标记物品位置，真正一眼找到。"],
      ["搜索立刻找到", "按时间、字母或区域浏览，也可直接搜索物品。"],
      ["完整备份迁移", "标准 ZIP 导入导出，更换设备也能带走全部数据。"],
    ],
    flowKicker: "三步完成", flowTitle: "记住每一件重要的物品。",
    steps: [["01", "建立空间", "用照片还原家里的房间、柜子与收纳箱。"], ["02", "拍下物品", "选择存放位置，AI 帮你补充名称与标签。"], ["03", "随时找到", "搜索或点开空间照片，直接看到物品在哪里。"]],
    privacyKicker: "隐私优先", privacyTitle: "你的家，只存在你的设备里。",
    privacyText: "Gotcha 采用本地优先架构。个人物品照片与记录不会上传到第三方服务器；Apple 设备可通过你的私人 iCloud 同步，并支持本地 ZIP 备份。",
    privacyItems: ["本地存储", "私人 iCloud 同步", "离线 AI 识别", "ZIP 自主备份"],
    scenariosKicker: "不只是收纳", scenariosTitle: "从日常整理，到人生的大工程。",
    scenarios: [["搬家打包", "按箱号记录物品，到新家不必拆遍所有纸箱。"], ["装修记录", "在房间全景中标记施工细节，与承包商准确沟通。"], ["重要证件", "护照、保修卡、备用钥匙，知道它们最后放在哪。"]],
    finalTitle: "让大脑记住重要的事，\n让 Gotcha 记住东西放在哪。", finalLead: "现在即可在 iPhone、iPad 与 Android 上免费下载。",
    android: "下载 Android 版", footer: "帮你记得每一件重要的物品", privacyLink: "隐私政策",
  },
  tw: {
    nav: ["功能", "使用方式", "隱私"], download: "立即下載", eyebrow: "你的物品記憶外腦",
    titleA: "拍一張，", titleB: "就知道放在哪。", lead: "Gotcha 幫你用照片記住每件物品的位置。無需繁瑣輸入，收納、尋找、搬家，從此一目了然。",
    trust: ["本機優先", "無廣告", "資料只屬於你"], featureKicker: "簡單，但很聰明", featureTitle: "把找東西，變成看照片。", featureLead: "從房間到抽屜，從照片到圖釘，Gotcha 用最直覺的方式還原你的真實空間。",
    features: [["拍照即存", "拍下物品，選擇空間與容器，幾秒完成記錄。"], ["裝置端辨識", "離線 AI 自動建議名稱、標籤並辨識圖片文字。"], ["自由空間樹", "客廳、電視櫃、左側抽屜——層級由你定義。"], ["圖釘精準定位", "在空間照片上直接標記物品位置，一眼找到。"], ["搜尋立刻找到", "按時間、字母或區域瀏覽，也可直接搜尋物品。"], ["完整備份轉移", "標準 ZIP 匯入匯出，換裝置也能帶走全部資料。"]],
    flowKicker: "三步完成", flowTitle: "記住每一件重要的物品。", steps: [["01", "建立空間", "用照片還原房間、櫃子與收納箱。"], ["02", "拍下物品", "選擇位置，AI 幫你補充名稱與標籤。"], ["03", "隨時找到", "搜尋或點開空間照片，直接看到物品在哪。"]],
    privacyKicker: "隱私優先", privacyTitle: "你的家，只存在你的裝置裡。", privacyText: "Gotcha 採用本機優先架構。物品照片與記錄不會上傳第三方伺服器；Apple 裝置可透過私人 iCloud 同步，並支援 ZIP 備份。", privacyItems: ["本機儲存", "私人 iCloud 同步", "離線 AI 辨識", "ZIP 自主備份"],
    scenariosKicker: "不只是收納", scenariosTitle: "從日常整理，到人生的大工程。", scenarios: [["搬家打包", "按箱號記錄，到新家不必拆遍所有紙箱。"], ["裝潢記錄", "在房間全景標記施工細節，準確溝通。"], ["重要證件", "護照、保固卡、備用鑰匙，知道最後放在哪。"]],
    finalTitle: "讓大腦記住重要的事，\n讓 Gotcha 記住東西放在哪。", finalLead: "現在即可在 iPhone、iPad 與 Android 上免費下載。", android: "下載 Android 版", footer: "幫你記得每一件重要的物品", privacyLink: "隱私政策",
  },
  en: {
    nav: ["Features", "How it works", "Privacy"], download: "Download", eyebrow: "Your external memory for things",
    titleA: "Snap it.", titleB: "Know exactly where it is.", lead: "Gotcha remembers where every item lives. No tedious typing—just snap, organize, and find anything in seconds.",
    trust: ["Local first", "No ads", "Your data is yours"], featureKicker: "Simple, yet smart", featureTitle: "Turn searching into seeing.", featureLead: "From rooms to drawers and photos to pins, Gotcha mirrors the way your real spaces work.",
    features: [["Snap to save", "Photograph an item, choose its space and log it in seconds."], ["On-device vision", "Offline AI suggests names, tags and recognizes text."], ["Spaces your way", "Living room, cabinet, left drawer—build any hierarchy."], ["Pinpoint location", "Mark the exact spot on a space photo and see it instantly."], ["Find in seconds", "Browse by time, alphabet or area, or simply search."], ["Own your backup", "Standard ZIP import and export keeps your data portable."]],
    flowKicker: "Three simple steps", flowTitle: "Remember every item that matters.", steps: [["01", "Create a space", "Use photos to map rooms, cabinets and storage boxes."], ["02", "Snap the item", "Choose its location while AI suggests a name and tags."], ["03", "Find it anytime", "Search or open the space photo to see where it is."]],
    privacyKicker: "Privacy first", privacyTitle: "Your home stays on your devices.", privacyText: "Gotcha is local-first. Personal photos and records never go to a third-party server. Apple devices can sync through your private iCloud, with portable ZIP backups whenever you want.", privacyItems: ["Local storage", "Private iCloud sync", "Offline AI", "Portable ZIP backups"],
    scenariosKicker: "Beyond storage", scenariosTitle: "For everyday order—and life's bigger projects.", scenarios: [["Moving day", "Track every box, then find what you need without unpacking them all."], ["Renovation notes", "Pin issues on a room photo and communicate clearly with contractors."], ["Important documents", "Always know where the passport, warranty or spare key went."]],
    finalTitle: "Save your memory for what matters.\nLet Gotcha remember where things are.", finalLead: "Free to download now on iPhone, iPad and Android.", android: "Download for Android", footer: "Remember every item that matters", privacyLink: "Privacy Policy",
  },
  ja: {
    nav: ["機能", "使い方", "プライバシー"], download: "ダウンロード", eyebrow: "持ち物のための外部脳",
    titleA: "撮るだけ。", titleB: "どこにあるか、すぐわかる。", lead: "Gotchaがすべての持ち物の場所を記憶。面倒な入力なしで、撮影・整理・検索がすぐにできます。",
    trust: ["ローカル優先", "広告なし", "データはあなたのもの"], featureKicker: "シンプルで賢い", featureTitle: "探すことを、見ることに。", featureLead: "部屋から引き出し、写真からピンまで。Gotchaが実際の収納空間を直感的に再現します。",
    features: [["撮るだけで保存", "写真を撮り、場所を選ぶだけで数秒で記録。"], ["端末内AI", "オフラインで名前・タグ・画像内テキストを認識。"], ["自由な空間構造", "部屋、棚、引き出しを自由な階層で整理。"], ["ピンで正確に", "空間写真に位置を直接マーク。"], ["すぐに検索", "時間、名前、場所からすばやく発見。"], ["自分でバックアップ", "ZIPの入出力でデータを安全に移行。"]],
    flowKicker: "3ステップ", flowTitle: "大切な持ち物をすべて記憶。", steps: [["01", "空間を作る", "部屋や棚、収納箱を写真で登録。"], ["02", "持ち物を撮る", "場所を選び、AIが名前とタグを提案。"], ["03", "いつでも見つける", "検索や写真から場所をすぐ確認。"]],
    privacyKicker: "プライバシー優先", privacyTitle: "あなたの家は、あなたの端末だけに。", privacyText: "Gotchaはローカル優先。写真や記録を第三者サーバーへ送りません。Apple端末では個人のiCloud同期とZIPバックアップを利用できます。", privacyItems: ["ローカル保存", "個人iCloud同期", "オフラインAI", "ZIPバックアップ"],
    scenariosKicker: "収納だけじゃない", scenariosTitle: "日々の整理から、大きなプロジェクトまで。", scenarios: [["引っ越し", "箱番号で記録し、全部開けずに必要な物を発見。"], ["リフォーム", "部屋写真に不具合をマークし、業者と正確に共有。"], ["重要書類", "パスポートや保証書、予備鍵の場所を記憶。"]],
    finalTitle: "大切なことは脳に。\n物の場所はGotchaに。", finalLead: "iPhone、iPad、Androidで今すぐ無料ダウンロード。", android: "Android版をダウンロード", footer: "大切な持ち物をすべて記憶", privacyLink: "プライバシーポリシー",
  },
  ko: {
    nav: ["기능", "사용 방법", "개인정보"], download: "다운로드", eyebrow: "물건을 위한 외장 두뇌",
    titleA: "사진 한 장이면,", titleB: "어디 있는지 바로 알아요.", lead: "Gotcha가 모든 물건의 위치를 기억합니다. 번거로운 입력 없이 촬영하고 정리하고 몇 초 만에 찾으세요.",
    trust: ["로컬 우선", "광고 없음", "데이터는 내 것"], featureKicker: "간단하지만 똑똑하게", featureTitle: "찾는 일을, 보는 일로.", featureLead: "방부터 서랍까지, 사진부터 핀까지. Gotcha가 실제 수납 공간을 직관적으로 재현합니다.",
    features: [["사진으로 저장", "사진을 찍고 공간을 고르면 몇 초 만에 기록됩니다."], ["온디바이스 AI", "오프라인으로 이름, 태그와 이미지 속 글자를 인식합니다."], ["자유로운 공간", "방, 수납장, 서랍을 원하는 계층으로 구성하세요."], ["핀으로 정확하게", "공간 사진에 물건 위치를 직접 표시하세요."], ["몇 초 만에 검색", "시간, 이름, 공간으로 둘러보거나 검색하세요."], ["내가 소유한 백업", "ZIP 가져오기와 내보내기로 안전하게 이전하세요."]],
    flowKicker: "간단한 3단계", flowTitle: "중요한 모든 물건을 기억하세요.", steps: [["01", "공간 만들기", "방, 수납장과 상자를 사진으로 등록하세요."], ["02", "물건 촬영", "위치를 고르면 AI가 이름과 태그를 제안합니다."], ["03", "언제든 찾기", "검색하거나 공간 사진에서 위치를 확인하세요."]],
    privacyKicker: "개인정보 우선", privacyTitle: "당신의 집은 당신의 기기에만.", privacyText: "Gotcha는 로컬 우선 앱입니다. 사진과 기록은 제3자 서버로 전송되지 않습니다. Apple 기기에서는 개인 iCloud 동기화와 ZIP 백업을 사용할 수 있습니다.", privacyItems: ["로컬 저장", "개인 iCloud 동기화", "오프라인 AI", "ZIP 백업"],
    scenariosKicker: "수납 그 이상", scenariosTitle: "일상 정리부터 큰 프로젝트까지.", scenarios: [["이사", "상자 번호로 기록하고 모두 열지 않고 필요한 것을 찾으세요."], ["인테리어", "방 사진에 문제를 표시해 시공업체와 정확히 소통하세요."], ["중요 서류", "여권, 보증서와 예비 열쇠의 위치를 기억하세요."]],
    finalTitle: "중요한 일은 머리에,\n물건 위치는 Gotcha에.", finalLead: "iPhone, iPad와 Android에서 지금 무료로 다운로드하세요.", android: "Android용 다운로드", footer: "중요한 모든 물건을 기억해주는 앱", privacyLink: "개인정보 처리방침",
  },
} as const;

type Lang = keyof typeof copy;
// Relative asset URLs work both at the Sites domain root and in the
// /gotcha-landing/ subdirectory used by GitHub Pages.
const asset = (path: string) => `.${path.startsWith("/") ? path : `/${path}`}`;
const languages: { code: Lang; label: string }[] = [
  { code: "zh", label: "简中" }, { code: "tw", label: "繁中" }, { code: "en", label: "EN" }, { code: "ja", label: "日本語" }, { code: "ko", label: "한국어" },
];

const languageTags: Record<Lang, string> = { zh: "zh-CN", tw: "zh-TW", en: "en", ja: "ja", ko: "ko" };
const screenshotSets: Record<Lang, string[]> = {
  zh: ["spaces", "items", "pin-detail", "pin-map", "edit", "settings"].map((name) => asset(`/screens/zh/${name}.jpg`)),
  tw: ["spaces", "items", "pin-detail", "pin-map", "edit", "settings"].map((name) => asset(`/screens/tw/${name}.jpg`)),
  en: ["spaces", "items", "pin-detail", "pin-map", "edit", "settings"].map((name) => asset(`/screens/en/${name}.jpg`)),
  ja: ["spaces", "items", "pin-detail", "pin-map", "edit", "settings"].map((name) => asset(`/screens/ja/${name}.jpg`)),
  ko: ["spaces", "items", "pin-detail", "pin-map", "edit", "settings"].map((name) => asset(`/screens/ko/${name}.jpg`)),
};
const galleryCopy: Record<Lang, { kicker: string; title: string; lead: string; labels: string[] }> = {
  zh: { kicker: "真实应用界面", title: "每一步，都清楚直观。", lead: "以下截图全部来自简体中文版 Gotcha。切换语言，整组截图会同步切换。", labels: ["建立你的空间", "浏览所有物品", "查看图钉内容", "空间图钉全景", "编辑名称与标签", "隐私与备份设置"] },
  tw: { kicker: "真實應用介面", title: "每一步，都清楚直覺。", lead: "以下截圖全部來自繁體中文版 Gotcha。切換語言，整組截圖會同步切換。", labels: ["建立你的空間", "瀏覽所有物品", "查看圖釘內容", "空間圖釘全景", "編輯名稱與標籤", "隱私與備份設定"] },
  en: { kicker: "Real app screens", title: "Clear at every step.", lead: "Every screen below comes from Gotcha in English. Change the language and the entire gallery changes with it.", labels: ["Build your spaces", "Browse every item", "Open a visual pin", "See the whole space", "Edit names and tags", "Privacy and backup"] },
  ja: { kicker: "実際のアプリ画面", title: "すべての操作が、わかりやすい。", lead: "以下はすべて日本語版Gotchaの画面です。言語を切り替えると、スクリーンショットも一緒に切り替わります。", labels: ["空間を作る", "持ち物を一覧", "ピンの中を見る", "空間全体を確認", "名前とタグを編集", "プライバシーとバックアップ"] },
  ko: { kicker: "실제 앱 화면", title: "모든 단계가 쉽고 명확해요.", lead: "아래 화면은 모두 한국어 Gotcha 앱입니다. 언어를 바꾸면 전체 스크린샷도 함께 바뀝니다.", labels: ["공간 만들기", "모든 물건 보기", "핀 내용 확인", "공간 전체 보기", "이름과 태그 편집", "개인정보와 백업"] },
};

function detectSystemLanguage(): Lang {
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const rawLanguage of preferred) {
    const language = rawLanguage.toLowerCase();
    if (language.startsWith("zh-tw") || language.startsWith("zh-hk") || language.startsWith("zh-mo") || language.includes("hant")) return "tw";
    if (language.startsWith("zh")) return "zh";
    if (language.startsWith("ja")) return "ja";
    if (language.startsWith("ko")) return "ko";
    if (language.startsWith("en")) return "en";
  }
  return "en";
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const [carouselPage, setCarouselPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselViewport = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragPointerId = useRef<number | null>(null);
  const t = copy[lang];
  const gallery = galleryCopy[lang];
  const screens = screenshotSets[lang];
  const carouselPages = Array.from({ length: Math.ceil(screens.length / cardsPerPage) }, (_, index) => screens.slice(index * cardsPerPage, (index + 1) * cardsPerPage));

  useEffect(() => {
    const saved = window.localStorage.getItem("gotcha-language") as Lang | null;
    setLang(saved && saved in copy ? saved : detectSystemLanguage());
  }, []);

  useEffect(() => {
    document.documentElement.lang = languageTags[lang];
    window.localStorage.setItem("gotcha-language", lang);
  }, [lang]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const syncCardsPerPage = () => setCardsPerPage(media.matches ? 1 : 3);
    syncCardsPerPage();
    media.addEventListener("change", syncCardsPerPage);
    return () => media.removeEventListener("change", syncCardsPerPage);
  }, []);

  useEffect(() => setCarouselPage(0), [cardsPerPage]);

  const changeLanguage = (next: Lang) => {
    setLang(next);
    setCarouselPage(0);
  };
  const goToCarouselPage = (next: number) => setCarouselPage((next + carouselPages.length) % carouselPages.length);
  const finishDrag = (clientX: number) => {
    if (dragPointerId.current === null) return;
    const distance = clientX - dragStartX.current;
    const threshold = Math.min(100, (carouselViewport.current?.clientWidth ?? 500) * 0.12);
    if (Math.abs(distance) >= threshold) goToCarouselPage(carouselPage + (distance < 0 ? 1 : -1));
    setDragOffset(0);
    setIsDragging(false);
    dragPointerId.current = null;
  };

  return (
    <main>
      <header className="siteHeader">
        <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Gotcha home"><img src={asset("/images/gotcha-icon.png")} alt="" /><span>Gotcha</span></a>
          <div className="navTools">
            <div className="navLinks"><a href="#features">{t.nav[0]}</a><a href="#how">{t.nav[1]}</a><a href="#privacy">{t.nav[2]}</a><a className="navCta" href="#download">{t.download}</a></div>
            <label className="languageSelect"><span aria-hidden="true">文</span><select value={lang} onChange={(event) => changeLanguage(event.target.value as Lang)} aria-label="Language">{languages.map((item) => <option value={item.code} key={item.code}>{item.label}</option>)}</select></label>
          </div>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="heroCopy">
          <p className="eyebrow"><span /> {t.eyebrow}</p>
          <h1>{t.titleA}<br /><em>{t.titleB}</em></h1>
          <p className="lead">{t.lead}</p>
          <div className="heroActions">
            <a className="button buttonDark" href={appStoreUrls[lang]} target="_blank" rel="noreferrer"><b></b><span><small>Download on the</small>App Store</span></a>
            <a className="button buttonLight" href={androidDownloadUrl} target="_blank" rel="noreferrer"><span className="androidMark">↧</span><span><small>Android APK</small>{t.android}</span></a>
          </div>
          <p className="microcopy">{t.trust.map((item) => <span key={item}>✓ {item}</span>)}</p>
        </div>
        <div className="heroVisual" aria-label="Gotcha app preview">
          <div className="orangeOrb" /><div className="phone phoneMain screenshotSwap" key={`${lang}-hero`}><img src={screens[0]} alt={gallery.labels[0]} width="720" height="1558" fetchPriority="high" /></div>
          <div className="floatingCard"><span className="pinDot">●</span><div><b>{lang === "en" ? "Passport" : lang === "ja" ? "パスポート" : lang === "ko" ? "여권" : "护照"}</b><small>Gotcha · found</small></div><strong>✓</strong></div>
          <div className="brandTile"><img src={asset("/images/gotcha-icon.png")} alt="Gotcha icon" /></div>
        </div>
      </section>

      <section className="section shell" id="features">
        <header className="sectionHeader"><p className="sectionKicker">{t.featureKicker}</p><h2>{t.featureTitle}</h2><p>{t.featureLead}</p></header>
        <div className="featureGrid">{t.features.map(([title, text], index) => <article className="featureCard" key={title}><span className={`featureIcon i${index}`}>{["＋","◎","⌘","⌖","⌕","⇅"][index]}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="showcase" id="how">
        <div className="shell"><header className="sectionHeader light"><p className="sectionKicker">{t.flowKicker}</p><h2>{t.flowTitle}</h2></header>
          <div className="showcaseGrid"><div className="screens screenshotSwap" key={`${lang}-showcase`}><div className="phone phoneBack"><img src={screens[1]} alt={gallery.labels[1]} width="720" height="1558" loading="lazy" /></div><div className="phone phoneFront"><img src={screens[2]} alt={gallery.labels[2]} width="720" height="1558" loading="lazy" /></div></div>
            <ol className="steps">{t.steps.map(([num,title,text]) => <li key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div>
        </div>
      </section>

      <section className="section shell gallerySection" id="screenshots">
        <header className="sectionHeader"><p className="sectionKicker">{gallery.kicker}</p><h2>{gallery.title}</h2><p>{gallery.lead}</p></header>
        <div className="screenCarousel screenshotSwap" key={`${lang}-gallery`}>
          <div ref={carouselViewport} className={`carouselViewport${isDragging ? " dragging" : ""}`} tabIndex={0} aria-label={gallery.title} onKeyDown={(event) => { if (event.key === "ArrowLeft") goToCarouselPage(carouselPage - 1); if (event.key === "ArrowRight") goToCarouselPage(carouselPage + 1); }} onPointerDown={(event) => { if (event.pointerType === "mouse" && event.button !== 0) return; dragStartX.current = event.clientX; dragPointerId.current = event.pointerId; setIsDragging(true); event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={(event) => { if (dragPointerId.current !== event.pointerId) return; const width = carouselViewport.current?.clientWidth ?? 1; setDragOffset(Math.max(-width * 0.45, Math.min(width * 0.45, event.clientX - dragStartX.current))); }} onPointerUp={(event) => finishDrag(event.clientX)} onPointerCancel={(event) => finishDrag(event.clientX)}>
            <div className={`screenGallery${isDragging ? " dragging" : ""}`} style={{ transform: `translateX(calc(-${carouselPage * 100}% + ${dragOffset}px))` }} aria-live="polite">
              {carouselPages.map((page, pageIndex) => <div className="carouselPage" key={`${lang}-${pageIndex}`} aria-hidden={pageIndex !== carouselPage}>{page.map((src) => { const index = screens.indexOf(src); return <figure className="screenCard" key={src}><div className="screenFrame"><img src={src} alt={gallery.labels[index]} width="720" height="1558" loading={pageIndex === 0 ? "eager" : "lazy"} decoding="async" draggable="false" /></div><figcaption><span>{String(index + 1).padStart(2, "0")}</span>{gallery.labels[index]}</figcaption></figure>; })}</div>)}
            </div>
          </div>
          <div className="carouselControls">
            <button className="carouselArrow" type="button" onClick={() => goToCarouselPage(carouselPage - 1)} aria-label="Previous screenshots">←</button>
            <div className="carouselDots" aria-label="Screenshot pages">{carouselPages.map((_, index) => <button type="button" key={index} className={index === carouselPage ? "active" : ""} onClick={() => setCarouselPage(index)} aria-label={`Page ${index + 1}`} aria-current={index === carouselPage ? "true" : undefined} />)}</div>
            <button className="carouselArrow" type="button" onClick={() => goToCarouselPage(carouselPage + 1)} aria-label="Next screenshots">→</button>
          </div>
        </div>
      </section>

      <section className="section shell scenarios"><header className="sectionHeader"><p className="sectionKicker">{t.scenariosKicker}</p><h2>{t.scenariosTitle}</h2></header>
        <div className="scenarioGrid">{t.scenarios.map(([title,text],i)=><article key={title} className={`scenario s${i}`}><span>{["01","02","03"][i]}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="privacy" id="privacy"><div className="shell privacyInner"><div><p className="sectionKicker">{t.privacyKicker}</p><h2>{t.privacyTitle}</h2><p className="privacyText">{t.privacyText}</p><a className="textLink" href="https://skyloveflash1-netizen.github.io/gotcha-privacy/" target="_blank" rel="noreferrer">{t.privacyLink} ↗</a></div>
        <div className="privacyCard"><div className="shield">⌂<span>✓</span></div>{t.privacyItems.map(item=><p key={item}><span>✓</span>{item}</p>)}</div></div></section>

      <section className="finalCta" id="download"><div className="shell finalInner"><img src={asset("/images/gotcha-icon.png")} alt="Gotcha" /><h2>{t.finalTitle.split("\n").map((line)=><span key={line}>{line}</span>)}</h2><p>{t.finalLead}</p><div className="finalActions"><a className="button buttonDark finalButton" href={appStoreUrls[lang]} target="_blank" rel="noreferrer"><b></b><span><small>Download on the</small>App Store</span></a><a className="button buttonLight finalButton" href={androidDownloadUrl} target="_blank" rel="noreferrer"><span className="androidMark">↧</span><span><small>Android APK</small>{t.android}</span></a></div></div></section>

      <footer><div className="shell footerInner"><div className="brand"><img src={asset("/images/gotcha-icon.png")} alt="" /><span>Gotcha</span></div><p>{t.footer}</p><a href="https://skyloveflash1-netizen.github.io/gotcha-privacy/" target="_blank" rel="noreferrer">{t.privacyLink}</a></div>
        <div className="shell languageBar" aria-label="Language">{languages.map(item=><button className={lang===item.code?"active":""} key={item.code} onClick={()=>changeLanguage(item.code)} aria-pressed={lang===item.code}>{item.label}</button>)}</div>
      </footer>
    </main>
  );
}
