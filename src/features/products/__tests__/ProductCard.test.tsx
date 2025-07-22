import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  const product = {
    id: 1,
    title: 'Produto Teste',
    price: 99,
    description: 'Descrição teste',
    category: 'Categoria Teste',
    image: 'http://img.com/img.png',
  };

  it('renders product data', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('Categoria Teste')).toBeInTheDocument();
    expect(screen.getByText('R$ 99')).toBeInTheDocument();
    expect(screen.getByAltText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver detalhes/i })).toHaveAttribute('href', '/products/1');
  });
});
