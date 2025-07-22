import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteProductButton from '../DeleteProductButton';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() })
}));
import * as productsApi from '@/services/products';

jest.mock('@/services/products');

describe('DeleteProductButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('abre o dialog ao clicar', () => {
    render(<DeleteProductButton id={1} />);
    fireEvent.click(screen.getByText(/excluir/i));
    expect(screen.getByText(/confirmar exclusão/i)).toBeInTheDocument();
  });

  it('chama deleteProduct ao confirmar', async () => {
    (productsApi.deleteProduct as jest.Mock).mockResolvedValue({});
    render(<DeleteProductButton id={1} />);
    fireEvent.click(screen.getByText(/excluir/i));
    // Clica no segundo botão 'Excluir' (do dialog)
    const excluirButtons = screen.getAllByText(/^excluir$/i);
    fireEvent.click(excluirButtons[1]);
    await waitFor(() => {
      expect(productsApi.deleteProduct).toHaveBeenCalledWith(1);
    });
  });

  it('mostra feedback de sucesso', async () => {
    (productsApi.deleteProduct as jest.Mock).mockResolvedValue({});
    render(<DeleteProductButton id={1} />);
    fireEvent.click(screen.getByText(/excluir/i));
    // Clica no segundo botão 'Excluir' (do dialog)
    const excluirButtons = screen.getAllByText(/^excluir$/i);
    fireEvent.click(excluirButtons[1]);
    await waitFor(() => {
      expect(screen.getByText(/produto excluído com sucesso/i)).toBeInTheDocument();
    });
  });
});
