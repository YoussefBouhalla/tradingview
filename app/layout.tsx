import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EUR/USD Trading Dashboard",
  description:
    "Public EUR/USD H1, M15, and M5 TradingView charts for visual analysis. No login required.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="bg-zinc-950">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
