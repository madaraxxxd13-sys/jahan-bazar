import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "جهان‌بازار | دکه‌ت رو به دنیا نشون بده",
  description:
    "پلتفرمی که کسب‌وکار کوچیکت رو به مشتری‌های سراسر دنیا وصل می‌کند.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lalezar&family=Vazirmatn:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#0F1521" />
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}
