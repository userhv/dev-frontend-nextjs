import { getProduct } from '@/services/products';
import { notFound } from 'next/navigation';
import BackButton from './BackButton';
import Image from 'next/image';
import { logger } from '@/lib/logger';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  try {
    const product = await getProduct(Number(id));
    if (!product) {
      notFound();
    }
    
    return (
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <div className="mt-6">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <Image 
                  className="h-48 w-full object-cover md:w-48" 
                  src={product.image} 
                  alt={product.title}
                  width={192}
                  height={192}
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {product.category}
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-900">
                  {product.title}
                </h1>
                <p className="mt-2 text-gray-600">
                  {product.description}
                </p>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-green-600">
                    R$ {product.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    logger.error('Error loading product:', { error });
    notFound();
  }
}


