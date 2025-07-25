"use client";
import {Sidebar} from "../app/components/Sidebar";
import { usePathname } from "next/navigation";
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Tooltip } from '@/components/ui/tooltip';
import { useTheme } from '@/contexts/ThemeContext';

export const LayoutWithSidebar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  
  if (pathname === "/login") {
    return <main className="flex flex-col w-full h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">{children}</main>;
  }
  return (
    <>
      <Sidebar />
      <div className="sm:ml-52">
        {/* Header com título e botão de tema */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3 ml-12 sm:ml-0">
            {/* Título MaxUp */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white font-bold text-base sm:text-lg shadow-sm flex-shrink-0">M</span>
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="font-extrabold text-lg sm:text-xl text-blue-700 dark:text-blue-400 tracking-tight truncate">MaxUp</span>
                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0 hidden sm:inline">•</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base truncate hidden sm:inline">Produtos</span>
              </div>
            </div>
            
            {/* Botão de tema */}
            <Tooltip content={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`} position="left">
              <ThemeToggle />
            </Tooltip>
          </div>
        </header>
        
        <main className="w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-8 py-4 min-h-screen">
          {children}
        </main>
      </div>
      
    </>
  );
}
