import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {AuthGuard} from '../components/AuthGuard';
import {LayoutWithSidebar} from '../components/LayoutWithSidebar';

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
        <AuthGuard>
          <LayoutWithSidebar>{children}</LayoutWithSidebar>
        </AuthGuard>
      </body>
    </html>
  );
}
