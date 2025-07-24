
import { useState } from 'react';
import {ProductForm} from './ProductForm';
import { Product } from '@/services/types';
import { Dialog, DialogTitle } from '@/components/ui/dialog';

interface EditProductDialogProps {
  product: Product;
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  categories?: string[];
}

export const EditProductDialog = ({ product, open, onClose, onSave, categories }: EditProductDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={open => { if (!open) onClose(); }}>
      <div className="flex flex-col items-center p-2 sm:p-4 bg-white w-full max-w-6xl mx-auto focus:outline-none relative">
        <div className="flex items-center w-full mb-2 px-2 sm:px-4">
          <DialogTitle>
            <span id="edit-product-title" className="text-xl sm:text-2xl font-bold text-gray-800 text-left">Editar informações</span>
          </DialogTitle>
          <button
            aria-label="Fechar"
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:bg-gray-100 text-2xl font-bold leading-none cursor-pointer transition ml-auto"
            onClick={onClose}
            tabIndex={0}
            autoFocus
          >
            <span className="sr-only">Fechar</span>
            ×
          </button>
        </div>
        <div className="w-full">
          <ProductForm
            initialData={product}
            onSubmit={async (data) => {
              setLoading(true);
              setError(null);
              try {
                await onSave(data);
                onClose();
              } catch (e: any) {
                setError(e?.message || 'Erro ao salvar.');
              } finally {
                setLoading(false);
              }
            }}
            loading={loading}
            submitLabel="Salvar"
            categories={categories}
          />
          {error && <div className="text-red-600 text-sm mt-2 text-center">{error}</div>}
        </div>
      </div>
    </Dialog>
  );
};
