
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/services/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white border rounded-xl shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col items-center relative overflow-hidden">
      <div className="bg-gray-100 rounded-lg flex items-center justify-center w-32 h-32 mb-3 overflow-hidden">
        <Image src={product.image} alt={product.title} width={128} height={128} className="object-contain max-h-28 transition-transform group-hover:scale-105" />
      </div>
      <h2 className="font-bold text-base text-center mb-1 line-clamp-2 h-12">{product.title}</h2>
      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category}</p>
      <span className="font-bold text-lg text-green-600 mb-2 bg-green-50 px-2 py-0.5 rounded">R$ {product.price}</span>
      <p className="text-xs text-gray-600 line-clamp-3 text-center mb-3 min-h-[2.5em]">{product.description}</p>
      <Link
        href={`/products/${product.id}`}
        className="mt-auto inline-block bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow hover:bg-blue-700 transition-colors"
      >
        Ver detalhes
      </Link>
    </div>
  );
}
