import { render, screen } from '@testing-library/react';
import EditProductClient from '../EditProductClient';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() })
}));

const mockProduct = {
  id: 1,
  title: 'Produto Teste',
  price: 99.99,
  description: 'Descrição teste',
  category: 'Categoria',
  image: 'https://img.com/img.jpg',
};

describe('EditProductClient', () => {
  it('renderiza o formulário de edição', () => {
    render(<EditProductClient product={mockProduct} id={String(mockProduct.id)} />);
    expect(screen.getByLabelText(/título do produto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preço do produto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoria do produto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/url da imagem do produto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição detalhada do produto/i)).toBeInTheDocument();
  });
});
