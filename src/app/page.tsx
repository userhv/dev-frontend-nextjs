
import {ProductsList} from '@/features/products/ProductsList';

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight drop-shadow-sm select-none">MaxUp Produtos</h1>
      </div>
      <ProductsList />
    </main>
  );
}
