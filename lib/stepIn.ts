import type { Locale } from "@/lib/locale";

// Everything a person meets on the way in — the /step-in page, its form, the
// API's replies and the invitation mail — in all four locales, one source.
// EN is the canonical register; DE/ZH/TH are Claude's rendering for Johannes'
// eye (docs/BRIEFING-STEP-IN-FOUR-LANGUAGES.md). "agenticjournaling" stays
// unmodified in every locale. {name} and {email} are filled at render time.

export type StepInStrings = {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  insideHeading: string;
  inside: string[];
  note: string;
  sub: string;
  formIntro: string;
  form: {
    firstName: string;
    lastName: string;
    timeZone: string;
    tzPlaceholder: string;
    email: string;
    send: string;
    sending: string;
    help: string;
    confirm: string;
    nudge: string;
    hiccup: string;
    hiccupTail: string;
  };
  mail: {
    subject: string;
    preheader: string;
    title: string;
    tagline: string;
    hi: string;
    body1: string;
    body2: string;
    cta: string;
    device: string;
    nextHeading: string;
    nextBody: string;
    languagesHeading: string;
    languages: string;
    signoff: string;
    madeBy: string;
  };
};

export const STEP_IN: Record<Locale, StepInStrings> = {
  en: {
    metaTitle: "Step in",
    metaDescription:
      "agenticjournaling is a young, private journaling practice – yours to use, in your language. Share your details and your invitation arrives in your inbox.",
    heading: "Step in and have a seat",
    intro:
      "agenticjournaling is young, and it’s yours to use – in your language, at your own pace. I carry the costs for now and I am curious what it does for people – for people like you.",
    insideHeading: "What’s inside",
    inside: [
      "A room where you write as the part that is loudest today – and are met, not managed.",
      "A map of your parts, and how they relate to each other.",
      "What you’ve already written, brought in – searchable, readable by month and year.",
      "A key of your own, or mine for now – your choice, in settings.",
      "Everything stays on your device. Nothing here is measured.",
    ],
    note: "Available in English, German, Chinese and Thai.",
    sub: "A few details, and your invitation is on its way.",
    formIntro: "Have a seat – and tell me, when you like, what you notice.",
    form: {
      firstName: "First name",
      lastName: "Last name",
      timeZone: "Time zone",
      tzPlaceholder: "Start typing – e.g. Berlin",
      email: "Email",
      send: "Send my invitation",
      sending: "Sending…",
      help: "Enter your details and your invitation arrives in your inbox, in a moment.",
      confirm: "Your invitation is on its way – check your inbox.",
      nudge: "Could you check that email address? Then we’ll send it right over.",
      hiccup: "Something hiccuped on our side.",
      hiccupTail:
        "You can also write directly to {email} with your name and time zone, and we’ll bring you in.",
    },
    mail: {
      subject: "Your agenticjournaling invitation, {name}",
      preheader: "agenticjournaling is ready – step in, in your language.",
      title: "Your agenticjournaling invitation",
      tagline: "Meet yourself – lead your way home.",
      hi: "Hi {name},",
      body1:
        "You asked to step in – I’m glad you’re here. agenticjournaling is ready, and it’s yours to explore.",
      body2:
        "It’s a quiet, private place to meet the parts of you that carry the day, in your own words and at your own pace. Everything stays in your hands.",
      cta: "Step in",
      device: "Best experienced on desktop and tablet.",
      nextHeading: "What’s next?",
      nextBody:
        "Start exploring. Whenever you like, we talk – about what you notice, at your pace. I carry the costs for now and I am curious what it does for people – for people like you. Three things I’d love to hear:",
      languagesHeading: "Your language",
      languages:
        "The app speaks English, German, Chinese and Thai – choose yours in settings.",
      signoff: "With compassion,",
      madeBy: "made by",
    },
  },
  de: {
    metaTitle: "Tritt ein",
    metaDescription:
      "agenticjournaling ist eine junge, private Journaling-Praxis – für dich, in deiner Sprache. Ein paar Angaben, und deine Einladung landet in deinem Postfach.",
    heading: "Tritt ein und nimm Platz",
    intro:
      "agenticjournaling ist jung – und es gehört dir: in deiner Sprache, in deinem Tempo. Die Kosten trage vorerst ich – und ich bin neugierig, was es bei Menschen bewegt. Bei Menschen wie dir.",
    insideHeading: "Was dich erwartet",
    inside: [
      "Ein Raum, in dem du als der Anteil schreibst, der heute am lautesten ist – und gehört wirst, statt sortiert.",
      "Eine Landkarte deiner Anteile – und wie sie zueinander stehen.",
      "Was du schon geschrieben hast, hereingeholt – durchsuchbar, lesbar nach Monat und Jahr.",
      "Ein eigener Schlüssel – oder vorerst meiner. Deine Wahl, in den Einstellungen.",
      "Alles bleibt auf deinem Gerät. Nichts hier wird gemessen.",
    ],
    note: "Verfügbar auf Englisch, Deutsch, Chinesisch und Thai.",
    sub: "Ein paar Angaben – und deine Einladung ist unterwegs.",
    formIntro: "Nimm Platz – und erzähl mir, wann du magst, was du bemerkst.",
    form: {
      firstName: "Vorname",
      lastName: "Nachname",
      timeZone: "Zeitzone",
      tzPlaceholder: "Tippe los – z. B. Berlin",
      email: "E-Mail",
      send: "Einladung schicken",
      sending: "Wird gesendet …",
      help: "Trag deine Angaben ein – deine Einladung landet in einem Moment in deinem Postfach.",
      confirm: "Deine Einladung ist unterwegs – schau in dein Postfach.",
      nudge: "Magst du die E-Mail-Adresse noch einmal prüfen? Dann schicken wir sie gleich los.",
      hiccup: "Bei uns hat etwas gehakt.",
      hiccupTail:
        "Du kannst auch direkt an {email} schreiben, mit Namen und Zeitzone – dann holen wir dich hinein.",
    },
    mail: {
      subject: "Deine Einladung zu agenticjournaling, {name}",
      preheader: "agenticjournaling ist bereit – tritt ein, in deiner Sprache.",
      title: "Deine Einladung zu agenticjournaling",
      tagline: "Begegne dir selbst – und finde deinen Weg nach Hause.",
      hi: "Hallo {name},",
      body1:
        "Du wolltest eintreten – ich freue mich, dass du da bist. agenticjournaling ist bereit, und es gehört dir.",
      body2:
        "Es ist ein stiller, privater Ort, um den Anteilen in dir zu begegnen, die den Tag tragen – in deinen Worten, in deinem Tempo. Alles bleibt in deinen Händen.",
      cta: "Tritt ein",
      device: "Am besten am Computer oder Tablet.",
      nextHeading: "Wie geht es weiter?",
      nextBody:
        "Fang einfach an. Wann immer du magst, sprechen wir – über das, was du bemerkst, in deinem Tempo. Die Kosten trage vorerst ich – und ich bin neugierig, was es bei Menschen bewegt. Bei Menschen wie dir. Drei Dinge, die ich gern hören würde:",
      languagesHeading: "Deine Sprache",
      languages:
        "Die App spricht Englisch, Deutsch, Chinesisch und Thai – wähle deine in den Einstellungen.",
      signoff: "Mit Mitgefühl,",
      madeBy: "gemacht von",
    },
  },
  zh: {
    metaTitle: "走进来",
    metaDescription:
      "agenticjournaling 是一种年轻而私密的书写练习——属于你，用你的语言。留下几项信息，邀请就会送到你的邮箱。",
    heading: "走进来，坐下吧",
    intro:
      "agenticjournaling 还很年轻，而它属于你——用你的语言，按你的节奏。费用目前由我承担——我很好奇它会为人们带来什么。为像你这样的人。",
    insideHeading: "里面有什么",
    inside: [
      "一个房间，让你以今天最响亮的那个部分来书写——被倾听，而不是被整理。",
      "一张你内在部分的地图，以及它们彼此之间的关系。",
      "你已经写下的文字，带进来——可以搜索，按月、按年阅读。",
      "你自己的密钥，或者暂时用我的——由你选择，在设置里。",
      "一切都留在你的设备上。这里没有任何东西被衡量。",
    ],
    note: "提供英文、德文、中文和泰文。",
    sub: "留下几项信息，邀请就在路上。",
    formIntro: "坐下吧——想说的时候，告诉我你注意到了什么。",
    form: {
      firstName: "名字",
      lastName: "姓氏",
      timeZone: "时区",
      tzPlaceholder: "开始输入——例如 Shanghai",
      email: "邮箱",
      send: "发送我的邀请",
      sending: "正在发送……",
      help: "填写你的信息，邀请片刻之后就会送到你的邮箱。",
      confirm: "你的邀请已在路上——请查看邮箱。",
      nudge: "能再确认一下邮箱地址吗？确认后我们马上发送。",
      hiccup: "我们这边出了点小问题。",
      hiccupTail: "你也可以直接写信到 {email}，附上你的名字和时区，我们会把你带进来。",
    },
    mail: {
      subject: "你的 agenticjournaling 邀请，{name}",
      preheader: "agenticjournaling 已经准备好——走进来，用你的语言。",
      title: "你的 agenticjournaling 邀请",
      tagline: "遇见你自己，温柔地走回家。",
      hi: "{name}，你好，",
      body1: "你请求走进来——很高兴你在这里。agenticjournaling 已经准备好，它属于你，等你探索。",
      body2:
        "这是一个安静、私密的地方，让你遇见那些撑起一天的内在部分——用你自己的话，按你自己的节奏。一切都在你手中。",
      cta: "走进来",
      device: "在电脑和平板上体验最佳。",
      nextHeading: "接下来呢？",
      nextBody:
        "开始探索吧。只要你愿意，我们随时可以聊聊——聊你注意到的事，按你的节奏。费用目前由我承担——我很好奇它会为人们带来什么。为像你这样的人。我很想听到的三件事：",
      languagesHeading: "你的语言",
      languages: "这个应用会说英文、德文、中文和泰文——在设置里选择你的语言。",
      signoff: "带着慈悲，",
      madeBy: "制作者",
    },
  },
  th: {
    metaTitle: "ก้าวเข้ามา",
    metaDescription:
      "agenticjournaling คือแนวปฏิบัติการเขียนบันทึกที่ยังเยาว์วัยและเป็นส่วนตัว — เป็นของคุณ ในภาษาของคุณ กรอกข้อมูลเล็กน้อย แล้วคำเชิญจะส่งถึงกล่องจดหมายของคุณ",
    heading: "ก้าวเข้ามา แล้วนั่งลง",
    intro:
      "agenticjournaling ยังเยาว์วัย และมันเป็นของคุณ — ในภาษาของคุณ ตามจังหวะของคุณ ตอนนี้ฉันเป็นผู้รับผิดชอบค่าใช้จ่าย — และฉันอยากรู้ว่ามันทำอะไรให้ผู้คนบ้าง สำหรับคนอย่างคุณ",
    insideHeading: "ข้างในมีอะไร",
    inside: [
      "ห้องที่คุณเขียนในฐานะส่วนที่เสียงดังที่สุดในวันนี้ — และได้รับการรับฟัง ไม่ใช่ถูกจัดการ",
      "แผนที่ของส่วนต่าง ๆ ในตัวคุณ และความสัมพันธ์ระหว่างพวกเขา",
      "สิ่งที่คุณเคยเขียนไว้ นำเข้ามา — ค้นหาได้ อ่านได้ตามเดือนและปี",
      "กุญแจของคุณเอง หรือของฉันไปก่อน — คุณเลือกได้ในการตั้งค่า",
      "ทุกอย่างอยู่บนอุปกรณ์ของคุณ ไม่มีสิ่งใดที่นี่ถูกวัด",
    ],
    note: "มีให้ใช้ในภาษาอังกฤษ เยอรมัน จีน และไทย",
    sub: "กรอกข้อมูลเล็กน้อย แล้วคำเชิญของคุณก็กำลังเดินทางมา",
    formIntro: "นั่งลงเถอะ — แล้วเล่าให้ฉันฟังเมื่อคุณพร้อม ว่าคุณสังเกตเห็นอะไร",
    form: {
      firstName: "ชื่อ",
      lastName: "นามสกุล",
      timeZone: "เขตเวลา",
      tzPlaceholder: "เริ่มพิมพ์ — เช่น Bangkok",
      email: "อีเมล",
      send: "ส่งคำเชิญให้ฉัน",
      sending: "กำลังส่ง…",
      help: "กรอกข้อมูลของคุณ แล้วคำเชิญจะถึงกล่องจดหมายในอีกสักครู่",
      confirm: "คำเชิญของคุณกำลังเดินทางมา — ลองดูในกล่องจดหมาย",
      nudge: "ช่วยตรวจสอบอีเมลอีกครั้งได้ไหม แล้วเราจะส่งให้ทันที",
      hiccup: "มีบางอย่างติดขัดทางฝั่งเรา",
      hiccupTail: "คุณสามารถเขียนตรงมาที่ {email} พร้อมชื่อและเขตเวลาของคุณ แล้วเราจะพาคุณเข้ามา",
    },
    mail: {
      subject: "คำเชิญ agenticjournaling ของคุณ, {name}",
      preheader: "agenticjournaling พร้อมแล้ว — ก้าวเข้ามา ในภาษาของคุณ",
      title: "คำเชิญ agenticjournaling ของคุณ",
      tagline: "พบกับตัวเอง แล้วค่อย ๆ พาใจกลับบ้าน",
      hi: "สวัสดี {name}",
      body1: "คุณขอก้าวเข้ามา — ดีใจที่คุณอยู่ที่นี่ agenticjournaling พร้อมแล้ว และมันเป็นของคุณให้สำรวจ",
      body2:
        "ที่นี่คือพื้นที่เงียบสงบและเป็นส่วนตัว สำหรับพบกับส่วนต่าง ๆ ในตัวคุณที่แบกรับวันนี้ — ด้วยคำพูดของคุณเอง ตามจังหวะของคุณ ทุกอย่างอยู่ในมือคุณ",
      cta: "ก้าวเข้ามา",
      device: "ใช้งานได้ดีที่สุดบนคอมพิวเตอร์และแท็บเล็ต",
      nextHeading: "แล้วต่อจากนี้?",
      nextBody:
        "เริ่มสำรวจได้เลย เมื่อใดที่คุณต้องการ เรามาคุยกัน — เรื่องสิ่งที่คุณสังเกตเห็น ตามจังหวะของคุณ ตอนนี้ฉันเป็นผู้รับผิดชอบค่าใช้จ่าย — และฉันอยากรู้ว่ามันทำอะไรให้ผู้คนบ้าง สำหรับคนอย่างคุณ สามสิ่งที่ฉันอยากฟัง:",
      languagesHeading: "ภาษาของคุณ",
      languages: "แอปนี้พูดภาษาอังกฤษ เยอรมัน จีน และไทย — เลือกภาษาของคุณได้ในการตั้งค่า",
      signoff: "ด้วยความเมตตา,",
      madeBy: "สร้างโดย",
    },
  },
};

export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");
}
