import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../ProductForm';

describe('ProductForm', () => {
  it('renders all fields and submits data', () => {
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
});
