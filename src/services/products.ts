
import api from '@/lib/api';
import { Product } from './types';

const API_PRODUCTS_PATH = '/products';

export class ProductsService {
  static async getProducts(): Promise<Product[]> {
    const { data } = await api.get(API_PRODUCTS_PATH);
    return data;
  }

  static async getProduct(id: string | number): Promise<Product> {
    const { data } = await api.get(`${API_PRODUCTS_PATH}/${id}`);
    return data;
  }

  static async createProduct(product: Product): Promise<Product> {
    const { data } = await api.post(API_PRODUCTS_PATH, product);
    return data;
  }

  static async updateProduct(id: string | number, product: Product): Promise<Product> {
    const { data } = await api.put(`${API_PRODUCTS_PATH}/${id}`, product);
    return data;
  }

  static async deleteProduct(id: string | number): Promise<Product> {
    const { data } = await api.delete(`${API_PRODUCTS_PATH}/${id}`);
    return data;
  }
}

export const getProducts = ProductsService.getProducts;
export const getProduct = ProductsService.getProduct;
export const createProduct = ProductsService.createProduct;
export const updateProduct = ProductsService.updateProduct;
export const deleteProduct = ProductsService.deleteProduct;
