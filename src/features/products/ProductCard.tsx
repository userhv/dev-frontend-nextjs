

import Image from 'next/image';
import { FiEdit2 } from 'react-icons/fi';
import { useState } from 'react';
import { ProductDetailDialog } from './ProductDetailDialog';
import { EditProductDialog } from './EditProductDialog';
import {DeleteProductButton} from './DeleteProductButton';
import { Product } from '@/services/types';
import { useDevice } from '@/hooks/useDevice';

interface ProductCardProps {
  product: Product;
  onUpdate?: (data: Product) => Promise<void>;
  categories?: string[];
}


const FeedbackSuccess = ({ show }: { show: boolean }) => {
  if (!show) return null;
  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-green-600 dark:bg-green-700 text-white text-xs px-4 py-2 rounded-full shadow z-20 fade-in-out">
      Produto atualizado com sucesso!
    </div>
  );
};


const ActionButtons = ({
  onDetail,
  onEdit,
  productId,
  productTitle
}: {
  onDetail: (e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent) => void;
  productId: number;
  productTitle: string;
}) => {
  return (
    <div className="flex flex-row gap-1 sm:gap-2 mt-auto w-full justify-between items-center bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm p-2">
      <button
        className="flex-1 px-2 sm:px-3 py-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-normal hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors focus:outline-none cursor-pointer"
        onClick={onDetail}
        aria-label={`Ver detalhes de ${productTitle}`}
        type="button"
        title="Ver detalhes do produto"
      >
        Ver produto
      </button>
      <span
        className="flex items-center justify-center p-2 rounded text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
        onClick={onEdit}
        aria-label={`Editar ${productTitle}`}
        role="button"
        tabIndex={0}
        title="Editar produto"
      >
        <FiEdit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
      </span>
      <DeleteProductButton id={productId} />
    </div>
  );
};


export const ProductCard = ({ product, onUpdate, categories }: ProductCardProps) => {
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const { isMobile, touchDevice } = useDevice();

  const showSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <>
      <div
        className={`group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 p-3 sm:p-4 flex flex-col items-center relative overflow-hidden min-h-[380px] sm:min-h-[420px] w-full max-w-sm mx-auto focus-within:ring-2 focus-within:ring-blue-200 dark:focus-within:ring-blue-800 cursor-pointer
        ${touchDevice ? 'active:scale-95 active:shadow-md' : 'hover:shadow-xl'}
        ${isMobile ? 'touch-manipulation' : ''}`}
        tabIndex={0}
        aria-label={`Produto: ${product.title}. Clique para ver detalhes`}
        onClick={(e) => {
          if (
            e.target instanceof HTMLElement &&
            (e.target.closest('button') || e.target.closest('a'))
          ) {
            return;
          }
          setOpenDetail(true);
        }}
        role="button"
      >
        <FeedbackSuccess show={success} />

        <div className="rounded-xl flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-3 sm:mb-4 overflow-hidden bg-transparent">
          <div className="w-full h-full flex items-center justify-center overflow-hidden bg-transparent">
            <Image 
              src={product.image} 
              alt={product.title} 
              width={isMobile ? 160 : 224} 
              height={isMobile ? 160 : 224} 
              className="object-contain max-w-full max-h-full bg-transparent transition-transform duration-300 group-hover:scale-110" 
              loading="lazy"
              sizes={isMobile ? "160px" : "224px"}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between w-full mb-2">
          <span className="inline-block text-xs font-medium uppercase tracking-wide bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full truncate max-w-[60%]">
            {product.category}
          </span>
          <span className="font-bold text-base sm:text-lg text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full whitespace-nowrap">
            R$ {product.price}
          </span>
        </div>
        
        <h2 className="font-bold text-base sm:text-lg text-center mb-2 line-clamp-2 min-h-[2.5em] w-full text-gray-900 dark:text-gray-100 leading-tight">
          {product.title}
        </h2>
        
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-3 text-center mb-4 min-h-[3em] w-full leading-relaxed">
          {product.description}
        </p>
        
        <ActionButtons
          onDetail={e => { e.stopPropagation(); setOpenDetail(true); }}
          onEdit={e => { e.stopPropagation(); setOpenEdit(true); }}
          productId={product.id}
          productTitle={product.title}
        />
      </div>
      <ProductDetailDialog product={product} open={openDetail} onClose={() => setOpenDetail(false)} />
      <EditProductDialog
        product={product}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSave={async (data) => {
          if (onUpdate) await onUpdate(data);
          setOpenEdit(false);
          showSuccess();
        }}
        categories={categories}
      />
    </>
  );
};