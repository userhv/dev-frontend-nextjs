
import { useState, useEffect } from 'react';
import {ProductForm} from './ProductForm';
import { Product } from '@/services/types';

interface EditProductDialogProps {
  product: Product;
  open: boolean;
  onClose: () => void;
  onSave: (data: Product) => Promise<void>;
  categories?: string[];
}

export const EditProductDialog = ({ product, open, onClose, onSave, categories }: EditProductDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Desabilitar scroll da página quando o dialog está aberto
  useEffect(() => {
    if (open) {
      // Salvar o scroll atual
      const scrollY = window.scrollY;
      // Desabilitar scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        // Restaurar scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-6xl mx-4 max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Editar Produto
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-4">
          <ProductForm
            initialData={product}
            onSubmit={async (data) => {
              setLoading(true);
              setError(null);
              try {
                await onSave(data as Product);
                onClose();
              } catch (e: unknown) {
                setError((e as Error)?.message || 'Erro ao salvar.');
              } finally {
                setLoading(false);
              }
            }}
            loading={loading}
            submitLabel="Salvar Alterações"
            categories={categories}
          />
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
