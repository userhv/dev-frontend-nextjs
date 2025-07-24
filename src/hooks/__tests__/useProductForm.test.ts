import { renderHook, act } from '@testing-library/react';
import { useProductForm } from '../useProductForm';

describe('useProductForm', () => {
  it('inicializa com dados vazios por padrão', () => {
    const { result } = renderHook(() => useProductForm());
    expect(result.current.form.title).toBe('');
    expect(result.current.form.price).toBe('');
    expect(result.current.form.category).toBe('');
    expect(result.current.form.image).toBe('');
    expect(result.current.form.description).toBe('');
  });

  it('inicializa com dados fornecidos', () => {
    const { result } = renderHook(() => useProductForm({ title: 'T', price: 1, category: 'C', image: 'I', description: 'D' }));
    expect(result.current.form.title).toBe('T');
    expect(result.current.form.price).toBe('1');
    expect(result.current.form.category).toBe('C');
    expect(result.current.form.image).toBe('I');
    expect(result.current.form.description).toBe('D');
  });

  it('atualiza campos com handleChange', () => {
    const { result } = renderHook(() => useProductForm());
    act(() => {
      result.current.handleChange({ target: { name: 'title', value: 'Novo' } } as any);
    });
    expect(result.current.form.title).toBe('Novo');
  });

  it('valida campos obrigatórios', () => {
    const { result } = renderHook(() => useProductForm());
    let valid;
    act(() => {
      valid = result.current.validate();
    });
    expect(valid).toBe(false);
    expect(result.current.error).toBe('Preencha todos os campos.');
  });

  it('valida customizado', () => {
    const { result } = renderHook(() => useProductForm({ title: 'T', price: 1, category: 'C', image: 'I', description: 'D' }));
    act(() => {
      result.current.handleChange({ target: { name: 'title', value: '' } } as any);
    });
    let valid;
    act(() => {
      valid = result.current.validate(f => f.title.length > 0 ? null : 'Título obrigatório');
    });
    expect(valid).toBe(false);
    expect(result.current.error).toBe('Título obrigatório');
  });

  it('getParsedData converte preço para número', () => {
    const { result } = renderHook(() => useProductForm({ price: '123' as any }));
    expect(result.current.getParsedData().price).toBe(123);
  });

  it('reset limpa o formulário', () => {
    const { result } = renderHook(() => useProductForm({ title: 'T', price: 1, category: 'C', image: 'I', description: 'D' }));
    act(() => {
      result.current.reset();
    });
    expect(result.current.form.title).toBe('');
    expect(result.current.form.price).toBe('');
    expect(result.current.form.category).toBe('');
    expect(result.current.form.image).toBe('');
    expect(result.current.form.description).toBe('');
    expect(result.current.error).toBeNull();
  });
});
