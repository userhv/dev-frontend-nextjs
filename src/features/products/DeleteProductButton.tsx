"use client";
import { deleteProduct } from '@/services/products';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteProductButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(id);
      router.push('/');
    } catch {
      setError('Erro ao excluir produto.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button onClick={handleDelete} disabled={loading} className="bg-red-600 text-white px-4 py-2 rounded">
        {loading ? 'Excluindo...' : 'Excluir'}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}
