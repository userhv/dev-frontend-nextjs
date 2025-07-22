"use client";
import { Product } from '@/services/types';
import { getProducts } from '@/services/products';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Erro ao carregar produtos.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
