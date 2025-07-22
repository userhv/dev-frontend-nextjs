"use client";
import { Product } from '@/services/types';
import ProductForm from '@/features/products/ProductForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EditProductClient({ product, id }: { product: Product; id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: Partial<Product>) {
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
      <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <ProductForm initialData={product} onSubmit={handleSubmit} loading={loading} submitLabel="Salvar" />
    </div>
  );
}
