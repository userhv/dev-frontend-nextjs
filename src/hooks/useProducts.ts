import { useEffect, useState } from 'react';
import { ProductsService } from '@/services/products';
import { Product } from '@/services/types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ProductsService.getProducts()
      .then(setProducts)
      .catch(() => setError('Erro ao carregar produtos.'))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
