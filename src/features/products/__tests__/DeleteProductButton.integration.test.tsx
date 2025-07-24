// Mock next/navigation para evitar erro do useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() })
}));
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteProductButton from '../DeleteProductButton';
import * as productsApi from '@/services/products';

jest.mock('@/services/products');

describe('DeleteProductButton integração', () => {
  it('exibe dialog e executa deleção', async () => {
    (productsApi.deleteProduct as jest.Mock).mockResolvedValue({});
    render(<DeleteProductButton id={1} />);
    fireEvent.click(screen.getByLabelText('Excluir produto'));
    const excluirButton = screen.getByRole('button', { name: /^excluir$/i });
    fireEvent.click(excluirButton);
    await waitFor(() => {
      expect(productsApi.deleteProduct).toHaveBeenCalledWith(1);
    });
  });

  it('exibe mensagem de erro ao falhar', async () => {
    (productsApi.deleteProduct as jest.Mock).mockRejectedValue(new Error('Falha na API'));
    render(<DeleteProductButton id={2} />);
    fireEvent.click(screen.getByLabelText('Excluir produto'));
    const excluirButton = screen.getByRole('button', { name: /^excluir$/i });
    fireEvent.click(excluirButton);
    await waitFor(() => {
      expect(productsApi.deleteProduct).toHaveBeenCalledWith(2);
      expect(screen.getByText(/erro ao excluir produto/i)).toBeInTheDocument();
    });
  });
});
