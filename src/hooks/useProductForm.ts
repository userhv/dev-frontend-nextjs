import { useState } from 'react';
import { Product } from '@/services/types';

export function useProductForm(initialData: Partial<Product> = {}) {
  const [form, setForm] = useState({
    title: initialData.title || '',
    price: initialData.price?.toString() || '',
    description: initialData.description || '',
    category: initialData.category || '',
    image: initialData.image || '',
  });
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate(custom?: (f: typeof form) => string | null): boolean {
    if (custom) {
      const customError = custom(form);
      if (customError) {
        setError(customError);
        return false;
      }
    }
    if (!form.title.trim() || !form.price.trim() || !form.category.trim() || !form.image.trim() || !form.description.trim()) {
      setError('Preencha todos os campos.');
      return false;
    }
    setError(null);
    return true;
  }

  function getParsedData(): Partial<Product> {
    return {
      ...form,
      price: Number(form.price),
    };
  }

  function reset() {
    setForm({
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
    });
    setError(null);
  }

  return { form, setForm, error, setError, handleChange, validate, getParsedData, reset };
}
