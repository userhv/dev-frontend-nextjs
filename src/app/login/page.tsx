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
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-sm flex flex-col items-center">
          <div className="mb-8 text-center">
            <span className="text-2xl font-extrabold text-blue-700 tracking-tight drop-shadow-sm select-none">MaxUp Produtos</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 w-full flex flex-col gap-6 border border-gray-100 items-center">
            <h1 className="text-xl font-semibold text-center text-blue-700 mb-2">Você já está logado!</h1>
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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto flex flex-col">
        <div className="mb-8 text-center select-none">
          <div className="flex justify-center mb-2">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white font-bold text-3xl shadow">M</span>
          </div>
          <span className="text-3xl font-extrabold text-blue-700 tracking-tight drop-shadow-sm">MaxUp Produtos</span>
          <div className="text-sm text-gray-400 mt-1">Painel de gestão de produtos</div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 w-full flex flex-col gap-6 border border-gray-100"
          autoComplete="off"
          aria-label="Login no sistema"
        >
          <h1 className="text-2xl font-bold text-center text-blue-700 mb-2">Acesse sua conta</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-700 text-sm">Login</label>
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Digite o login"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition text-base bg-white outline-none shadow-sm"
              autoFocus
              autoComplete="username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-gray-700 text-sm">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite a senha"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition text-base bg-white outline-none shadow-sm"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-100 rounded p-2 text-xs animate-fade-in justify-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold shadow-sm transition bg-blue-600 hover:bg-blue-700 text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer mt-2 disabled:opacity-60"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            ) : (
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            )}
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <div className="text-xs text-gray-400 text-center mt-2">Login: <b>maxup</b> &bull; Senha: <b>maxup</b></div>
        </form>
      </div>
    </main>
  );
}
