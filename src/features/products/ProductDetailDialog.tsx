
import Image from 'next/image';
import { Product } from '@/services/types';
import React from 'react';
import { Dialog, DialogDescription } from '@/components/ui/dialog';

interface ProductDetailDialogProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export const ProductDetailDialog = ({ product, open, onClose }: ProductDetailDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={nextOpen => { if (!nextOpen) onClose(); }}>
      <div className="flex flex-col items-center p-2 sm:p-3 rounded-2xl bg-white w-full max-w-md mx-auto focus:outline-none overflow-y-auto max-h-[95dvh] relative min-h-[420px]">
        <div className="w-full flex flex-row items-center justify-between mb-1 mt-0 gap-1">
          <span className="block text-lg sm:text-xl font-bold text-gray-900 px-2 truncate" title={product.title} style={{lineHeight: 1.2}}>{product.title}</span>
          <button
            aria-label="Fechar"
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:bg-gray-100 text-2xl cursor-pointer transition"
            onClick={onClose}
            tabIndex={0}
          >
            <span className="sr-only">Fechar</span>
            ×
          </button>
        </div>
        <div className="h-2 w-full" />
        <div className="rounded-xl flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 mb-2 overflow-hidden bg-transparent">
          <div className="w-full h-full flex items-center justify-center overflow-hidden bg-transparent">
            <Image src={product.image} alt={product.title} width={192} height={192} className="object-contain max-w-full max-h-full bg-transparent" />
          </div>
        </div>
        <div className="flex items-center justify-between w-full mb-1">
          <span className="inline-block text-xs font-semibold uppercase tracking-wide bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{product.category}</span>
          <span className="font-semibold text-lg text-green-700 bg-green-50 px-2 py-0.5 rounded">R$ {product.price}</span>
        </div>
        <DialogDescription>
          <p className="text-sm text-gray-600 text-left mb-2 w-full whitespace-pre-line">{product.description}</p>
        </DialogDescription>
      </div>
    </Dialog>
  );
};
