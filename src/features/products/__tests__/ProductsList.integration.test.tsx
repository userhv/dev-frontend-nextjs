
import { render, screen, waitFor } from '@testing-library/react';
import { ProductsList } from '../ProductsList';
import * as productsApi from '@/services/products';

// Mock next/image para evitar erro de ambiente
jest.mock('next/image', () => {
  const MockImage = (props: {
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
  }) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  };
  MockImage.displayName = 'MockImage';
  return MockImage;
});

// Mock next/navigation para evitar erro do useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
  useSearchParams: jest.fn(),
}));

jest.mock('@/services/products');

import { useSearchParams } from 'next/navigation';

describe('ProductsList integração', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: (key: string) => {
        const params = new URLSearchParams(window.location.search);
        return params.get(key);
      }
    }));
  });

  it('exibe produtos filtrados por categoria', async () => {
    (productsApi.getProducts as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Produto 1', price: 10, description: 'Desc', category: 'Cat 1', image: 'https://img.com/img1.jpg' },
      { id: 2, title: 'Produto 2', price: 20, description: 'Desc', category: 'Cat 2', image: 'https://img.com/img2.jpg' },
    ]);
    // Simula query param categoria
    window.history.pushState({}, '', '/?categoria=Cat%201');
    render(<ProductsList />);
    await waitFor(() => {
      expect(screen.getByText('Produto 1')).toBeInTheDocument();
      expect(screen.queryByText('Produto 2')).not.toBeInTheDocument();
    });
  });
});
