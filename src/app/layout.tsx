import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inconsolata } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/providers/theme-provider";
import { ThemeToggler } from "./_components/ui/theme-toggler";

const mainFont = Inconsolata({
  subsets: ["latin"],
  variable: "--font-main",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${mainFont.variable}`} suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <div className="fixed end-4 top-4">
              <ThemeToggler />
            </div>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://angryoss.com"),
  title: {
    default: "AngryOSS",
    template: "%s | AngryOSS",
  },
  description:
    "AngryOSS is where anger turns into open‑source tools, coins, chains, and platforms—owned by no one, built for everyone.",
  keywords: [
    "open source",
    "blockchain",
    "cryptocurrency",
    "decentralization",
    "DAO",
    "Solana",
    "Web3",
    "tools",
    "coins",
    "platforms",
    "AngryOSS",
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "AngryOSS – anger turned into code & coin.",
    description:
      "Tired of corporate runarounds? AngryOSS empowers you with open‑source tools, tokens, and chains to build freely.",
    url: "https://angryoss.com",
    siteName: "AngryOSS",
    images: [
      {
        url: "https://angryoss.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "AngryOSS logo on a bold black background",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AngryOSS",
    description:
      "AngryOSS: building open‑source tools, coins & chains—no middlemen, no limits.",
    creator: "@angryoss",
    images: ["https://angryoss.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
