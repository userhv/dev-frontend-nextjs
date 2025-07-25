
import { ProductsList } from '@/features/products/ProductsList';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <Suspense fallback={<div className="text-center py-8">Carregando produtos...</div>}>
        <ProductsList />
      </Suspense>
    </main>
  );
}
