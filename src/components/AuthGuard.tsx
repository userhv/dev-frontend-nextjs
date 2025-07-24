"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn && pathname !== '/login') {
      router.replace('/login');
    }
    if (isLoggedIn && pathname === '/login') {
      router.replace('/');
    }
  }, [pathname, router]);
  return <>{children}</>;
};
