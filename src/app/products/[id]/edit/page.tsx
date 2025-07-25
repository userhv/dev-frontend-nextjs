import { EditProductClient } from './EditProductClient';
import { getProduct } from '@/services/products';
import { notFound } from 'next/navigation';
import { logger } from '@/lib/logger';

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
    logger.error('Error loading product:', { productId: id, error });
    notFound();
  }
}