import { Product } from '@/services/types';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Partial<Product>) => void;
  loading?: boolean;
  submitLabel?: string;
}

export default function ProductForm({ initialData = {}, onSubmit, loading, submitLabel = 'Salvar' }: ProductFormProps) {
  const [form, setForm] = useState<Partial<Product>>({
    title: initialData.title || '',
    price: initialData.price || 0,
    description: initialData.description || '',
    category: initialData.category || '',
    image: initialData.image || '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <Card className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" name="title" value={form.title as string} onChange={handleChange} placeholder="Título" required />
        </div>
        <div>
          <Label htmlFor="price">Preço</Label>
          <Input id="price" name="price" type="number" value={form.price as number} onChange={handleChange} placeholder="Preço" required />
        </div>
        <div>
          <Label htmlFor="category">Categoria</Label>
          <Input id="category" name="category" value={form.category as string} onChange={handleChange} placeholder="Categoria" required />
        </div>
        <div>
          <Label htmlFor="image">URL da imagem</Label>
          <Input id="image" name="image" value={form.image as string} onChange={handleChange} placeholder="URL da imagem" required />
        </div>
        <div>
          <Label htmlFor="description">Descrição</Label>
          <textarea id="description" name="description" value={form.description as string} onChange={handleChange} placeholder="Descrição" required className="w-full min-h-[80px] resize-y border rounded p-2" />
        </div>
        <Button type="submit" disabled={loading} className="w-full">{submitLabel}</Button>
      </form>
    </Card>
  );
}
