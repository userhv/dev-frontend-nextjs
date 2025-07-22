"use client";
import { useRouter } from 'next/navigation';
import { ArrowLeftCircle } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();
  function handleBack() {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push('/');
    }
  }
  return (
    <button
      type="button"
      aria-label="Voltar"
      onClick={handleBack}
      className="px-4 py-2 rounded-lg flex items-center gap-2 font-semibold shadow-sm transition bg-blue-600 hover:bg-blue-700 text-white text-base mb-4 cursor-pointer"
    >
      <ArrowLeftCircle className="w-6 h-6" /> Voltar
    </button>
  );
}
