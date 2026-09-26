import "../index.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import YandexMetrika from "../components/YandexMetrika";
import { YANDEX_COUNTER_ID } from "../lib/yandexMetrika";
import { Toaster } from "react-hot-toast";
import CookieConsent from "../components/CookieConsent";
import FunnelAnalytics from "../components/FunnelAnalytics";

const manrope = localFont({
  src: [
    { path: "./fonts/manrope-regular.ttf", weight: "400 500" },
    { path: "./fonts/manrope-bold.ttf", weight: "600 800" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

const unbounded = localFont({
  src: "./fonts/unbounded-bold.ttf",
  variable: "--font-unbounded",
  display: "swap",
  weight: "500 900",
});

export const metadata = {
  title: "ЛЮМИКА — Программирование для детей: Scratch, JavaScript и Go",
  description:
    "Онлайн-школа программирования для детей и подростков. Создаём игры, сайты и приложения. Подбираем программу по возрасту, интересам и уровню ребёнка.",
  icons: {
    icon: "/favicon.ico?v=2",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${unbounded.variable}`}>
      <body className={`${manrope.className} antialiased`}>
        {children}
        <CookieConsent />
        <Analytics />
        <Suspense fallback={null}>
          <YandexMetrika />
        </Suspense>
        <noscript>
          {/* The tracking pixel is deliberately a plain image inside noscript. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://mc.yandex.ru/watch/${YANDEX_COUNTER_ID}`} width="1" height="1" style={{ position: "absolute", left: "-9999px" }} alt="" referrerPolicy="no-referrer" />
        </noscript>
        <FunnelAnalytics />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#111111",
              border: "1px solid #ececec",
              fontFamily: "var(--font-manrope), Manrope, system-ui, sans-serif",
            },
            success: {
              iconTheme: { primary: "#111111", secondary: "#ffffff" },
            },
            error: { iconTheme: { primary: "#ef4444", secondary: "#ffffff" } },
          }}
        />
      </body>
    </html>
  );
}
