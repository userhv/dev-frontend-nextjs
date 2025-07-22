import { Product } from '@/services/types';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, XCircle, Pencil } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';


interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Partial<Product>) => void | Promise<void>;
  loading?: boolean;
  submitLabel?: string;
}

export default function ProductForm({ initialData = {}, onSubmit, loading, submitLabel = 'Salvar' }: ProductFormProps) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Product>>({
    title: initialData.title || '',
    price: initialData.price || 0,
    description: initialData.description || '',
    category: initialData.category || '',
    image: initialData.image || '',
    id: initialData.id,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await onSubmit(form);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Erro ao salvar.');
    }
  }

  return (
    <Card className="p-0 sm:p-4 max-w-xl w-full mx-auto rounded-2xl bg-white border-0 shadow-none">
      {form.image && (
        <div className="flex justify-center pt-3 pb-1">
          <Image src={form.image} alt={form.title || 'Imagem do produto'} width={72} height={72} className="h-18 w-18 object-contain rounded bg-white" />
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5 p-0 sm:p-0" autoComplete="off" aria-label={initialData && initialData.id ? 'Editar produto' : 'Adicionar produto'}>
        <div className="flex items-center gap-2 mb-1 justify-center">
          <Pencil className="w-4 h-4 text-gray-300" />
          <span className="text-sm font-medium text-gray-500">
            {initialData && initialData.id ? 'Editar informações' : 'Adicionar produto'}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="title" className="font-semibold text-gray-700">Título</Label>
          <Input id="title" name="title" value={form.title as string} onChange={handleChange} placeholder="Título do produto" required autoFocus className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-base" aria-required="true" aria-label="Título do produto" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="price" className="font-semibold text-gray-700">Preço</Label>
          <Input id="price" name="price" type="number" value={form.price as number} onChange={handleChange} placeholder="Preço" required min={0} step={0.01} inputMode="decimal" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-base" aria-required="true" aria-label="Preço do produto" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="category" className="font-semibold text-gray-700">Categoria</Label>
          <Input id="category" name="category" value={form.category as string} onChange={handleChange} placeholder="Categoria do produto" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-base" aria-required="true" aria-label="Categoria do produto" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="image" className="font-semibold text-gray-700">URL da imagem</Label>
          <Input id="image" name="image" value={form.image as string} onChange={handleChange} placeholder="URL da imagem do produto" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-base" aria-required="true" aria-label="URL da imagem do produto" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="description" className="font-semibold text-gray-700">Descrição</Label>
          <textarea id="description" name="description" value={form.description as string} onChange={handleChange} placeholder="Descrição detalhada do produto" required className="w-full min-h-[100px] resize-y border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-base" aria-required="true" aria-label="Descrição detalhada do produto" />
        </div>
        <Button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold shadow-sm transition bg-blue-600 hover:bg-blue-700 text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
          {loading && <Loader2 className="animate-spin w-4 h-4" />}
          {submitLabel}
        </Button>
        {success && (
          <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-100 rounded p-2 mt-2 text-xs animate-fade-in justify-center">
            <CheckCircle2 className="w-4 h-4" /> Salvo com sucesso!
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-100 rounded p-2 mt-2 text-xs animate-fade-in justify-center">
            <XCircle className="w-4 h-4" /> {error}
          </div>
        )}
      </form>
    </Card>
  );
}
