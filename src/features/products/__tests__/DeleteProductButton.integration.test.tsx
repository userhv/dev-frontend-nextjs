// Mock next/navigation para evitar erro do useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, refresh: jest.fn() })
}));

// Mock window.scrollTo para evitar erros no jsdom
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {DeleteProductButton} from '../DeleteProductButton';
import * as productsApi from '@/services/products';

jest.mock('@/services/products');

describe('DeleteProductButton integração', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPush.mockClear();
    // Garantir que document.body está disponível para o createPortal
    document.body.innerHTML = '';
  });

  it('exibe dialog e executa deleção com navegação', async () => {
    (productsApi.deleteProduct as jest.Mock).mockResolvedValue({});
    render(<DeleteProductButton id={1} />);
    fireEvent.click(screen.getByLabelText('Excluir produto'));
    
    // Aguardar o modal aparecer
    await waitFor(() => {
      expect(screen.getByText(/confirmar exclusão/i)).toBeInTheDocument();
    });
    
    const excluirButton = screen.getByText('Excluir');
    fireEvent.click(excluirButton);
    
    await waitFor(() => {
      expect(productsApi.deleteProduct).toHaveBeenCalledWith(1);
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('exibe mensagem de erro ao falhar e não navega', async () => {
    (productsApi.deleteProduct as jest.Mock).mockRejectedValue(new Error('Falha na API'));
    render(<DeleteProductButton id={2} />);
    fireEvent.click(screen.getByLabelText('Excluir produto'));
    
    // Aguardar o modal aparecer
    await waitFor(() => {
      expect(screen.getByText(/confirmar exclusão/i)).toBeInTheDocument();
    });
    
    const excluirButton = screen.getByText('Excluir');
    fireEvent.click(excluirButton);
    
    await waitFor(() => {
      expect(productsApi.deleteProduct).toHaveBeenCalledWith(2);
      expect(screen.getByText(/erro ao excluir produto/i)).toBeInTheDocument();
    });
    
    // Verificar que não navegou para página inicial
    expect(mockPush).not.toHaveBeenCalled();
  });
});
