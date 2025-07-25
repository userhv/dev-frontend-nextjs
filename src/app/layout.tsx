import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {AuthGuard} from '../components/AuthGuard';
import {LayoutWithSidebar} from '../components/LayoutWithSidebar';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ToastProvider } from '../components/ui/toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MaxUp - Gestão de Produtos",
  description: "Sistema moderno de gestão de produtos com Next.js, TypeScript e UI responsiva.",
  keywords: "produtos, gestão, dashboard, Next.js",
  authors: [{ name: "MaxUp Team" }],
  creator: "MaxUp",
  publisher: "MaxUp",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" }
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`h-full bg-gray-50 dark:bg-gray-900 ${geistSans.variable} ${geistMono.variable} antialiased transition-colors`}
      >
        <ThemeProvider>
          <ToastProvider>
            <AuthGuard>
              <LayoutWithSidebar>{children}</LayoutWithSidebar>
            </AuthGuard>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
