import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BetterBuy",
  description: "Personal Project of Gil Jeremy Ditablan",
  icons: {
    icon: [
      { url: "/money.png", type: "png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased flex min-h-screen flex-col`}
      >
        <Header />

        <main className="flex-1 px-5">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
