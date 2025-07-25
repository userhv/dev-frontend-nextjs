import { EditProductClient } from './EditProductClient';
import { getProduct } from '@/services/products';
import { notFound } from 'next/navigation';

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  
  try {
    const product = await getProduct(Number(id));
    if (!product) {
      notFound();
    }
    return <EditProductClient product={product} id={id} />;
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}