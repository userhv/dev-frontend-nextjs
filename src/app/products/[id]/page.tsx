import { getProduct } from '@/services/products';
import { Product } from '@/services/types';
import { notFound } from 'next/navigation';

interface ProductDetailProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  let product: Product | null = null;
  try {
    product = await getProduct(params.id);
  } catch {
    notFound();
  }
  if (!product) return notFound();

  return (
    <div className="max-w-xl mx-auto p-4">
      <img src={product.image} alt={product.title} className="h-48 mx-auto object-contain mb-4" />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-2">{product.category}</p>
      <span className="font-semibold text-green-600 mb-2 block">R$ {product.price}</span>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <div className="flex gap-4 mt-4">
        <a href={`/products/${product.id}/edit`} className="bg-blue-600 text-white px-4 py-2 rounded">Editar</a>
        <DeleteProductButton id={product.id} />
      </div>
    </div>
  );
}

import DeleteProductButton from '@/features/products/DeleteProductButton';
