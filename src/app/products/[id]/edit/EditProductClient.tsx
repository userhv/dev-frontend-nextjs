"use client";
import { Product } from '@/services/types';
import { ProductForm } from '@/features/products/ProductForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BackButton from '../BackButton';

export const EditProductClient = ({ product, id }: { product: Product; id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: Partial<Product>) => {
    setLoading(true);
    setError(null);
    try {
      const mod = await import('@/services/products');
      await mod.updateProduct(id, data as Product);
      router.push(`/products/${id}`);
    } catch {
      setError('Erro ao atualizar produto.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <BackButton />
      <div className="rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-0 sm:p-4 w-full min-h-[420px] sm:min-h-[480px] flex flex-col justify-center">
        {error && (
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 rounded p-2 mb-4 text-xs sm:text-sm animate-fade-in justify-center">
            {error}
          </div>
        )}
        <ProductForm initialData={product} onSubmit={handleSubmit} loading={loading} submitLabel="Salvar" />
      </div>
    </div>
  );
}