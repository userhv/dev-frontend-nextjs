import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from '../useProducts';
import * as productsApi from '@/services/products';

jest.mock('@/services/products');

describe('useProducts', () => {
  it('busca produtos e retorna lista', async () => {
    (productsApi.ProductsService.getProducts as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Produto 1', price: 10, description: 'Desc', category: 'Cat', image: 'img' },
    ]);
    const { result } = renderHook(() => useProducts());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('retorna erro ao falhar', async () => {
    (productsApi.ProductsService.getProducts as jest.Mock).mockRejectedValue(new Error('fail'));
    const { result } = renderHook(() => useProducts());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeTruthy();
  });
});
