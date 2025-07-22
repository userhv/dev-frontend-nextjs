import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  const product = {
    id: 1,
    title: 'Produto Teste com nome muito longo para truncar o texto e testar o clamp',
    price: 99,
    description: 'Descrição teste com texto muito longo para verificar o clamp e truncamento correto do texto na UI do card.',
    category: 'Categoria Teste',
    image: 'http://img.com/img.png',
  };

  it('renderiza os dados do produto', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(/produto teste/i)).toBeInTheDocument();
    expect(screen.getByText('Categoria Teste')).toBeInTheDocument();
    expect(screen.getByText('R$ 99')).toBeInTheDocument();
    expect(screen.getByAltText(/produto teste/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver detalhes/i })).toHaveAttribute('href', '/products/1');
  });

  it('trunca visualmente título e descrição longos', () => {
    render(<ProductCard product={product} />);
    const title = screen.getByText(/produto teste/i);
    const desc = screen.getByText(/descrição teste/i);
    expect(title.className).toMatch(/line-clamp/);
    expect(desc.className).toMatch(/line-clamp/);
  });

  it('link é acessível e pode receber foco', () => {
    render(<ProductCard product={product} />);
    const link = screen.getByRole('link', { name: /ver detalhes/i });
    link.focus();
    expect(link).toHaveFocus();
  });
});
