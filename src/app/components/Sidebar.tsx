"use client";
import Link from 'next/link';
import { Home, PlusCircle, List, Menu } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      {/* Mobile menu button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <Menu className="w-6 h-6 text-gray-700" />
        <span className="sr-only">Menu</span>
      </button>
      {/* Sidebar drawer for mobile */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-lg z-30 transform transition-transform duration-200 ease-in-out flex flex-col py-6 px-2 gap-2 ${open ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:w-56`}
        aria-label="Menu lateral"
        tabIndex={-1}
      >
        <nav className="flex flex-col gap-2 mt-12 sm:mt-0" aria-label="Navegação principal">
          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${pathname === '/' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
            tabIndex={0}
            onClick={() => setOpen(false)}
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            <Home className="w-5 h-5" />
            <span>Produtos</span>
          </Link>
          <Link
            href="/products/new"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${pathname === '/products/new' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
            tabIndex={0}
            onClick={() => setOpen(false)}
            aria-current={pathname === '/products/new' ? 'page' : undefined}
          >
            <PlusCircle className="w-5 h-5" />
            <span>Novo Produto</span>
          </Link>
        </nav>
      </aside>
      {/* Overlay for mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 sm:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
