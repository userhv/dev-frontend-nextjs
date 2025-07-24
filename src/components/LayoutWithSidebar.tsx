"use client";
import {Sidebar} from "../app/components/Sidebar";
import { usePathname } from "next/navigation";

export const LayoutWithSidebar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  if (pathname === "/login") {
    return <main className="flex flex-col w-full h-screen items-center justify-center bg-gray-50">{children}</main>;
  }
  return (
    <>
      <Sidebar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-8">
        {children}
      </main>
    </>
  );
}
