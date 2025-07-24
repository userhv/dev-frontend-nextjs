"use client";
import Link from 'next/link';
import { Home, LogOut, Menu, UserCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
        className="sm:hidden fixed top-3 left-3 z-50 p-3 rounded-xl bg-white border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        aria-label={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setSidebarOpen((v) => !v)}
        style={{ minWidth: 48, minHeight: 48 }}
      >
        <Menu className="w-7 h-7 text-gray-700" />
        <span className="sr-only">Menu</span>
      </button>
      <aside
        className={`fixed top-0 left-0 h-screen w-4/5 max-w-xs sm:w-64 bg-white border-r border-gray-200 shadow-lg z-40 flex flex-col py-6 px-3 gap-0 overflow-y-auto transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        aria-label="Menu lateral"
        tabIndex={-1}
        style={{ transitionProperty: 'transform, box-shadow', willChange: 'transform' }}
      >
        <div className="flex items-center gap-3 px-2 mb-7 select-none h-12">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xl shadow-sm">M</span>
          <span className="font-extrabold text-xl text-blue-700 tracking-tight">MaxUp</span>
        </div>

        {isLoggedIn && (
          <div className="flex items-center gap-4 px-2 mb-4 text-gray-700 text-base animate-fade-in">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-xl shadow"><UserCircle2 className="w-7 h-7" /></span>
            <div className="flex flex-col">
              <span className="font-semibold leading-tight">maxup</span>
              <span className="text-xs text-gray-400">Administrador</span>
            </div>
          </div>
        )}

        <div className="border-b border-gray-100 mb-2" />

        <nav className="flex flex-col gap-2 mt-2" aria-label="Navegação principal">
          <Link
            href="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 group text-base tracking-tight ${pathname === '/' ? 'bg-blue-100 text-blue-700 shadow-inner border-l-4 border-blue-600' : 'hover:bg-gray-100 text-gray-700'}`}
            tabIndex={0}
            aria-current={pathname === '/' ? 'page' : undefined}
            title="Produtos"
            onClick={closeSidebarOnNavigate}
          >
            <Home className="w-6 h-6" />
            <span>Produtos</span>
          </Link>
        </nav>
        <div className="border-b border-gray-100 my-4" />
        <div className="flex-1" />
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 mb-2 w-full transition cursor-pointer text-base"
            title="Sair da conta"
          >
            <LogOut className="w-6 h-6" />
            <span>Sair</span>
          </button>
        )}
        <div className="text-xs text-gray-300 px-2 mt-2 select-none">v1.0</div>
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
