import type { Metadata, Viewport } from "next";
import { Manrope, Geologica } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const display = Geologica({
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const SITE_URL = "https://pravilnaya-lokaciya.ru";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Правильная Локация. Независимая инвестиционная экспертиза",
    template: "%s · Правильная Локация",
  },
  description:
    "Независимая инвестиционная экспертиза и аналитика недвижимости и бизнеса. Мы не продаём объекты, мы защищаем ваши деньги: анализ локации, рисков и реальной доходности до сделки.",
  keywords: [
    "инвестиции в недвижимость",
    "анализ недвижимости",
    "due diligence",
    "коммерческая недвижимость",
    "второе мнение",
    "инвестиционная экспертиза",
  ],
  authors: [{ name: "Правильная Локация" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Правильная Локация",
    title: "Правильная Локация. Независимая инвестиционная экспертиза",
    description:
      "Мы не продаём объекты. Мы защищаем ваши деньги при покупке недвижимости и бизнеса.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Правильная Локация",
    description:
      "Независимая инвестиционная экспертиза недвижимости и бизнеса.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${sans.variable} ${display.variable} antialiased`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
