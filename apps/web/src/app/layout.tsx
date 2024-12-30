import "@weekly-eats/ui/globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Provider as AnalyticsProvider } from "@weekly-eats/analytics/client";
import { cn } from "@weekly-eats/ui/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import localFont from "next/font/local";

const DepartureMono = localFont({
  src: "../fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tryweeklyeats.com"),
  title: "Weekly Eats",
  description: "The easiest way to plan what your family is eating this week!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${DepartureMono.variable} ${GeistSans.variable} ${GeistMono.variable}`,
          "antialiased",
        )}
      >
        <Header />
        {children}
        <Footer />

        <AnalyticsProvider />
      </body>
    </html>
  );
}
