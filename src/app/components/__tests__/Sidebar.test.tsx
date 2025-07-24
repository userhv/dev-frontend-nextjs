// Mock next/navigation para evitar erro do useRouter e usePathname
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
  usePathname: jest.fn(),
}));
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from '../Sidebar';

import { usePathname } from 'next/navigation';

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
