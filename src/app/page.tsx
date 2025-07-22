
import Link from 'next/link';
import ProductsList from '@/features/products/ProductsList';

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
      </div>
      <ProductsList />
    </main>
  );
}
