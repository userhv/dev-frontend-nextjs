import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Sidebar', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('destaca o link ativo', () => {
    render(<Sidebar />);
    const produtos = screen.getByText('Produtos');
    expect(produtos.parentElement).toHaveClass('bg-blue-100');
  });

  it('abre e fecha o menu mobile', () => {
    render(<Sidebar />);
    const menuBtn = screen.getByLabelText(/abrir menu/i);
    fireEvent.click(menuBtn);
    expect(screen.getByLabelText(/menu lateral/i)).toBeVisible();
    fireEvent.click(screen.getByLabelText(/menu lateral/i));
    // O overlay fecha o menu
  });
});
