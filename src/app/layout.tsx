import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import { ThemeProvider } from "@/components/ThemeSettings";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://akanimohumoren.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Akanimoh Umoren",
    template: "%s | Akanimoh Umoren",
  },
  description:
    "Data Scientist & Poet. Exploring hidden stories from data through analysis, science, and engineering craft.",
  keywords: [
    "Data Science", "Data Analyst", "Machine Learning", "Poetry",
    "Recommender Systems", "Python", "Portfolio"
  ],
  authors: [{ name: "Akanimoh Umoren", url: siteUrl }],
  creator: "Akanimoh Umoren",
  publisher: "Akanimoh Umoren",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Akanimoh Umoren",
    title: "Akanimoh Umoren",
    description:
      "Data Scientist & Poet. Exploring hidden stories in data through analysis, science, and engineering craft.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Akanimoh Umoren – Data Scientist & Poet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akanimoh Umoren",
    description:
      "Data Scientist & Poet. Exploring hidden stories from data through analysis, science, and engineering craft.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
