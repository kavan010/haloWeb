import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Halo — the AI teacher that draws on your screen",
  description:
    "Halo is a friendly AI teacher that lives on your screen, draws things out, and explains anything. Download for Mac or Windows.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
