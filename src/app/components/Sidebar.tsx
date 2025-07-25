"use client";
import Link from 'next/link';
import { Home, LogOut, Menu, UserCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Tooltip } from '@/components/ui/tooltip';

export const Sidebar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    const onStorage = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/login');
  }

  const closeSidebarOnNavigate = () => {
    if (window.innerWidth < 640) setSidebarOpen(false);
  };

  return (
    <>
      <button
        className="sm:hidden fixed top-3 left-3 z-50 p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-label={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setSidebarOpen((v) => !v)}
        style={{ minWidth: 44, minHeight: 44 }}
      >
        <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <span className="sr-only">Menu</span>
      </button>
      <aside
        className={`fixed top-0 left-0 h-screen w-4/5 max-w-xs sm:w-52 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-40 flex flex-col py-6 px-2 gap-0 overflow-y-auto transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        aria-label="Menu lateral"
        tabIndex={-1}
        style={{ transitionProperty: 'transform, box-shadow', willChange: 'transform' }}
      >
        {isLoggedIn && (
          <div className="flex items-center gap-3 px-2 mb-4 text-gray-700 dark:text-gray-300 text-base animate-fade-in">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-lg shadow"><UserCircle2 className="w-6 h-6" /></span>
            <div className="flex flex-col">
              <span className="font-semibold leading-tight text-sm">maxup</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">Admin</span>
            </div>
          </div>
        )}

        <div className="border-b border-gray-100 mb-2" />

        <nav className="flex flex-col gap-2 mt-2 px-1" aria-label="Navegação principal">
          <Tooltip content="Visualizar e gerenciar produtos" position="right">
            <Link
              href="/"
              className={`flex items-center gap-3 px-3 py-3 rounded-lg font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 group text-base tracking-tight w-full ${pathname === '/' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-inner border-l-4 border-blue-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              tabIndex={0}
              aria-current={pathname === '/' ? 'page' : undefined}
              title="Produtos"
              onClick={closeSidebarOnNavigate}
            >
              <Home className="w-5 h-5 flex-shrink-0" />
              <span>Produtos</span>
            </Link>
          </Tooltip>
        </nav>
        
        <div className="flex-1" />
        <div className="px-1">
          {isLoggedIn && (
            <Tooltip content="Sair da sua conta" position="right">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-400 mb-2 w-full transition cursor-pointer text-base"
                title="Sair da conta"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span>Sair</span>
              </button>
            </Tooltip>
          )}
          <div className="text-xs text-gray-300 dark:text-gray-600 px-2 mt-2 select-none">v1.0</div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 sm:hidden transition-opacity duration-200"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
