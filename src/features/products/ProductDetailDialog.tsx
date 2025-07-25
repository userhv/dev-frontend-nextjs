
import Image from 'next/image';
import { Product } from '@/services/types';
import React, { useEffect } from 'react';
import { useDevice } from '@/hooks/useDevice';

interface ProductDetailDialogProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export const ProductDetailDialog = ({ product, open, onClose }: ProductDetailDialogProps) => {
  const { isMobile } = useDevice();
  
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
      <div className={`relative z-10 w-full ${isMobile ? 'mx-2 max-w-[calc(100vw-16px)]' : 'mx-4 max-w-2xl'} max-h-[95vh] sm:max-h-[90vh] bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100 pr-2">
            {isMobile ? 'Detalhes' : 'Detalhes do Produto'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-60px)] sm:max-h-[calc(90vh-80px)] p-3 sm:p-6">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8'}`}>
            {/* Image Section */}
            <div className="flex flex-col order-1 lg:order-1">
              <div className={`${isMobile ? 'aspect-[4/3]' : 'aspect-square'} bg-gray-50 dark:bg-gray-700 rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4`}>
                <Image 
                  src={product.image} 
                  alt={product.title} 
                  width={400} 
                  height={400} 
                  className="w-full h-full object-contain p-2 sm:p-4" 
                />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col space-y-4 sm:space-y-6 order-2 lg:order-2">
              {/* Title */}
              <div>
                <h1 className={`${isMobile ? 'text-lg' : 'text-xl sm:text-2xl lg:text-3xl'} font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight`}>
                  {product.title}
                </h1>
              </div>

              {/* Category and Price - Mobile Stack */}
              <div className="flex flex-col gap-3">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 w-fit">
                  {product.category}
                </span>
                <span className={`${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'} font-bold text-green-600 dark:text-green-400`}>
                  R$ {product.price}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className={`${isMobile ? 'text-sm' : 'text-base sm:text-lg'} font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3`}>
                  Descrição
                </h3>
                <div className={`${isMobile ? 'text-sm' : 'text-sm sm:text-base'} text-gray-600 dark:text-gray-400 leading-relaxed`}>
                  <p className="whitespace-pre-wrap break-words overflow-wrap-anywhere">
                    {product.description}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
