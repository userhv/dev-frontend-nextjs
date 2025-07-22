


import Image from 'next/image';
import Link from 'next/link';
import { getProduct } from '@/services/products';
import { Product } from '@/services/types';
import { notFound } from 'next/navigation';
import DeleteProductButton from '@/features/products/DeleteProductButton';
import BackButton from './BackButton';
import { Suspense } from 'react';

interface ProductDetailProps {
  params: { id: string };
}

async function ProductDetailContent({ id }: { id: string }) {
  let product: Product | null = null;
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }
  if (!product) return notFound();
  return (
    <div className="max-w-xl mx-auto p-4">
      <BackButton />
      <Image src={product.image} alt={product.title} width={192} height={192} className="h-48 mx-auto object-contain mb-4" />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-2">{product.category}</p>
      <span className="font-semibold text-green-600 mb-2 block">R$ {product.price}</span>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <div className="flex flex-row gap-3 mt-4 items-center">
        <Link href={`/products/${product.id}/edit`} className="px-4 py-2 rounded-lg flex items-center gap-2 font-semibold shadow-sm transition bg-blue-600 hover:bg-blue-700 text-white">Editar</Link>
        <DeleteProductButton id={product.id} />
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  return (
    <Suspense fallback={<div className="max-w-xl mx-auto p-8 flex flex-col items-center justify-center"><span className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></span><span className="text-gray-500">Carregando produto...</span></div>}>
      {/* @ts-expect-error Async Server Component */}
      <ProductDetailContent id={params.id} />
    </Suspense>
  );
}

