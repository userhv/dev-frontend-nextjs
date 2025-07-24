import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductForm } from '../ProductForm';

describe('ProductForm integração', () => {
  it('valida campos obrigatórios', async () => {
    const handleSubmit = jest.fn();
    render(<ProductForm onSubmit={handleSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /salvar|criar/i }));
    expect(await screen.findByText(/preencha todos os campos/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('envia dados válidos', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    render(<ProductForm onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Produto Teste' } });
    fireEvent.change(screen.getByLabelText(/preço/i), { target: { value: '99' } });
    fireEvent.change(screen.getByLabelText(/categoria/i), { target: { value: 'Categoria Teste' } });
    fireEvent.change(screen.getByLabelText(/url da imagem/i), { target: { value: 'http://img.com/img.png' } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Descrição teste' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar|criar/i }));
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
