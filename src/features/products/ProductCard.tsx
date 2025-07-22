import Link from 'next/link';
import { Product } from '@/services/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded p-4 flex flex-col items-center">
      <img src={product.image} alt={product.title} className="h-32 object-contain mb-2" />
      <h2 className="font-bold text-lg mb-1">{product.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
      <span className="font-semibold text-green-600 mb-2">R$ {product.price}</span>
      <p className="text-xs text-gray-500 line-clamp-2 mb-2">{product.description}</p>
      <Link href={`/products/${product.id}`} className="text-blue-600 hover:underline text-sm">Ver detalhes</Link>
    </div>
  );
}
