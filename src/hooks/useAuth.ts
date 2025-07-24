import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    const onStorage = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function login(user: string, pass: string) {
    if (user === 'maxup' && pass === 'maxup') {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      router.push('/');
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/login');
  }

  return { isLoggedIn, login, logout };
}
