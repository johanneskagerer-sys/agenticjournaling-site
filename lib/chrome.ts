import type { Metadata } from "next";
import { localePath, hreflangAlternates, type Locale } from "@/lib/locale";

// Site chrome strings — homepage, nav, footer — in all four locales.
// DE copy is author-approved verbatim (docs/BRIEFING-SITE-CHROME-FOUR-LANGUAGES.md).
// ZH/TH are AI-drafted from the shipped essay's register and the app's zh/th
// dictionaries for shared terms, same practice as the app's own locales
// (agenticjournaling-app/src/lib/i18n/locale.ts) — first-run copy, native
// review still to come. "agenticjournaling", "First Movers", "Learning to
// Arrive", and "Kickoff" are proper names and stay unmodified in every locale.

type Station = { title: string; body: string };

export type ChromeStrings = {
  metaTitle: string;
  metaDescription: string;
  triad: [string, string, string];
  lead: string;
  subline: string;
  essayLink: string;
  cta: string;
  weeksHeading: string;
  weeksSub: string;
  stations: [Station, Station, Station];
  footerBornFrom: string;
};

export const CHROME: Record<Locale, ChromeStrings> = {
  en: {
    metaTitle: "agenticjournaling — Journal · Relate · Integrate",
    metaDescription:
      "An AI-supported journaling practice where your inner parts speak in their own voice — helping you see, value, and integrate what lives inside you.",
    triad: ["Journal", "Relate", "Integrate"],
    lead: "Where your inner parts have agency — they meet what you journal, speak in their own voice, and come into relationship with you — helping you see, value and integrate what lives inside you.",
    subline: "Built to be inhabited, not subscribed to.",
    essayLink: "What is agentic journaling?",
    cta: "Join the First Movers",
    weeksHeading: "How the cohort works",
    weeksSub:
      "Once your token arrives, you can explore the app. Shortly after, we’ll have our kickoff – I’ll be in touch soon to schedule our first session.",
    stations: [
      {
        title: "Kickoff",
        body: "What was your first impression? What do you sense it’s about, and how it works? Where could it feel easier or clearer?",
      },
      {
        title: "Going deeper",
        body: "What are you starting to see in yourself? What do you find yourself wishing for? And how do the translations feel?",
      },
      {
        title: "Into real life & close",
        body: "Where did it meet a real decision? What shifted for you? Where should the method go next?",
      },
    ],
    footerBornFrom: "Born from",
  },
  de: {
    metaTitle: "agenticjournaling — Schreiben · Begegnen · Integrieren",
    metaDescription:
      "Eine KI-gestützte Journaling-Praxis, in der deine inneren Anteile mit eigener Stimme sprechen – und dir helfen zu sehen, zu würdigen und zu integrieren, was in dir lebt.",
    triad: ["Schreiben", "Begegnen", "Integrieren"],
    lead: "Wo deine inneren Anteile Handlungsraum haben — sie begegnen dem, was du schreibst, sprechen mit eigener Stimme und treten in Beziehung zu dir — damit du sehen, würdigen und integrieren kannst, was in dir lebt.",
    subline: "Gebaut, um bewohnt zu werden – ein Zuhause statt eines Abos.",
    essayLink: "Was ist agentic journaling?",
    cta: "Werde Teil der First Movers",
    weeksHeading: "So funktioniert die Kohorte",
    weeksSub:
      "Sobald dein Token ankommt, kannst du die App erkunden. Kurz darauf folgt unser Kickoff – ich melde mich bald bei dir, um unsere erste Session zu planen.",
    stations: [
      {
        title: "Kickoff",
        body: "Was war dein erster Eindruck? Worum geht es deinem Gefühl nach — und wie funktioniert es? Wo könnte es sich leichter oder klarer anfühlen?",
      },
      {
        title: "Tiefer gehen",
        body: "Was beginnst du in dir zu sehen? Was wünschst du dir? Und wie fühlen sich die Übersetzungen an?",
      },
      {
        title: "Ins echte Leben & Abschluss",
        body: "Wo hat es eine echte Entscheidung berührt? Was hat sich für dich verändert? Wohin darf die Methode als Nächstes gehen?",
      },
    ],
    footerBornFrom: "Entstanden aus",
  },
  zh: {
    metaTitle: "agenticjournaling — 书写 · 相遇 · 整合",
    metaDescription:
      "一种由 AI 支持的书写练习，你的内在部分用自己的声音说话——帮助你看见、珍视并整合内心所拥有的一切。",
    triad: ["书写", "相遇", "整合"],
    lead: "你的内在部分在这里拥有能动性——它们回应你写下的文字，用自己的声音说话，并与你建立关系——帮助你看见、珍视并整合内心所拥有的一切。",
    subline: "生来是要被居住，而不是被订阅。",
    essayLink: "什么是 agentic journaling？",
    cta: "加入 First Movers",
    weeksHeading: "这一期如何运作",
    weeksSub:
      "你的邀请令牌一到，就可以开始探索这个应用。不久之后，我们会有一次 Kickoff——我会尽快联系你，安排我们的第一次对话。",
    stations: [
      {
        title: "Kickoff",
        body: "你的第一印象是什么？你感觉它是关于什么、又是如何运作的？哪里可以变得更轻松或更清晰？",
      },
      {
        title: "深入一步",
        body: "你开始在自己身上看见什么？你发现自己在期望什么？这些“翻译”感觉如何？",
      },
      {
        title: "回到真实生活 & 收尾",
        body: "它在哪里触及了一个真实的决定？你身上发生了什么变化？这个方法接下来该走向哪里？",
      },
    ],
    footerBornFrom: "源自",
  },
  th: {
    metaTitle: "agenticjournaling — เขียน · พบกัน · หลอมรวม",
    metaDescription:
      "แนวปฏิบัติการเขียนบันทึกที่มี AI สนับสนุน ซึ่งส่วนต่าง ๆ ภายในตัวคุณพูดด้วยเสียงของตัวเอง — ช่วยให้คุณมองเห็น เห็นคุณค่า และหลอมรวมสิ่งที่มีชีวิตอยู่ภายในตัวคุณ",
    triad: ["เขียน", "พบกัน", "หลอมรวม"],
    lead: "ที่ซึ่งส่วนต่าง ๆ ภายในตัวคุณมีความเป็นผู้กระทำ — พวกเขาตอบรับสิ่งที่คุณเขียน พูดด้วยเสียงของตัวเอง และเข้าสู่ความสัมพันธ์กับคุณ — เพื่อช่วยให้คุณมองเห็น เห็นคุณค่า และหลอมรวมสิ่งที่มีชีวิตอยู่ภายในตัวคุณ",
    subline: "สร้างมาเพื่ออยู่อาศัย ไม่ใช่เพื่อสมัครสมาชิก",
    essayLink: "agentic journaling คืออะไร",
    cta: "เข้าร่วม First Movers",
    weeksHeading: "รุ่นนี้ทำงานอย่างไร",
    weeksSub:
      "เมื่อโทเคนของคุณมาถึง คุณจะเริ่มสำรวจแอปได้ จากนั้นไม่นานเราจะมี Kickoff ด้วยกัน — ฉันจะติดต่อคุณเร็ว ๆ นี้เพื่อนัดครั้งแรกของเรา",
    stations: [
      {
        title: "Kickoff",
        body: "ความประทับใจแรกของคุณคืออะไร คุณรู้สึกว่ามันเกี่ยวกับอะไร และทำงานอย่างไร ตรงไหนที่อาจรู้สึกง่ายขึ้นหรือชัดเจนขึ้นได้บ้าง",
      },
      {
        title: "ลงลึกขึ้น",
        body: "คุณเริ่มเห็นอะไรในตัวเอง คุณพบว่าตัวเองปรารถนาอะไร แล้วการแปลความรู้สึกเหล่านั้นเป็นอย่างไรบ้าง",
      },
      {
        title: "สู่ชีวิตจริง & ปิดท้าย",
        body: "มันไปแตะการตัดสินใจจริงตรงไหน อะไรเปลี่ยนไปสำหรับคุณ วิธีการนี้ควรไปทางไหนต่อ",
      },
    ],
    footerBornFrom: "ถือกำเนิดจาก",
  },
};

export function homeMetadata(locale: Locale): Metadata {
  const strings = CHROME[locale];
  return {
    title: strings.metaTitle,
    description: strings.metaDescription,
    alternates: {
      canonical: `https://agenticjournaling.com${localePath(locale, "home")}`,
      languages: hreflangAlternates("home"),
    },
  };
}
