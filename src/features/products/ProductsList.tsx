"use client";

import { Product } from '@/services/types';
import React, { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useSearchParams } from 'next/navigation';
import {ProductCard} from './ProductCard';
import { updateProduct } from '@/services/products';
import { Button } from '@/components/ui/button';
import { LoadingCard } from '@/components/ui/loading';
import Link from 'next/link';
import { useDevice } from '@/hooks/useDevice';

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative w-full max-w-2xl flex-1">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Pesquisar por nome ou categoria..."
        className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow outline-none"
        aria-label="Pesquisar produtos"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
      </span>
    </div>
  );
}
export function ProductsList() {
  const searchParams = useSearchParams();
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState(searchParams?.get('search') || '');
  const { isMobile, isTablet } = useDevice();

  const filteredProducts = products.filter((product) => {
    const term = search.toLowerCase();
    const category = searchParams?.get('categoria');
    
    // Filtro por categoria (query param)
    if (category && product.category !== category) {
      return false;
    }
    
    // Filtro por texto de busca
    if (term) {
      return (
        (product.title && product.title.toLowerCase().includes(term)) ||
        (product.description && product.description.toLowerCase().includes(term)) ||
        (product.category && product.category.toLowerCase().includes(term))
      );
    }
    
    return true;
  });

  // Grid adaptativo baseado no dispositivo
  const getGridCols = () => {
    if (isMobile) return 'grid-cols-1 gap-4';
    if (isTablet) return 'grid-cols-2 gap-4';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6';
  };

  if (loading) return (
    <div className={`grid ${getGridCols()}`}>
      {Array.from({ length: isMobile ? 3 : 6 }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
  if (error) return (
    <div className="flex flex-col items-center justify-center py-12">
      <span className="text-red-700 mb-2">{error}</span>
      <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
    </div>
  );

  const handleUpdate = async (data: Product) => {
    await updateProduct(data.id, data);
  };

  return (
    <>
      <div className="mb-2 flex flex-col gap-2 w-full">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:justify-between">
          <SearchBar value={search} onChange={setSearch} />
          <div className="w-full sm:w-auto flex justify-end mt-3 sm:mt-0">
            <Button asChild className="gap-2 min-w-[160px]">
              <Link href="/products/new">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Novo Produto
              </Link>
            </Button>
          </div>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 font-normal mt-1 ml-1 relative z-10">
          {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className={`grid ${getGridCols()}`}>
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12 text-base sm:text-lg">
            <div className="flex flex-col items-center gap-4">
              <svg className="w-16 h-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <div>
                <p className="font-medium mb-1">Nenhum produto encontrado</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {search ? 'Tente uma busca diferente' : 'Comece adicionando um novo produto'}
                </p>
              </div>
              {!search && (
                <Button asChild className="mt-2">
                  <Link href="/products/new">Adicionar Produto</Link>
                </Button>
              )}
            </div>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onUpdate={handleUpdate}
              categories={Array.from(new Set(products.map((p) => p.category))).filter(Boolean)}
            />
          ))
        )}
      </div>
    </>
  );
}
