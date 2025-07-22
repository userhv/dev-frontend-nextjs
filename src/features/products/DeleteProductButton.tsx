"use client";
import { deleteProduct } from '@/services/products';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2, CheckCircle2, XCircle, Trash2, AlertTriangle } from 'lucide-react';
import { Dialog, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

export default function DeleteProductButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await deleteProduct(id);
      setSuccess(true);
      setTimeout(() => router.push('/'), 1200);
    } catch {
      setError('Erro ao excluir produto.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={() => setOpen(true)}
        disabled={loading || success}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold shadow-sm transition bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white justify-center ${loading || success ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Trash2 className="w-5 h-5" />}
        {success ? 'Excluído!' : loading ? 'Excluindo...' : 'Excluir'}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-white min-w-[320px] max-w-md mx-auto">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-3" />
          <div className="text-xl font-bold text-red-700 mb-2 text-center">
            <DialogTitle>Confirmar exclusão</DialogTitle>
          </div>
          <div className="text-center text-gray-700 mb-6">
            <DialogDescription>Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.</DialogDescription>
          </div>
          <div className="flex gap-3 w-full justify-center mt-2">
            <button
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 font-semibold transition min-w-[110px] cursor-pointer"
              onClick={() => setOpen(false)}
              type="button"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 font-semibold transition min-w-[110px] justify-center cursor-pointer"
              onClick={handleDelete}
              disabled={loading}
              type="button"
            >
              {loading && <Loader2 className="animate-spin w-4 h-4" />}
              Excluir
            </button>
          </div>
        </div>
      </Dialog>
      {success && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded p-2 text-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4" /> Produto excluído com sucesso!
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded p-2 text-sm animate-fade-in">
          <XCircle className="w-4 h-4" /> {error}
        </div>
      )}
    </div>
  );
}
