import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../ProductForm';

describe('ProductForm', () => {
  it('renderiza todos os campos e envia os dados', () => {
    const handleSubmit = jest.fn();
    render(<ProductForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Produto Teste' } });
    fireEvent.change(screen.getByLabelText(/preço/i), { target: { value: '99' } });
    fireEvent.change(screen.getByLabelText(/categoria/i), { target: { value: 'Categoria Teste' } });
    fireEvent.change(screen.getByLabelText(/url da imagem/i), { target: { value: 'http://img.com/img.png' } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Descrição teste' } });

    fireEvent.click(screen.getByRole('button', { name: /salvar|criar/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Produto Teste',
      price: 99,
      category: 'Categoria Teste',
      image: 'http://img.com/img.png',
      description: 'Descrição teste',
    });
  });

  it('exibe feedback de sucesso após submit', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    render(<ProductForm onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Produto Teste' } });
    fireEvent.change(screen.getByLabelText(/preço/i), { target: { value: '99' } });
    fireEvent.change(screen.getByLabelText(/categoria/i), { target: { value: 'Categoria Teste' } });
    fireEvent.change(screen.getByLabelText(/url da imagem/i), { target: { value: 'http://img.com/img.png' } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Descrição teste' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar|criar/i }));
    expect(await screen.findByText(/salvo com sucesso/i)).toBeInTheDocument();
  });

  it('exibe feedback de erro ao submeter com erro', async () => {
    const handleSubmit = jest.fn().mockRejectedValue(new Error('Erro customizado'));
    render(<ProductForm onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Produto Teste' } });
    fireEvent.change(screen.getByLabelText(/preço/i), { target: { value: '99' } });
    fireEvent.change(screen.getByLabelText(/categoria/i), { target: { value: 'Categoria Teste' } });
    fireEvent.change(screen.getByLabelText(/url da imagem/i), { target: { value: 'http://img.com/img.png' } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Descrição teste' } });
    fireEvent.click(screen.getByRole('button', { name: /salvar|criar/i }));
    expect(await screen.findByText(/erro customizado/i)).toBeInTheDocument();
  });

  it('renderiza preview da imagem se url preenchida', () => {
    render(<ProductForm onSubmit={jest.fn()} initialData={{ image: 'http://img.com/img.png', title: 'Produto Teste' }} />);
    expect(screen.getByAltText(/produto teste/i)).toBeInTheDocument();
  });

  it('desabilita o botão de submit quando loading', () => {
    render(<ProductForm onSubmit={jest.fn()} loading />);
    expect(screen.getByRole('button', { name: /salvar|criar/i })).toBeDisabled();
  });

  it('possui labels acessíveis para todos os campos', () => {
    render(<ProductForm onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/url da imagem/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
  });
});
