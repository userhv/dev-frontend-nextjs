import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from './components/Sidebar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Produtos | Painel de Gestão",
  description: "Painel de gestão de produtos com Next.js, TypeScript e UI moderna.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-50 min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
