"use client";
import { useState } from "react";
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Preencha todos os campos para continuar.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      if (!ok) {
        setError("Usuário ou senha inválidos.");
        setLoading(false);
      }
    }, 600);
  }


  function handleLogout() {
    logout();
    setEmail("");
    setPassword("");
    setError("");
  }

  if (isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="w-full max-w-sm flex flex-col items-center">
          <div className="mb-6 sm:mb-8 text-center">
            <span className="text-xl sm:text-2xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight drop-shadow-sm select-none">MaxUp Produtos</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full flex flex-col gap-4 sm:gap-6 border border-gray-100 dark:border-gray-700 items-center">
            <h1 className="text-lg sm:text-xl font-semibold text-center text-blue-700 dark:text-blue-400 mb-2">Você já está logado!</h1>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold shadow-sm transition bg-red-600 hover:bg-red-700 text-white text-base focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 mt-2 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 relative px-4 py-8">      
      <div className="w-full max-w-md mx-auto flex flex-col">
        <div className="mb-6 sm:mb-8 text-center select-none">
          <div className="flex justify-center mb-2">
            <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold text-2xl sm:text-3xl shadow">M</span>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight drop-shadow-sm">MaxUp Produtos</span>
          <div className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-1">Painel de gestão de produtos</div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl shadow-xl p-6 sm:p-8 w-full flex flex-col gap-4 sm:gap-6 border border-gray-100 dark:border-gray-700"
          autoComplete="off"
          aria-label="Login no sistema"
        >
          <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-2">Acesse sua conta</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Login</label>
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Digite o login"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 transition text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none shadow-sm placeholder-gray-400 dark:placeholder-gray-500"
              autoFocus
              autoComplete="username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite a senha"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 transition text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none shadow-sm placeholder-gray-400 dark:placeholder-gray-500"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded p-3 text-xs sm:text-sm animate-fade-in justify-center text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 rounded-lg font-semibold shadow-sm transition bg-blue-600 hover:bg-blue-700 text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer mt-2 disabled:opacity-60 min-h-[48px]"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            ) : (
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            )}
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <div className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2 leading-relaxed">
            <div>Login: <b className="text-gray-600 dark:text-gray-400">maxup</b></div>
            <div>Senha: <b className="text-gray-600 dark:text-gray-400">maxup</b></div>
          </div>
        </form>
      </div>
    </main>
  );
}
