"use client";
import { createProduct, getProducts } from '@/services/products';
import {ProductForm} from '@/features/products/ProductForm';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';

const CreateProductPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  React.useEffect(() => {
    setCategoriesLoading(true);
    getProducts().then((products: import('@/services/types').Product[]) => {
      const uniqueCategories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean) as string[];
      setCategories(uniqueCategories);
    }).finally(() => setCategoriesLoading(false));
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, []);

  async function handleSubmit(data: Partial<import('@/services/types').Product>) {
    setLoading(true);
    setError(null);
    try {
      await createProduct(data as import('@/services/types').Product);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push('/');
      }, 1800);
    } catch {
      setError('Erro ao criar produto.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-32px)] py-4 px-1 sm:py-8 sm:px-2 bg-gray-50 dark:bg-gray-900 relative">
      {/* Overlay de sucesso */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/50 animate-fade-in">
          <div className="bg-green-50 dark:bg-green-900/80 border border-green-200 dark:border-green-700 rounded-2xl shadow-2xl p-8 w-full max-w-xs flex flex-col items-center gap-5 animate-fade-in scale-100">
            <CheckCircle2 className="w-16 h-16 text-green-700 dark:text-green-400 mb-2 drop-shadow-xl animate-bounce-in" />
            <div className="text-xl sm:text-2xl font-extrabold text-center text-green-900 dark:text-green-100 tracking-tight drop-shadow-sm bg-green-100 dark:bg-green-800 border border-green-300 dark:border-green-600 rounded-xl px-4 py-3 shadow-lg animate-pulse">
              Produto criado com sucesso!
            </div>
          </div>
        </div>
      )}
      <div className={`w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-0 sm:px-2 md:px-4 transition-all duration-300 ${showSuccess ? 'blur-sm pointer-events-none select-none' : ''}`}>
        {/* Botão de voltar */}
        <div className="mb-4 px-2 sm:px-0">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 cursor-pointer"
            onClick={() => router.back()}
            tabIndex={showSuccess ? -1 : 0}
            aria-label="Voltar para a lista"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Voltar
          </button>
        </div>
        
        <div className="mb-4 sm:mb-6 flex flex-col items-center px-2 sm:px-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight mb-1 text-center">Novo Produto</h1>
          <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm text-center">Preencha os dados para cadastrar um novo produto</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-xl p-2 xs:p-4 sm:p-6 md:p-10 border border-gray-100 dark:border-gray-700 w-full relative">
          {error && (
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 rounded p-2 mb-4 text-xs sm:text-sm animate-fade-in justify-center">
              {error}
            </div>
          )}
          {categoriesLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-10 h-10 text-blue-500 dark:text-blue-400 animate-spin mb-2" />
              <span className="text-blue-700 dark:text-blue-300 font-semibold text-base">Carregando categorias...</span>
            </div>
          ) : (
            <ProductForm onSubmit={handleSubmit} loading={loading} submitLabel="Criar" categories={categories} />
          )}
        </div>
      </div>
    </div>
  );
}
export default CreateProductPage;
