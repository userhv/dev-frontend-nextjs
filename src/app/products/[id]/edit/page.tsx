import { getProduct } from '@/services/products';
import { Product } from '@/services/types';
import { notFound } from 'next/navigation';
import EditProductClient from './EditProductClient';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  let product: Product | null = null;
  try {
    product = await getProduct(params.id);
  } catch {
    notFound();
  }
  if (!product) return notFound();

  return <EditProductClient product={product} id={params.id} />;
}
