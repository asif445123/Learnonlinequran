export const siteConfig = {
  name: "Learn Online Quran Academy",
  shortName: "LOQA",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.learnonlinequranacademy.com",
  description:
    "Learn Online Quran Academy offers live one-to-one online Quran classes for kids and adults with qualified male teachers: Noorani Qaida, Nazra, Tajweed, Hifz and Islamic studies.",
  keywords: [
    "learn Quran online",
    "online Quran academy",
    "online Quran classes for kids",
    "Quran with Tajweed",
    "Noorani Qaida online",
    "Hifz Quran online",
    "online Quran teacher",
    "Quran tutor",
  ],
  email: "info@learnonlinequranacademy.com",
  phone: "+92 306 9359426",
  whatsapp: "923069359426",
} as const;

export const courses = [
  { title: "Madani Qaida", arabic: "القاعدة المدنية", text: "Start from the Arabic letters and learn correct pronunciation step by step." },
  { title: "Nazra Quran", arabic: "ناظرہ", text: "Read the Holy Quran fluently with proper makharij under a qualified teacher." },
  { title: "Tajweed Course", arabic: "تجويد", text: "Master the rules of Tajweed and recite beautifully the way it was revealed." },
  { title: "Hifz Program", arabic: "حفظ", text: "Memorize the Quran with a structured plan, daily revision and regular tests." },
  { title: "Islamic Studies", arabic: "دينيات", text: "Daily duas, kalimas, salah and basic Islamic manners for children." },
  { title: "Quran Translation", arabic: "ترجمہ", text: "Understand the meaning of the Quran with simple word-by-word translation." },
] as const;

export const faqs = [
  { q: "Do you offer a free trial class?", a: "Yes. Every new student gets a free trial class so you can meet the teacher and check the quality of teaching." },
  { q: "Are the classes one-to-one?", a: "Yes. All classes are live and one-to-one on Zoom, Skype or Google Meet so your child gets full attention." },
  { q: "Who will teach my child?", a: "Our classes are taught by qualified, experienced male teachers who are trained in Tajweed and in teaching children." },
  { q: "Can I choose my own class timing?", a: "Yes. You can choose a time that suits you, with flexible schedules for different time zones." },
  { q: "What device do I need?", a: "A phone, tablet or computer with a stable internet connection, a microphone and a camera is enough." },
] as const;
