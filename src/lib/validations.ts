import { z } from 'zod';

const urlSchema = z.string().url({ message: 'URL inválida' });

export const ProductSchema = z.object({
  id: z.number().optional(),
  title: z.string()
    .min(1, 'Título é obrigatório')
    .max(100, 'Título deve ter no máximo 100 caracteres')
    .trim(),
  price: z.number()
    .min(0.01, 'Preço deve ser maior que zero')
    .max(999999.99, 'Preço muito alto'),
  description: z.string()
    .min(1, 'Descrição é obrigatória')
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .trim(),
  category: z.string()
    .min(1, 'Categoria é obrigatória')
    .max(50, 'Categoria deve ter no máximo 50 caracteres')
    .trim(),
  image: urlSchema.refine(
    (url) => {
      const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i;
      return imageExtensions.test(url) || url.includes('img') || url.includes('image');
    },
    { message: 'URL deve ser de uma imagem válida' }
  ),
});

export const ProductFormSchema = z.object({
  title: z.string()
    .min(1, 'Título é obrigatório')
    .max(100, 'Título deve ter no máximo 100 caracteres')
    .trim(),
  price: z.string()
    .min(1, 'Preço é obrigatório')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Preço deve ser um número válido maior que zero'
    }),
  description: z.string()
    .min(1, 'Descrição é obrigatória')
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .trim(),
  category: z.string()
    .min(1, 'Categoria é obrigatória')
    .max(50, 'Categoria deve ter no máximo 50 caracteres')
    .trim(),
  image: urlSchema.refine(
    (url) => {
      const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i;
      return imageExtensions.test(url) || url.includes('img') || url.includes('image');
    },
    { message: 'URL deve ser de uma imagem válida' }
  ),
});

export const LoginSchema = z.object({
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido')
    .max(100, 'Email muito longo'),
  password: z.string()
    .min(1, 'Senha é obrigatória')
    .min(4, 'Senha deve ter pelo menos 4 caracteres')
    .max(50, 'Senha muito longa'),
});

export const SearchSchema = z.object({
  query: z.string().max(100, 'Busca muito longa').optional(),
  category: z.string().max(50, 'Categoria inválida').optional(),
  minPrice: z.number().min(0, 'Preço mínimo inválido').optional(),
  maxPrice: z.number().min(0, 'Preço máximo inválido').optional(),
}).refine((data) => {
  if (data.minPrice !== undefined && data.maxPrice !== undefined) {
    return data.minPrice <= data.maxPrice;
  }
  return true;
}, {
  message: 'Preço mínimo deve ser menor que o preço máximo',
  path: ['minPrice']
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductFormData = z.infer<typeof ProductFormSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type SearchData = z.infer<typeof SearchSchema>;

export const validateProduct = (data: unknown) => {
  return ProductSchema.safeParse(data);
};

export const validateProductForm = (data: unknown) => {
  return ProductFormSchema.safeParse(data);
};

export const validateLogin = (data: unknown) => {
  return LoginSchema.safeParse(data);
};

export const validateSearch = (data: unknown) => {
  return SearchSchema.safeParse(data);
};

export const parseProductForm = (formData: ProductFormData): Omit<Product, 'id'> => {
  return {
    title: formData.title,
    price: Number(formData.price),
    description: formData.description,
    category: formData.category,
    image: formData.image,
  };
};

export const formatValidationErrors = (error: z.ZodError) => {
  return error.issues.map((err: z.ZodIssue) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
};

export const getFirstErrorMessage = (error: z.ZodError): string => {
  return error.issues[0]?.message || 'Dados inválidos';
};
