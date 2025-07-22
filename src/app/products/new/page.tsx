"use client";
import { createProduct } from '@/services/products';
import ProductForm from '@/features/products/ProductForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: any) {
    setLoading(true);
    setError(null);
    try {
      await createProduct(data);
      router.push('/');
    } catch {
      setError('Erro ao criar produto.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Novo Produto</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <ProductForm onSubmit={handleSubmit} loading={loading} submitLabel="Criar" />
    </div>
  );
}
