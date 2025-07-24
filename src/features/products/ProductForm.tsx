import { Product } from '@/services/types';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, XCircle, ChevronDown } from 'lucide-react';
import { useProductForm } from '@/hooks/useProductForm';
import * as Select from '@radix-ui/react-select';
import { Card } from '@/components/ui/card';
import Image from 'next/image';


interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Partial<Product>) => void | Promise<void>;
  loading?: boolean;
  submitLabel?: string;
  categories?: string[];
}

const isValidImageUrl = (url: string) => {
  if (!url) return false;
  try {
    const u = new URL(url);
    return /\.(jpe?g|png|webp|gif|bmp|svg)$/i.test(u.pathname);
  } catch {
    return false;
  }
}

export const ProductForm = ({ initialData = {}, onSubmit, loading, submitLabel = 'Salvar', categories }: ProductFormProps) => {
  const {
    form,
    setForm,
    error,
    setError,
    handleChange,
    validate,
    getParsedData,
    reset
  } = useProductForm(initialData);

  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!validate()) return;
    try {
      const parsed = getParsedData();
      const product: Product = {
        id: initialData?.id ?? 0,
        title: parsed.title?.toString() ?? '',
        price: typeof parsed.price === 'number' ? parsed.price : Number(parsed.price),
        description: parsed.description?.toString() ?? '',
        category: parsed.category?.toString() ?? '',
        image: parsed.image?.toString() ?? '',
      };
      await onSubmit(product);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError((err as Error)?.message || 'Erro ao salvar.');
    }
  };

  return (
    <Card className="p-0 sm:p-6 max-w-4xl w-full mx-auto rounded-2xl bg-white border-0 shadow-none">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        aria-label={initialData && initialData.id ? 'Editar produto' : 'Adicionar produto'}
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-stretch">
          <div className="flex-shrink-0 flex flex-col items-center justify-start md:justify-center w-full md:w-[340px] mb-4 md:mb-0">
            <div className="relative w-full flex flex-col items-center">
            {form.image && isValidImageUrl(form.image) ? (
              <Image
                src={form.image}
                alt={form.title || 'Imagem do produto'}
                width={220}
                height={220}
                className="object-contain rounded-2xl bg-white border border-gray-200 w-full max-w-[220px] max-h-[220px] aspect-square shadow-md transition-all duration-200 md:max-w-[340px] md:max-h-[340px] md:w-[340px] md:h-[340px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : form.image && form.image.trim() ? (
              <div className="w-full max-w-[220px] h-[220px] flex items-center justify-center bg-red-50 border border-red-200 text-red-500 rounded-2xl text-center text-xs aspect-square shadow-inner md:max-w-[340px] md:h-[340px]">
                URL inválida de imagem
              </div>
            ) : (
              <div className="w-full max-w-[220px] h-[220px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl border border-dashed border-gray-300 text-gray-400 text-base aspect-square shadow-inner md:max-w-[340px] md:h-[340px]">Pré-visualização</div>
            )}
              <div className="flex flex-col gap-1 w-full mt-3 md:mt-4">
                <Label htmlFor="image" className="font-semibold text-gray-700">
                  URL da imagem <span className="text-red-600" title="Obrigatório" aria-label="obrigatório">*</span>
                </Label>
                <div className="flex gap-2 flex-col sm:flex-row">
                <Input
                  id="image"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Cole ou digite a URL da imagem (jpg, png, webp...)"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-base"
                  aria-required="true"
                  aria-label="URL da imagem do produto"
                  autoComplete="off"
                />
                  <button
                    type="button"
                    className="px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-medium hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm w-full sm:w-auto cursor-pointer"
                    title="Colar da área de transferência"
                    tabIndex={0}
                    onClick={async () => {
                      if (navigator.clipboard) {
                        try {
                          const text = await navigator.clipboard.readText();
                          setForm(prev => ({ ...prev, image: text }));
                    } catch {
                      setError('Permissão negada para acessar a área de transferência. Cole manualmente a URL no campo ao lado.');
                      setTimeout(() => setError(null), 6000);
                    }
                      }
                    }}
                  >Colar</button>
                </div>
              </div>
            </div>
          </div>
        {/* Campos do formulário */}
        <div className="flex-1 flex flex-col gap-4 md:gap-6 min-w-0 justify-center">
          <div className="flex flex-col gap-1">
            <Label htmlFor="title" className="font-semibold text-gray-700">
              Título <span className="text-red-600" title="Obrigatório" aria-label="obrigatório">*</span>
            </Label>
              <Input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Título do produto" autoFocus className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-base" aria-required="true" aria-label="Título do produto" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="price" className="font-semibold text-gray-700">
              Preço <span className="text-red-600" title="Obrigatório" aria-label="obrigatório">*</span>
            </Label>
              <Input
                id="price"
                name="price"
                type="text"
                inputMode="decimal"
                value={form.price}
                onChange={handleChange}
                placeholder="R$ 99,99"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-base bg-white"
                aria-required="true"
                aria-label="Preço do produto"
                autoComplete="off"
              />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="category" className="font-semibold text-gray-700">
              Categoria <span className="text-red-600" title="Obrigatório" aria-label="obrigatório">*</span>
            </Label>
            {categories && categories.length > 0 ? (
              <Select.Root value={form.category} onValueChange={(value: string) => setForm(prev => ({ ...prev, category: value }))}>
                <Select.Trigger
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-base bg-white shadow-sm flex items-center justify-between cursor-pointer"
                  aria-label="Categoria do produto"
                  id="category"
                  name="category"
                >
                  <Select.Value placeholder="Selecione uma categoria" />
                  <Select.Icon className="ml-2 text-gray-400">
                    <ChevronDown className="w-5 h-5" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content position="popper" sideOffset={4} className="z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-0 min-w-[var(--radix-select-trigger-width)]">
                    <Select.Viewport className="p-1">
                      {categories.map((cat) => (
                        <Select.Item
                          key={cat}
                          value={cat}
                          className="px-4 py-2 rounded-md text-base text-gray-700 cursor-pointer focus:bg-blue-50 focus:text-blue-700 data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700 outline-none select-none"
                        >
                          <Select.ItemText>{cat}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            ) : (
              <Input id="category" name="category" value={form.category} onChange={handleChange} placeholder="Categoria do produto" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-base" aria-required="true" aria-label="Categoria do produto" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description" className="font-semibold text-gray-700">
              Descrição <span className="text-red-600" title="Obrigatório" aria-label="obrigatório">*</span>
            </Label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descreva o produto com detalhes, características, diferenciais, etc."
              className="w-full min-h-[260px] resize-y border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-base bg-white"
              aria-required="true"
              aria-label="Descrição detalhada do produto"
              style={{ minHeight: 260 }}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold shadow-sm transition bg-blue-600 hover:bg-blue-700 text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer mt-2">
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
        </div>
      </div>
    </form>
  </Card>
)
}
