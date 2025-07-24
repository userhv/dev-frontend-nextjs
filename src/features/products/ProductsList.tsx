"use client";

import { Product } from '@/services/types';
import React, { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useSearchParams } from 'next/navigation';
import {ProductCard} from './ProductCard';
import { updateProduct } from '@/services/products';
import { Button } from '@/components/ui/button';

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative w-full max-w-2xl flex-1">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Pesquisar por nome ou categoria..."
        className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-base bg-white shadow outline-none"
        aria-label="Pesquisar produtos"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
      </span>
    </div>
  );
}
export const ProductsList = () => {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const categoriaSelecionada = searchParams?.get('categoria') || '';

  // Filtro de produtos por nome ou categoria
  const filteredProducts = products.filter((product) => {
    const term = search.trim().toLowerCase();
    if (categoriaSelecionada && product.category !== categoriaSelecionada) return false;
    if (!term) return true;
    return (
      product.title.toLowerCase().includes(term) ||
      (product.category && product.category.toLowerCase().includes(term))
    );
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-12">
      <span className="text-gray-500 mb-2">Carregando produtos...</span>
      <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
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
              <a href="/products/new">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Novo Produto
              </a>
            </Button>
          </div>
        </div>
        <div className="text-xs text-gray-400 font-normal mt-1 ml-1">
          {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12 text-lg">Nenhum produto encontrado.</div>
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
