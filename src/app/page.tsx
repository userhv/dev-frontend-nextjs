
import Link from 'next/link';
import ProductsList from '@/features/products/ProductsList';

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Link href="/products/new" className="bg-green-600 text-white px-4 py-2 rounded">Novo Produto</Link>
      </div>
      <ProductsList />
    </main>
  );
}
