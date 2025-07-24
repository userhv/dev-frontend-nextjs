// Mock next/image para evitar erro de ambiente
jest.mock('next/image', () => (props: any) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />;
});

// Mock next/navigation para evitar erro do useRouter e useSearchParams
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
  useSearchParams: () => ({ get: jest.fn(() => '') })
}));
import { render, screen, waitFor } from '@testing-library/react';
import { ProductsList } from '../ProductsList';
import * as productsApi from '@/services/products';
import { Product } from '@/services/types';

jest.mock('@/services/products');

const mockProducts: Product[] = [
  { id: 1, title: 'Produto 1', price: 10, description: 'Desc 1', category: 'Cat 1', image: 'https://img.com/img1.jpg' },
  { id: 2, title: 'Produto 2', price: 20, description: 'Desc 2', category: 'Cat 2', image: 'https://img.com/img2.jpg' },
];

describe('ProductsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exibe loading enquanto carrega', () => {
    (productsApi.getProducts as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<ProductsList />);
    expect(screen.getByText(/carregando produtos/i)).toBeInTheDocument();
  });

  it('exibe erro ao falhar', async () => {
    (productsApi.getProducts as jest.Mock).mockRejectedValue(new Error('fail'));
    render(<ProductsList />);
    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar produtos/i)).toBeInTheDocument();
    });
  });

  it('exibe lista de produtos', async () => {
    (productsApi.getProducts as jest.Mock).mockResolvedValue(mockProducts);
    render(<ProductsList />);
    await waitFor(() => {
      expect(screen.getByText('Produto 1')).toBeInTheDocument();
      expect(screen.getByText('Produto 2')).toBeInTheDocument();
    });
  });
});
