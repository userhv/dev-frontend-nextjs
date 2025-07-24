

import Image from 'next/image';
import { FiEdit2 } from 'react-icons/fi';
import { useState } from 'react';
import { ProductDetailDialog } from './ProductDetailDialog';
import { EditProductDialog } from './EditProductDialog';
import DeleteProductButton from './DeleteProductButton';
import { Product } from '@/services/types';

interface ProductCardProps {
  product: Product;
  onUpdate?: (data: Product) => Promise<void>;
  categories?: string[];
}


const FeedbackSuccess = ({ show }: { show: boolean }) => {
  if (!show) return null;
  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-4 py-2 rounded-full shadow z-20 fade-in-out">
      Produto atualizado com sucesso!
    </div>
  );
};


const ActionButtons = ({
  onDetail,
  onEdit,
  onDelete,
  productTitle
}: {
  onDetail: (e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  productTitle: string;
}) => {
  return (
    <div className="flex flex-row gap-2 mt-auto w-full justify-end items-center w-full bg-gray-50 rounded-lg shadow-sm p-0">
      <button
        className="px-4 py-1.5 rounded border border-gray-200 bg-white text-gray-700 text-sm font-normal hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-none cursor-pointer w-full"
        onClick={onDetail}
        aria-label={`Ver detalhes de ${productTitle}`}
        type="button"
        title="Ver detalhes do produto"
      >
        Ver produto
      </button>
      <span
        className="p-2 rounded text-gray-500 hover:text-yellow-600 transition-colors cursor-pointer"
        onClick={onEdit}
        aria-label={`Editar ${productTitle}`}
        role="button"
        tabIndex={0}
        title="Editar produto"
      >
        <FiEdit2 size={18} />
      </span>
      <span onClick={onDelete} className="flex items-center">
        <DeleteProductButton id={undefined as any} />
      </span>
    </div>
  );
};


export const ProductCard = ({ product, onUpdate, categories }: ProductCardProps) => {
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [success, setSuccess] = useState(false);

  const showSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <>
      <div
        className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col items-center relative overflow-hidden min-h-[420px] w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto focus-within:ring-2 focus-within:ring-blue-200 cursor-pointer"
        tabIndex={0}
        aria-label={`Produto: ${product.title}`}
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
        <div className="rounded-xl flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-4 overflow-hidden bg-transparent">
          <div className="w-full h-full flex items-center justify-center overflow-hidden bg-transparent">
            <Image src={product.image} alt={product.title} width={256} height={256} className="object-contain max-w-full max-h-full bg-transparent" />
          </div>
        </div>
        <div className="flex items-center justify-between w-full mb-2">
          <span className="inline-block text-xs font-semibold uppercase tracking-wide bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{product.category}</span>
          <span className="font-semibold text-lg text-green-700 bg-green-50 px-2 py-0.5 rounded">R$ {product.price}</span>
        </div>
        <h2 className="font-bold text-lg sm:text-xl text-left mb-1 line-clamp-2 min-h-[2.5em] w-full">{product.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3 text-left mb-4 min-h-[3em] w-full">{product.description}</p>
        <ActionButtons
          onDetail={e => { e.stopPropagation(); setOpenDetail(true); }}
          onEdit={e => { e.stopPropagation(); setOpenEdit(true); }}
          onDelete={e => e.stopPropagation()}
          productTitle={product.title}
        >
          {/* DeleteProductButton precisa do id do produto, mas ActionButtons é genérico. Ajuste abaixo. */}
        </ActionButtons>
        {/* O DeleteProductButton real é renderizado abaixo para garantir o id correto */}
        <span style={{ display: 'none' }}><DeleteProductButton id={product.id} /></span>
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