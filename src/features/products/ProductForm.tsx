import { Product } from '@/services/types';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, XCircle, ChevronDown } from 'lucide-react';
import { useProductForm } from '@/hooks/useProductForm';
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
    getParsedData
  } = useProductForm(initialData);

  const [success, setSuccess] = React.useState(false);

  // Custom Select Component que não bloqueia scroll
  const CustomSelect = ({ value, onValueChange, placeholder, options }: {
    value: string;
    onValueChange: (value: string) => void;
    placeholder: string;
    options: string[];
  }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const selectRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const handleSelect = (option: string) => {
      onValueChange(option);
      setIsOpen(false);
    };

    return (
      <div className="relative w-full" ref={selectRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm flex items-center justify-between cursor-pointer text-left"
          aria-label="Categoria do produto"
        >
          <span className={value ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:bg-blue-50 dark:focus:bg-blue-900/30 focus:outline-none transition-colors text-base ${
                  value === option 
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

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
    <div className="p-0 sm:p-6 max-w-4xl w-full mx-auto">
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
                className="object-contain rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 w-full max-w-[220px] max-h-[220px] aspect-square shadow-md transition-all duration-200 md:max-w-[340px] md:max-h-[340px] md:w-[340px] md:h-[340px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : form.image && form.image.trim() ? (
              <div className="w-full max-w-[220px] h-[220px] flex items-center justify-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-500 dark:text-red-400 rounded-2xl text-center text-xs aspect-square shadow-inner md:max-w-[340px] md:h-[340px]">
                URL inválida de imagem
              </div>
            ) : (
              <div className="w-full max-w-[220px] h-[220px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-blue-900/20 dark:to-gray-700 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 text-base aspect-square shadow-inner md:max-w-[340px] md:h-[340px]">Pré-visualização</div>
            )}
              <div className="flex flex-col gap-1 w-full mt-3 md:mt-4">
                <Label htmlFor="image" className="font-semibold text-gray-700 dark:text-gray-300">
                  URL da imagem <span className="text-red-600" title="Obrigatório" aria-label="obrigatório">*</span>
                </Label>
                <div className="flex gap-2 flex-col sm:flex-row">
                <Input
                  id="image"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Cole ou digite a URL da imagem (jpg, png, webp...)"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  aria-required="true"
                  aria-label="URL da imagem do produto"
                  autoComplete="off"
                />
                  <button
                    type="button"
                    className="px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition text-sm w-full sm:w-auto cursor-pointer"
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
            <Label htmlFor="title" className="font-semibold text-gray-700 dark:text-gray-300">
              Título <span className="text-red-600" title="Obrigatório" aria-label="obrigatório">*</span>
            </Label>
              <Input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Título do produto" autoFocus className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" aria-required="true" aria-label="Título do produto" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="price" className="font-semibold text-gray-700 dark:text-gray-300">
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                aria-required="true"
                aria-label="Preço do produto"
                autoComplete="off"
              />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="category" className="font-semibold text-gray-700 dark:text-gray-300">
              Categoria <span className="text-red-600" title="Obrigatório" aria-label="obrigatório">*</span>
            </Label>
            {categories && categories.length > 0 ? (
              <CustomSelect
                value={form.category}
                onValueChange={(value: string) => setForm(prev => ({ ...prev, category: value }))}
                placeholder="Selecione uma categoria"
                options={categories}
              />
            ) : (
              <Input id="category" name="category" value={form.category} onChange={handleChange} placeholder="Categoria do produto" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" aria-required="true" aria-label="Categoria do produto" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description" className="font-semibold text-gray-700 dark:text-gray-300">
              Descrição <span className="text-red-600" title="Obrigatório" aria-label="obrigatório">*</span>
            </Label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descreva o produto com detalhes, características, diferenciais, etc."
              className="w-full min-h-[260px] resize-y border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded p-2 mt-2 text-xs animate-fade-in justify-center">
              <CheckCircle2 className="w-4 h-4" /> Salvo com sucesso!
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded p-2 mt-2 text-xs animate-fade-in justify-center">
              <XCircle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>
      </div>
    </form>
  </div>
)
}
