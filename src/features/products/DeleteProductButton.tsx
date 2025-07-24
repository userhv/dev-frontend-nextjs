"use client";

import { deleteProduct } from '@/services/products';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Dialog, DialogTitle, DialogDescription } from '@/components/ui/dialog';


const DeleteProductButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(id);
      router.push('/');
      setOpen(false);
    } catch {
      setError('Erro ao excluir produto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <span
        className="p-2 rounded text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
        onClick={e => { e.stopPropagation(); setOpen(true); }}
        aria-label="Excluir produto"
        role="button"
        tabIndex={0}
        title="Excluir produto"
      >
        <FiTrash2 size={18} />
      </span>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-white min-w-[260px] max-w-xs mx-auto">
          <div className="text-base font-bold text-red-700 mb-1 text-center">
            <DialogTitle>Confirmar exclusão</DialogTitle>
          </div>
          <div className="text-center text-gray-700 mb-3 text-sm">
            <DialogDescription>Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.</DialogDescription>
          </div>
          <div className="flex gap-2 w-full justify-center mt-1">
            <button
              className="px-4 py-2 rounded-full bg-gray-50 text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-blue-200 transition-colors text-sm font-semibold min-w-[90px] cursor-pointer"
              onClick={() => setOpen(false)}
              type="button"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 rounded-full bg-red-500 text-white border border-red-500 shadow-sm hover:bg-white hover:text-red-600 hover:border-red-600 focus:ring-2 focus:ring-red-200 transition-colors text-sm font-semibold min-w-[90px] cursor-pointer flex items-center justify-center gap-2"
              onClick={handleDelete}
              disabled={loading}
              type="button"
            >
              {loading ? (
                <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4 mr-1"></span>
              ) : null}
              {loading ? 'Excluindo...' : 'Excluir'}
            </button>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded p-2 text-xs animate-fade-in mt-2">
              {error}
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};
export default DeleteProductButton;
